const deletePost = async function () {
    try {
        const hiddenInput = document.getElementById('hidden-input');
        const postId = hiddenInput.value;
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.reload();
        }
    } catch (err) {
        alert('Failed to delete post');
    }
};

document.getElementById('deleteBtn').addEventListener('click', deletePost)