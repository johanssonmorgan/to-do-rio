// Initialize the to-do list array
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Function to render tasks from the array
function renderTasks() {
    const tasks = document.querySelector('#tasks');
    tasks.innerHTML = ''; // Clear the current list

    todoList.forEach((task, index) => {
        let listEntry = document.createElement('li');
        listEntry.textContent = task.text;

        // Add 'done' class if task is marked as completed
        if (task.completed) {
            listEntry.classList.add('done');
        }

        // Toggle done state on click
        listEntry.addEventListener('click', e => {
            listEntry.classList.toggle('done');
            todoList[index].completed = !todoList[index].completed;
            localStorage.setItem('todoList', JSON.stringify(todoList));
        });

        // Create remove button
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('btn-remove');

        let buttonImg = document.createElement('img');
        buttonImg.src = 'x-solid.svg';

        removeBtn.appendChild(buttonImg);
        listEntry.appendChild(removeBtn);

        // Remove task on button click
        removeBtn.addEventListener('click', e => {
            e.preventDefault();
            todoList.splice(index, 1); // Remove from array
            localStorage.setItem('todoList', JSON.stringify(todoList)); // Update localStorage
            renderTasks(); // Re-render the list
        });

        tasks.appendChild(listEntry);
    });
}

// Event listener for the form submission
const toDoForm = document.querySelector('#todo-form');

toDoForm.addEventListener('submit', e => {
    e.preventDefault();

    const formInput = document.querySelector('#todo-input');

    // Don't add empty tasks
    if (formInput.value.trim() == '') {
        return;
    }

    // Add new task to the array
    todoList.push({
        text: formInput.value.trim(),
        completed: false
    });

    // Update localStorage with the new task list
    localStorage.setItem('todoList', JSON.stringify(todoList));

    // Clear the input field
    formInput.value = '';

    // Re-render tasks to show the new task
    renderTasks();
});

// Call renderTasks when the page loads to load tasks from localStorage
window.onload = function() {
    renderTasks();
};
