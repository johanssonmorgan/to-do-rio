const toDoForm = document.querySelector('#todo-form');

toDoForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const formInput = document.querySelector('#todo-input');
    
    if(formInput.value == '') {
        return
    }

    const tasks = document.querySelector('#tasks');

    let listEntry = document.createElement('li');
    listEntry.textContent = formInput.value;
    listEntry.addEventListener('click', e => {
        listEntry.classList.toggle('done');
    })

    tasks.appendChild(listEntry);

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn-remove');

    let buttonImg = document.createElement('img');
    buttonImg.src = 'x-solid.svg';

    removeBtn.appendChild(buttonImg);

    listEntry.appendChild(removeBtn);

    removeBtn.addEventListener('click', e => {
        e.preventDefault();
        listEntry.remove();
    })

    formInput.value = '';
})