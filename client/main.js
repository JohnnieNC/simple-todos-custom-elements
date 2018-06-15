
import { Meteor } from 'meteor/meteor';

import { App } from '../imports/ui/App.js';

Meteor.startup(() => {
    q = (query) => {
        return document.querySelector(query);
    }

    qa = (query) => {
        return document.querySelectorAll(query);
    }

    q2 = (dataTag) => {
        let query = '[' + dataTag + ']';
        return q(query);
    }

    customElements.define('my-app', App);
});