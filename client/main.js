
import { Meteor } from 'meteor/meteor';

import { App } from '../imports/ui/App.js';

Meteor.startup(() => {
    customElements.define('my-app', App);
});