// DOM Elements
const homeButton = document.getElementById('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const editProfileButton = document.getElementById('edit-profile');

// Navigation
homeButton.addEventListener('click', () => {
    window.location.href = "../html/home.html";
});

for (let howToPlayButton of howToPlayButtons) {
    howToPlayButton.addEventListener('click', () => {
        window.location.href = "../html/introduction.html";
    });
}

leaderboardButton.addEventListener('click', () => {
    window.location.href = "../html/leaderboard.html";
});

communityButton.addEventListener('click', () => {
    // Community page logic (to be implemented)
});

editProfileButton.addEventListener('click', () => {
    // Edit profile logic (to be implemented)
    alert('Edit profile feature coming soon!');
});

// Mock data - Replace with actual API calls later
const mockUserData = {
    username: "Coderbian",
    userId: "23120006",
    joinDate: "Oct 5, 2005",
    rank: "Master Chef",
    stats: {
        totalBattles: 210,
        wins: 105,
        losses: 105,
        points: 12400,
        bestStreak: 12
    },
    recentMatches: [
        { opponent: "BattleKing", result: "win", score: "3-2" },
        { opponent: "TankLegend", result: "loss", score: "1-3" },
        { opponent: "WarMachine", result: "win", score: "3-0" },
        { opponent: "SteelTitan", result: "win", score: "3-1" },
        { opponent: "IronHeart", result: "loss", score: "2-3" }
    ]
};

// Update profile information
function updateProfile(userData) {
    // Update basic info
    document.getElementById('username').textContent = userData.username;
    document.getElementById('user-id').textContent = userData.userId;
    document.getElementById('join-date').textContent = userData.joinDate;
    document.getElementById('rank').textContent = userData.rank;

    // Update stats
    document.getElementById('total-battles').textContent = userData.stats.totalBattles;
    document.getElementById('wins').textContent = userData.stats.wins;
    document.getElementById('losses').textContent = userData.stats.losses;
    document.getElementById('win-rate').textContent = 
        Math.round((userData.stats.wins / userData.stats.totalBattles) * 100) + '%';
    document.getElementById('total-points').textContent = userData.stats.points;
    document.getElementById('best-streak').textContent = userData.stats.bestStreak;

    // Update recent matches
    const matchesList = document.getElementById('matches-list');
    matchesList.innerHTML = ''; // Clear existing matches

    userData.recentMatches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match-item';
        matchElement.innerHTML = `
            <span>vs ${match.opponent}</span>
            <span class="match-result result-${match.result}">${match.result.toUpperCase()} (${match.score})</span>
        `;
        matchesList.appendChild(matchElement);
    });
}

// Load profile data when page loads
window.addEventListener('load', () => {
    // In the future, this should fetch real data from the server
    updateProfile(mockUserData);
});
