//Set tasks varable to an empty array and grab tasks items from JSON and parsing it 
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
window.addEventListener('load', () => {
	const newTaskForm = document.querySelector('#new-task-form');
	//Using e(event) to tell JS to listen to submit events
	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();
		//Set task to target the form then push task using JSON.strigify method
		const task = {
			content: e.target.elements.content.value,
			done: false,
		}
		tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(tasks));
		// Reset the form
		e.target.reset();
		DisplayTasks()
	})
	//Call back method telling JS to reset the task list with any changes
	DisplayTasks()
})

let DisplayTasks = () => {
	const taskList = document.querySelector('#task-list');
	taskList.innerHTML = "";
	//Running through tasks that were submitted
	tasks.forEach(task => {
		const taskItem = document.createElement('div');
		taskItem.classList.add('task-item');
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const editButton = document.createElement('button');
		const deleteButton = document.createElement('button');
		//If the checkbox is checked, task is set to completed
		input.type = 'checkbox';
		input.checked = task.done;
		span.classList.add('check');
		content.classList.add('task-content');
		actions.classList.add('actions');
		editButton.classList.add('edit');
		deleteButton.classList.add('delete');
		//Using `` to set content.innerhtml to an input template
		content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
		editButton.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
		//Appending child elements to parent elements
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(editButton);
		actions.appendChild(deleteButton);
		taskItem.appendChild(label);
		taskItem.appendChild(content);
		taskItem.appendChild(actions);
		taskList.appendChild(taskItem);
		//Check if the item is done or not. 
		//If done add a class of 'done' with the text decoration of line-through
		if (task.done) {
			taskItem.classList.add('done');
		}
		input.addEventListener('change', (e) => {
			task.done = e.target.checked;
			localStorage.setItem('tasks', JSON.stringify(tasks));
			if (task.done) {
				taskItem.classList.add('done');
			} else {
				taskItem.classList.remove('done');
			}
			DisplayTasks()
		})
		//Adding an event listener to the edit button and the delete button
		editButton.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				task.content = e.target.value;
				localStorage.setItem('tasks', JSON.stringify(tasks));
				DisplayTasks()
			})
		})

		deleteButton.addEventListener('click', (e) => {
			//Using the .filter method to check if t is the same as task. If not delete item
			tasks = tasks.filter(t => t != task);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			DisplayTasks()
		})
	})
}