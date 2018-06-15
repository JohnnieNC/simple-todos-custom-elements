
import { Meteor } from 'meteor/meteor';

import { App } from '../imports/ui/App.js';
import { Task } from '../imports/ui/Task.js'

Meteor.startup(() => {
    customElements.define('my-app', App);
    customElements.define('my-task', Task);
});