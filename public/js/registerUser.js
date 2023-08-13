const registerFormSubmit = async (e) => {
    e.preventDefault()
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const response = await fetch('/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: username.value,
            password: password.value
        })
    })
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('failed to login!')
    }
};


document.getElementById('register_form').addEventListener('submit', registerFormSubmit)