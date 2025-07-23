// DOM Elements
const homeButton = document.getElementById('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const logo = document.querySelector('.logo');
const loginForm = document.getElementById('login-form');

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
    alert('Community feature coming soon!');
});

logo.addEventListener('click', () => {
    window.location.href = "../html/home.html";
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
        window.location.href = "../html/profile.html";
    }
});
