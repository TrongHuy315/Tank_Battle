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
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Giả lập đăng nhập thành công
    // TODO: Thay thế bằng API call thực tế sau này
    if (username && password) {
        // Redirect to profile page after successful login
        window.location.href = "/profile";
    }
});
