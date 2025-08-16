// DOM Elements
const homeButtons = document.getElementsByClassName('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const loginForm = document.getElementById('login-form');

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
    alert('Community feature coming soon!');
});

// Login Form Handling
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const formData = {
            username: username,
            password: password
        }

        const res = await fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        alert(data);
        window.location.href("/profile");
    } catch (err) {
        console.log("Error: " + err);
    }
});
