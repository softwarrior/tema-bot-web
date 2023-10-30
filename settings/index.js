"use strict";

import { COMMANDS } from '../costants.js'

const FEATURES = {
    HelperWorker: {
        name: 'Помощь',
        available: 'true',
        readonly: 'true'
    },
    FamousWorker: {
        name: 'Высказывания',
        available: 'true'
    },
    ProverbsWorker: {
        name: 'Пословицы',
        available: 'true'
    },
    NumbersWorker: {
        name: 'Игра в числа',
        available: 'true'
    },
    CitiesWorker: {
        name: 'Игра в города',
        available: 'true'
    },
    TourismWorker: {
        name: 'Туристическая информация',
        available: 'true'
    },
    EchoWorker: {
        name: 'Эхо на неизвестные команды',
        available: 'true',
        readonly: 'true'
    }
}

class Admin {
    constructor () {
        const element = document.createElement('div');
        element.classList.add('admin');
        
        const header = document.createElement('h2');
        header.innerHTML = "Настройки TemaBot"
        element.append(header);

        const features = new Features(FEATURES)
        element.append(features.element)

        const applyButton = new Button(COMMANDS[2].name, COMMANDS[2].uid)
        element.append(applyButton.element)

        this.element = element
    }

    setStatusName(name) {
        this.status.setName(name)
    }
}

class Features {
    constructor (features) {
        const element = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerHTML = "Выберите фичу:"
        element.append(h3);

        Object.entries(features).forEach(([key, value]) => {
            const { name, available, readonly } = value
            const checkbox = new Checkbox(name, key, available, readonly);
            element.append(checkbox.element);

        })
        
        this.element = element;
    }
}

class Button {
    constructor (name, uid) {
        const element = document.createElement('button');
        element.append(name);
        element.classList.add('button');
        element.setAttribute('data-name', name)
        element.setAttribute('data-uid', uid)
        element.setAttribute('onclick','clickButton(this)' )

        this.element = element;
    }
}

class Checkbox {
    constructor (name, uid, available, readonly) {
        const element = document.createElement('div');
        const label = document.createElement('label');
        
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('data-name', name);
        checkbox.setAttribute('data-uid', uid);
        checkbox.setAttribute('data-available', available);
        if (available === 'true') {
            checkbox.setAttribute('checked','');
        }
        if (readonly === 'true') {
            checkbox.setAttribute('disabled','');
        }
        checkbox.setAttribute('onchange','changeCheckbox(this)' )

        label.append(checkbox)
        label.append(name)
        
        element.append(label) 

        this.element = element;
    }
}

const admin = new Admin();
document
    .getElementById('root')
    .append(admin.element)

function changeCheckbox(checkbox) {
    console.log(checkbox.dataset.name, checkbox.checked, checkbox.dataset.uid)
    const feature = FEATURES[checkbox.dataset.uid]
    feature.available = checkbox.checked ? "true" : "false"
}

function clickButton (button) {
        console.log("click", button.dataset.name, button.dataset.uid);
        const data = { command: button.dataset.uid, features: FEATURES}
        fetch(`/tasks/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log("result", result)
        })
        .catch((error) => console.log(error));
}

function ready(callback) {
    if (document.readyState !== 'loading') {
        callback();
        return;
    }
    document.addEventListener('DOMContentLoaded', callback);
}

ready(function() {
    console.log('document ready')
})
