"use strict";
// DOM elements
const addTaskInput = document.getElementById("task-field");
const addButton = document.getElementById("add-task");
const tasksSelect = document.getElementById("list-select");
const dialog = document.getElementsByTagName('dialog')[0];

// dialog stuff
let lastTask = null;
let currTaskId = 1;
let currListId = 1;
let listItems = [];

const lists = {
    '1': {
        displayName: 'Zadania',
        tasks: []
    }
}

const addClassString = (element, str) => {
    str.split(' ')
        .map(s => s.trim())
        .forEach(s => {
            element.classList.add(s);
        })
}

const addTask = () => {
    const taskName = addTaskInput.value;
    const selectedValue = tasksSelect.value;

    if (taskName.trim() === '') {
        dialog.showModal();
        return;
    }
    const task = createTask(taskName);
    listItems[selectedValue].tasks.push(task);

    const li = createTaskDOM(task);
    document.getElementById(`tasks-list-${selectedValue}`).appendChild(li);
    addTaskInput.value = '';
}

const createTask = (content) => {
    return {
        id: currTaskId++,
        content: content,
        done: false,
        toggle: function () {
            const ref = document.getElementById(`li-${this.id}`);
            const contentP = ref.querySelector('.task-list-p');
            const dateP = ref.querySelector('.task-list-date');

            if (this.done) {
                contentP.style.textDecoration = 'none';
                contentP.style.color = 'black';

                dateP.innerText = '';
                dateP.style.display = 'none';
            } else {
                contentP.style.textDecoration = 'line-through';
                contentP.style.color = 'grey';

                dateP.innerText = `Zakończono: ${createCurrentDateStr()}`;
                dateP.style.display = 'block';
            }
            this.done = !this.done;
        }
    };

}

const createTaskDOM = (item, listId) => {
    const li = document.createElement('li');
    const contentParagraph = document.createElement('p');
    const dateParagraph = document.createElement('p');
    const removeButton = document.createElement('button');
    const div = document.createElement('div');

    addClassString(li, 'border border-black list-unstyled p-xl-2 rounded-3 d-flex flex-column task-list bg-primary-subtle');
    addClassString(div, 'd-flex flex-row-reverse justify-content-between align-items-center');
    addClassString(contentParagraph, 'text-break task-list-p');
    addClassString(dateParagraph, 'p-0 m-0 task-list-date');
    addClassString(removeButton, 'btn btn-danger btn-sm rounded-pill');

    contentParagraph.innerText = item.content;

    dateParagraph.style.display = 'none';

    removeButton.innerText = 'X';
    removeButton.classList.add('task-remove-button', 'btn', 'btn-danger', 'btn-sm', 'align-self-end', 'rounded-pill');

    div.appendChild(removeButton);
    div.appendChild(dateParagraph);
    li.appendChild(div);
    li.appendChild(contentParagraph);

    li.id = `li-${item.id}`;

    li.addEventListener('click', () => item.toggle());
    removeButton.addEventListener('click', () => removeTask(item.id, listId))

    return li;
}

const createCurrentDateStr = () => {
    const date = new Date();
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
}

const removeTask = id => {
    lastTask = findValueAndIndex(listItems, item => item.id === id);
    listItems = listItems.filter(item => item.id !== id);

    if (lastTask) {
        document.getElementById(`li-${id}`).remove();

    }
}

const redoTask = () => {
    if (!lastTask) {
        return;
    }

    const li = createTaskDOM(lastTask.value);

    listItems.splice(lastTask.index, 0, lastTask.value);
    const beforeId = listItems[lastTask.index + 1]?.id;
    const beforeLi = document.getElementById(`li-${beforeId}`)
    tasksList.insertBefore(li, beforeLi);

    if (lastTask.value.done) {
        lastTask.value.toggle();
        lastTask.value.toggle();
    }

    lastTask = null;
}

const findValueAndIndex = (array, predicate) => {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            return {
                value: array[i],
                index: i
            }
        }
    }
    return {
        value: undefined, // Undefined because Array.find() returns undefined
        index: -1
    }
}

//add eventListeners
addButton.addEventListener('click', addTask);
document.addEventListener('keydown', e => {
    if ((e.key === 'z' || e.key === 'Z') && e.ctrlKey) {
        e.preventDefault();
        redoTask();
    }
})

