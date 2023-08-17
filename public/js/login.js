const loginFormSubmit = async (e) => {
    e.preventDefault()
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    console.log(username.value, password.value)
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: username.value,
            password: password.value
        })
    })
    if (response.ok) {
        document.location.replace('/')
    } else {
        alert('failed to login!')
    }
};

document.getElementById('login_form').addEventListener('submit', loginFormSubmit)