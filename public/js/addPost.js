const postFormSubmit = async (e) => {
    e.preventDefault()
    const title = document.getElementById('title')
    const text = document.getElementById('text')
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: text.value,
            title: title.value
        })
    })
    if (response.ok) {
        document.location.reload()
    } else {
        alert('failed to add post!')
    }
};


document.getElementById('postForm').addEventListener('submit', postFormSubmit)