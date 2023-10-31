"use strict";

import { COMMANDS } from './costants.js'

const STATUSES = [
    "STOPPED",
    "STARTED", 
]

class Admin {
    constructor () {
        const element = document.createElement('div');
        element.classList.add('admin');
        
        const header = document.createElement('h2');
        header.innerHTML = "Запуск TemaBot"
        element.append(header);

        const commands = new Commands([COMMANDS[0], COMMANDS[1]]);
        element.append(commands.element);

        const status = new Status(STATUSES[0])
        element.append(status.element);

        this.element = element
        this.status = status
    }

    setStatusName(name) {
        this.status.setName(name)
    }
}

class Status {
    constructor (name) {
        const element = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.append("Статус запуска:")

        const span = document.createElement('span')
        span.classList.add('status')
        span.innerHTML = name
        h4.append(span)

        element.append(h4)
        
        this.element = element;
        this.span = span;
    }

    setName(name) {
        this.span.innerHTML = name
    }
}

class Commands {
    constructor (commands) {
        const element = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.innerHTML = "Выберите команду:"
        element.append(h4);

        commands.forEach(({ name, uid }) => {
            const button = new Button(name, uid)
            element.append(button.element)
        });

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
        element.addEventListener(
            'click',
            () => {
                clickButton(this.element);
            }
        )
        this.element = element;
    }
}

const admin = new Admin();
document
    .getElementById('root')
    .append(admin.element)


function clickButton (button) {
        console.log("click", button.dataset.name, button.dataset.uid);
        const data = { command: button.dataset.uid }
        fetch(`/tasks/`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            admin.setStatusName(result.task_result)
            getStatus(result.task_id);
        })
        .catch((error) => console.log(error));
}

function getStatus(taskID) {
    const url = `/tasks/${taskID}/`
    fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(result => {
        admin.setStatusName(result.task_result)
        if (result.task_status === 'SUCCESS' || result.task_status === 'FAILURE') {
            return
        }
        setTimeout(function() {
            getStatus(result.task_id);
        }, 1000);

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
