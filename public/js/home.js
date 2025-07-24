const homeButtons = document.getElementsByClassName('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const playNowButtons = document.getElementsByClassName('btn-primary');
const logoButtons = document.getElementsByClassName('logo');

for (let homeButton of homeButtons) {
    homeButton.addEventListener('click', () => {
        window.location.href = "/home";
    });
}

for (let howToPlayButton of howToPlayButtons) {
    howToPlayButton.addEventListener('click', () => {
        window.location.href = "/introduction";   // Chưa có file html này
    });
}

leaderboardButton.addEventListener('click', () => {
    window.location.href = "/leaderboard";   // Chưa có file html này
});

communityButton.addEventListener('click', () => {
    // Chưa có logic cụ thể
});

for (let playNowButton of playNowButtons) {
    playNowButton.addEventListener('click', () => {
        // Chuyển đến trang đăng nhập
        window.location.href = "/login";
    });
}
