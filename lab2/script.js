"use strict";
// DOM elements
const listMainContainer = document.getElementById('list-main-container');
const addTaskInput = document.getElementById('task-field');
const addTaskButton = document.getElementById('add-task');
const tasksSelect = document.getElementById('list-select');
const addListInput = document.getElementById('list-field');
const addListButton = document.getElementById('add-list');
const searchTaskInput = document.getElementById('task-search');
const searchCaseSensitiveCheckbox = document.getElementById('case-sensitive-checkbox');

const emptyInputModal = new bootstrap.Modal(document.getElementById('empty-input-modal'));

const warningModal = new bootstrap.Modal(document.getElementById('warning-modal'));
const warningModalMessage = document.getElementById('warning-modal-message');
const warningModalRemoveButton = document.getElementById('warning-modal-remove-button');

const createAndShowRemoveModal = (task, listId) => {
    warningModalMessage.innerHTML = `Czy na pewno chcesz usunąć zadanie o treści: "${task.content}"`;
    warningModalRemoveButton.onclick = () => removeTask(task.id, listId);
    warningModal.show();
}


// tasks stuff
let lastTask = null;
let currTaskId = 1;
let currListId = 2;

const listItems = {
    '1': {
        displayName: 'Zadania',
        tasks: []
    }
};

const addClassString = (element, str) => {
    str.split(' ')
        .map(s => s.trim())
        .forEach(s => {
            element.classList.add(s);
        });
};

const addList = () => {
    const listName = addListInput.value;

    if (listName.trim() === '') {
        emptyInputModal.show();
        return;
    }

    const id = (currListId++).toString();

    listItems[id] = {
        displayName: listName,
        tasks: []
    };

    const ul = document.createElement('ul');
    ul.id = `tasks-list-${id}`
    addClassString(ul, 'p-0 tasks-unordered-list');

    const h3 = document.createElement('h3');
    addClassString(h3, 'text-center text-primary');
    h3.innerText = listName;

    ul.appendChild(h3);

    listMainContainer.appendChild(ul);

    const option = document.createElement("option");
    option.value = id;
    option.innerText = listName;
    tasksSelect.appendChild(option);
    addListInput.value = '';

}

const addTask = () => {
    const taskName = addTaskInput.value;
    const selectedValue = tasksSelect.value;

    if (taskName.trim() === '') {
        emptyInputModal.show()
        return;
    }
    const task = createTask(taskName);
    listItems[selectedValue].tasks.push(task);

    const li = createTaskDOM(task, selectedValue);
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

                ref.classList.remove('bg-secondary-subtle');
                ref.classList.add('bg-primary-subtle');
            } else {
                contentP.style.textDecoration = 'line-through';
                contentP.style.color = 'grey';

                dateP.innerText = `Zakończono: ${createCurrentDateStr()}`;
                dateP.style.display = 'block';
                ref.classList.remove('bg-primary-subtle');
                ref.classList.add('bg-secondary-subtle');

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

    addClassString(li, 'border border-black list-unstyled p-xl-2 rounded-3 d-flex flex-column task-list bg-primary-subtle my-xxl-2');
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
    removeButton.addEventListener('click', () => createAndShowRemoveModal(item, listId))

    return li;
}

const createCurrentDateStr = () => {
    const date = new Date();
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
}

const removeTask = (taskId, listId) => {
    const list = listItems[listId].tasks;
    lastTask = findValueAndIndex(list, item => item.id === taskId);
    lastTask.listId = listId;
    listItems[listId].tasks = list.filter(item => item.id !== taskId);

    if (lastTask) {
        document.getElementById(`li-${taskId}`).remove();

    }
}

const redoTask = () => {
    if (!lastTask) {
        return;
    }

    const li = createTaskDOM(lastTask.value, lastTask.listId);

    const tasksList = document.getElementById(`tasks-list-${lastTask.listId}`);

    listItems[lastTask.listId].tasks.splice(lastTask.index, 0, lastTask.value);
    const beforeId = listItems[lastTask.listId].tasks[lastTask.index + 1]?.id;
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
            };
        }
    }
    return {
        value: undefined, // Undefined because Array.find() returns undefined when empty
        index: -1
    };
}

const search = (e) => {
    const searchedKey = searchTaskInput.value;
    const checked = searchCaseSensitiveCheckbox.checked;

    const predicate = checked
        ? task => task.content.toLowerCase().match(new RegExp(`.*${searchedKey.toLowerCase()}.*`))
        : task => task.content.match(new RegExp(`.*${searchedKey}.*`));

    Object.values(listItems)
        .flatMap(list => list.tasks)
        .forEach(task => {
            const li = document.getElementById(`li-${task.id}`);
            if (predicate(task)) {
                li.classList.add('d-flex');
                li.classList.remove('d-none');
            } else {
                li.classList.remove('d-flex');
                li.classList.add('d-none');
            }
        })
}

//add eventListeners
addTaskButton.addEventListener('click', addTask);
addListButton.addEventListener('click', addList);
searchTaskInput.addEventListener('input', search)
searchCaseSensitiveCheckbox.addEventListener('input', search);

document.addEventListener('keydown', e => {
    if ((e.key === 'z' || e.key === 'Z') && e.ctrlKey) {
        e.preventDefault();
        redoTask();
    }
})

