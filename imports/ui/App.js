import { Tasks } from '../api/tasks.js';
import Task from './Task.js';

export class App extends HTMLElement {
    constructor() {
        super();
        customElements.define('my-task', Task);
    }

    connectedCallback() {
        this.render();

        this.querySelector('.new-task').onsubmit = this.handleSubmit;
    }

    handleSubmit(event) {
        let input = event.target.children[0]; // Data tag could also be used.

        event.preventDefault();

        Tasks.insert({
            text: input.value.trim(),
            createdAt: new Date(), // current time
        });

        // Clear input.
        input.value = '';
    }

    renderTasks() {
        // Get task list.
        let tasklist = this.querySelector('#tasklist');
        tasklist.innerHTML = '';

        for (let taskDocument of this.tasks) {
            // Get task element and add it to list.
            let task = new Task(taskDocument);
            tasklist.appendChild(task);
        }
    }

    // Render the view.
    render() {
        // Render content from template.
        this.innerHTML = `
        <div class="container">
            <header>
                <h1>Todo List</h1>
                <form class="new-task">
                    <input type="text" placeholder="Type to add new tasks" />
                </form>
            </header>

            <ul id='tasklist'>
            </ul>
        </div>
        `

        // Auto run tasks and task rendering.
        Tracker.autorun(() => {
            this.tasks = Tasks.find({}).fetch();

            this.renderTasks();
        });
    }
}