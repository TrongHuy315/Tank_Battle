const homeButton = document.getElementById('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const playNowButtons = document.getElementsByClassName('btn-primary');
const logoButtons = document.getElementsByClassName('logo');

homeButton.addEventListener('click', () => {
    window.location.href = "../html/home.html";   // Hành động này được thực hiện cuối cùng trong hàm
});

for (let howToPlayButton of howToPlayButtons) {
    howToPlayButton.addEventListener('click', () => {
        window.location.href = "../html/introduction.html";   // Chưa có file html này
    });
}

leaderboardButton.addEventListener('click', () => {
    window.location.href = "../html/leaderboard.html";   // Chưa có file html này
});

communityButton.addEventListener('click', () => {
    // Chưa có logic cụ thể
});

for (let playNowButton of playNowButtons) {
    playNowButton.addEventListener('click', () => {
        // Sau khi đăng nhập thành công, chuyển đến trang profile
        window.location.href = "../html/profile.html";
    });
}

for (let logoButton of logoButtons) {
    logoButton.addEventListener('click', () => {
        window.location.href = "../html/home.html";
    });
}
