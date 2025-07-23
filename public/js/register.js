// DOM Elements
const homeButton = document.getElementById('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const logo = document.querySelector('.logo');
const registerForm = document.getElementById('register-form');

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

// Register Form Handling
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic form validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Basic validation for username
    if (username.length < 3) {
        alert('Username must be at least 3 characters long!');
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    // Basic password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }

    // TODO: Replace with actual API call
    // Giả lập đăng ký thành công
    alert('Registration successful! Please log in.');
    window.location.href = "../html/login.html";
});
