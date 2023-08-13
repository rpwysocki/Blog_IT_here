const commentFormSubmit = async (e) => {
    e.preventDefault()
    const text = document.getElementById('text')
    const hiddenInput = document.getElementById('hidden-input');
    const postId = hiddenInput.value;
    const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: text.value,
        })
    })
    if (response.ok) {
        document.location.reload()
    } else {
        alert('failed to add comment!')
    }
};


document.getElementById('commentForm').addEventListener('submit', commentFormSubmit)