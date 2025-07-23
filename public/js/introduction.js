// DOM Elements
const homeButton = document.getElementById('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const playNowButton = document.getElementById('playnow');
const logo = document.querySelector('.logo');
const ctaButton = document.querySelector('.cta-section .btn-primary');

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

playNowButton.addEventListener('click', () => {
    window.location.href = "../html/profile.html";
});

logo.addEventListener('click', () => {
    window.location.href = "../html/home.html";
});

// CTA button
ctaButton.addEventListener('click', () => {
    window.location.href = "../html/profile.html";
});
