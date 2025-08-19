const { format } = require('date-fns');

const connection = require('./db.models.js');

function getUsersProfileData(username) {
    return new Promise((resolve, reject) => {
        const query = `SELECT u.username, u.id, p.join_date, p.rank FROM users u JOIN profile p ON u.id = p.user_id WHERE u.username = ?`;
        connection.query(query, [username], (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
}

function getUsersStatsData(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT s.total_battles, s.wins, s.losses, s.points, s.best_streak FROM profile p JOIN stats s ON p.id = s.profile_id WHERE p.user_id = ?`;
        connection.query(query, [userId], (err, result) => {
            if (err) return reject(err);

            resolve(result);
        })
    })
}

function getUsersMatchesData(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT m.opponent_name, m.result, m.score FROM users u JOIN matches m ON u.id = m.player_id WHERE u.id = ? ORDER BY match_date DESC LIMIT 5`;
        connection.query(query, [userId], (err, result) => {
            if (err) return reject(err);

            resolve(result);
        })
    })
}

async function getProfileData(username) {
    const users_profile = await getUsersProfileData(username);

    if (users_profile.length == 0) return null;

    const users_profile_data = users_profile[0];

    const userId = users_profile_data.id;

    const users_stats = await getUsersStatsData(userId);
    const users_stats_data = users_stats[0] || {};

    const users_matches_data = await getUsersMatchesData(userId);

    // console.log(users_profile_data);
    // console.log(users_matches_data);
    // console.log(users_stats_data);

    const formattedJoinDate = format(new Date(users_profile_data.join_date), 'MMMM d, yyyy');

    const userData = {
        username: username,
        userId: userId,
        joinDate: formattedJoinDate,
        rank: users_profile_data.rank,
        stats: {
            totalBattles: users_stats_data.total_battles,
            wins: users_stats_data.wins,
            losses: users_stats_data.losses,
            points: users_stats_data.points,
            bestStreak: users_stats_data.best_streak,
        },
        recentMatches: users_matches_data,
    }

    // console.log(userData);

    return userData;
}

module.exports = getProfileData;
