"use strict";

const FEATURES = [
    {
        name: 'Помощь',
        worker: 'HelperWorker',
        uid: '1',
        available: 'true',
        readonly: 'true'
    },
    {
        name: 'Высказывания',
        worker: 'FamousWorker',
        uid: '2',
        available: 'true'
    },
    {
        name: 'Пословицы',
        worker: 'ProverbsWorker',
        uid: '3',
        available: 'true'
    },
    {
        name: 'Игра в числа',
        worker: 'NumbersWorker',
        uid: '4',
        available: 'true'
    },
    {
        name: 'Игра в города',
        worker: 'CitiesWorker',
        uid: '5',
        available: 'true'
    },
    {
        name: 'Туристическая информация',
        worker: 'TourismWorker',
        uid: '6',
        available: 'true'
    },
    {
        name: 'Эхо на неизвестные команды',
        worker: 'EchoWorker',
        uid: '7',
        available: 'true',
        readonly: 'true'
    }
]

const COMMANDS = [
    {
        name: 'Запустить',
        uid: '1'
    },
    {
        name: 'Остановить',
        uid: '2'
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

class Features {
    constructor (features) {
        const element = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerHTML = "Выберите фичу:"
        element.append(h3);
        features.forEach(({ name, uid, available, readonly }) => {
            const checkbox = new Checkbox(name, uid, available, readonly);
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
    const feature = FEATURES.find((feature) => feature.uid === checkbox.dataset.uid)
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
