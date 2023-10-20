"use strict";

const FEATURES = [
    {
        name: 'Фича 1',
        uid: 1
    },
    {
        name: 'Фича 2',
        uid: 2
    },
    {
        name: 'Фича 3',
        uid: 3
    },
    {
        name: 'Фича 4',
        uid: 4
    },
]

const COMMANDS = [
    {
        name: 'Запустить',
        uid: 1
    },
    {
        name: 'Остановить',
        uid: 2
    },
]

const STATUSES = [
    "STOPPED",
    "STARTED", 
]

class Admin {
    constructor () {
        const element = document.createElement('div');
        element.classList.add('admin');
        
        const header = document.createElement('h2');
        header.innerHTML = "Управление TemaBot"
        element.append(header);

        const features = new Features(FEATURES)
        element.append(features.element)

        const commands = new Commands(COMMANDS);
        element.append(commands.element);

        const status = new Status(STATUSES[0])
        element.append(status.element);

        this.element = element
    }
}

class Status {
    constructor (name) {
        const element = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.append("Статус запуска:")

        const span = document.createElement('span')
        span.classList.add('status')
        span.append(name)
        h4.append(span)

        element.append(h4)
        
        this.element = element;
    }
}

class Features {
    constructor (features) {
        const element = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerHTML = "Выберите фичу:"
        element.append(h3);
        features.forEach(({ name, uid }) => {
            const checkbox = new Checkbox(name, uid);
            element.append(checkbox.element);
        });

        this.element = element;
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
        element.addEventListener(
            'click',
            () => {
                this.clickHandler();
            }
        ) 
        this.element = element;
        this.name = name
        this.uid = uid
    }

    clickHandler () {
        console.log("click", this.name);
        const body = { type: this.uid }
        fetch(`/tasks/`, { 
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(result => {
            getStatus(result.task_id);    
        })
        .catch((error) => console.log(error)); 
    }
}

class Checkbox {
    constructor (name, uid) {
        const element = document.createElement('div');
        const label = document.createElement('label');
        
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', name);
        checkbox.setAttribute('uid', uid);
        checkbox.setAttribute('checked', true);
        checkbox.setAttribute('onchange','changeCheckbox(this)' )

        label.append(checkbox)
        label.append(name)
        
        element.append(label) 

        this.element = element;
    }
}

function changeCheckbox(checkbox) {
    console.log(checkbox.name, checkbox.checked) 
}

const admin = new Admin();
document
    .getElementById('root')
    .append(admin.element)

function getStatus(taskID) {
    fetch(`/tasks/${taskID}/`, { 
        method: "GET"
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
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
