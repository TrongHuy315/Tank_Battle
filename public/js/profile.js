window.addEventListener("load", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in first!");
        window.location.href = "/login";
        return;
    }

    // console.log(localStorage.getItem("token"));

    try {
        const res = await fetch("/auth/profile", {
            headers: {"Authorization": `Bearer ${token}`},
        });

        if (!res.ok) throw new Error("Unauthorized!");

        const userData = await res.json();

        updateProfile(userData);
    } catch (err) {
        alert("Session expired! Please log in again!");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
})

const homeButtons = document.getElementsByClassName('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const editProfileButton = document.getElementById('edit-profile');

for (let homeButton of homeButtons) {
    homeButton.addEventListener('click', () => {
        window.location.href = "/home";
    });
}

for (let howToPlayButton of howToPlayButtons) {
    howToPlayButton.addEventListener('click', () => {
        window.location.href = "/introduction";
    });
}

leaderboardButton.addEventListener('click', () => {
    window.location.href = "/leaderboard";
});

communityButton.addEventListener('click', () => {
    // Community page logic (to be implemented)
});

editProfileButton.addEventListener('click', () => {
    // Edit profile logic (to be implemented)
    alert('Edit profile feature coming soon!');
});

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
    document.getElementById('win-rate').textContent = Math.round((userData.stats.wins / userData.stats.totalBattles) * 100) + '%';
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
