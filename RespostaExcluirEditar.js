const form = document.getElementById('feedback-form');
const feedbackList = document.getElementById('feedback-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;

  const feedbackItem = document.createElement('div');
  feedbackItem.className = 'feedback-item';

  feedbackItem.innerHTML = `
    <p><strong>Nota:</strong> ${rating}</p>
    <p><strong>Comentário:</strong> <span class="comment-text">${comment}</span></p>
    <div class="controls">
      <button class="edit">Editar</button>
      <button class="delete">Excluir</button>
      <button class="reply">Responder</button>
    </div>
    <div class="reply-section"></div>
  `;

  feedbackItem.querySelector('.edit').addEventListener('click', () => editFeedback(feedbackItem));
  feedbackItem.querySelector('.delete').addEventListener('click', () => feedbackItem.remove());
  feedbackItem.querySelector('.reply').addEventListener('click', () => addReply(feedbackItem));

  feedbackList.appendChild(feedbackItem);
  form.reset();
});

function editFeedback(feedbackItem) {
  const commentText = feedbackItem.querySelector('.comment-text');
  const newComment = prompt('Edite seu comentário:', commentText.textContent);
  if (newComment !== null && newComment.trim() !== '') {
    commentText.textContent = newComment.trim();
  }
}

function addReply(feedbackItem) {
  const replySection = feedbackItem.querySelector('.reply-section');
  const replyText = prompt('Digite sua resposta:');
  if (replyText !== null && replyText.trim() !== '') {
    const reply = document.createElement('div');
    reply.className = 'reply';
    reply.textContent = replyText.trim();
    replySection.appendChild(reply);
  }
}
