import { Tasks } from '../api/tasks.js';

export default class Task extends HTMLElement {
    constructor(task) {
        super();

        // Set element id.
        this.id = 'task' + task._id;

        this.taskId = task._id;
        this.checked = task.checked;
        this.text = task.text;
    }

    connectedCallback() {
        this.render();

        this.onchange = () => {
            this.checked = this.querySelector('input').checked;

            this.render();
        }
    }

    toggleChecked() {
        this.checked = !this.checked;

        Tasks.update(this.taskId, {
            $set: { checked: this.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.taskId);
    }

    render() {
        // Note method for calling the custom element's methods.
        this.innerHTML = `
        <li class="${this.checked ? 'checked' : ''}">
            <button class="delete" onClick="${this.id}.deleteThisTask()">
            &times;
            </button>

            <input
            type="checkbox"
            readOnly
            ${this.checked ? 'checked' : ''}
            onClick="${this.id}.toggleChecked()"
            />

            <span class="text">${this.text}</span>
        </li>
        `;
    }
}

customElements.define('my-task', Task);