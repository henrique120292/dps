document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'dps' && password === 'dps134679') {
        window.location.href = 'dps.html';
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
});
