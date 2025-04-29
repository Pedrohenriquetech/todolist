let currentFilter = 'all';

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.classList.add('task');

  const span = document.createElement('span');
  span.textContent = taskText;
  span.onclick = () => {
    li.classList.toggle('completed');
    applyFilter();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Excluir';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById('taskList').appendChild(li);
  input.value = '';
  applyFilter();
}

function filterTasks(filter) {
  currentFilter = filter;

  // Atualiza botão ativo
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.filter-btn[onclick="filterTasks('${filter}')"]`).classList.add('active');

  applyFilter();
}

function applyFilter() {
  const tasks = document.querySelectorAll('#taskList li');

  tasks.forEach(task => {
    switch (currentFilter) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'pending':
        task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
        break;
    }
  });
}

// Permitir Enter para adicionar
document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
