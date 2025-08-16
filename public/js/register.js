// DOM Elements
const homeButtons = document.getElementsByClassName('home');
const howToPlayButtons = document.getElementsByClassName('btn-secondary');
const leaderboardButton = document.getElementById('leaderboard');
const communityButton = document.getElementById('community');
const registerForm = document.getElementById('register-form');

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

// Register Form Handling
registerForm.addEventListener('submit', async (e) => {
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

    const formData = {
        username: username,
        email: email,
        password: password
    }

    try {
        const res = await fetch("/register", {
            method: "POST",
            headers:  {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        alert(data + ' Please log in.');
        window.location.href = "/login";
    } catch (err) {
        console.log("Error: " + err);
    }
});
