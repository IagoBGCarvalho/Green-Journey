const input = document.getElementById('new-item');
const addButton = document.getElementById('add-item');
const list = document.getElementById('custom-list');


addButton.addEventListener('click', () => {
  const itemText = input.value.trim();

  if (itemText === '') {
    alert('Por favor, insira um texto para adicionar à lista!');
    return;
  }

  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span class="item-text">${itemText}</span>
    <span class="delete">🗑</span>
  `;


  listItem.querySelector('.delete').addEventListener('click', () => {
    listItem.remove();
  });

 
  listItem.querySelector('.item-text').addEventListener('click', (e) => {
    const newText = prompt('Edite o item:', e.target.textContent);
    if (newText !== null && newText.trim() !== '') {
      e.target.textContent = newText.trim();
    }
  });


  list.appendChild(listItem);


  input.value = '';
});


input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addButton.click();
  }
});
