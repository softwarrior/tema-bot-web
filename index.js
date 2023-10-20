"use strict";

const FEATURE_ID = {
    FEATURE_1: 1,
    FEATURE_2: 2,
    FEATURE_3: 3,
    FEATURE_4: 4
}

class Admin {
    constructor () {
        const element = document.createElement('div');
        element.classList.add('admin');
        
        const header = document.createElement('h2');
        header.innerHTML = "Управление TemaBot"
        element.append(header);

        const features_names = ['Фича 1', 'Фича 2', 'Фича 3', 'Фича 4']
        const features = new Features(features_names)
        element.append(features.element)

        const button1 = new Button("Запустить")
        const button2 = new Button("Остановить")
        const commands = new Commands([button1, button2]);
        element.append(commands.element);

        const status = new Status()
        element.append(status.element);

        this.element = element
    }
}

class Status {
    constructor () {
        const element = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.append("Статус запуска:")

        const span = document.createElement('span')
        span.classList.add('status')
        span.innerHTML = 'незапущен'
        h4.append(span)

        element.append(h4)
        
        this.element = element;
    }
}

class Features {
    constructor (names) {
        const element = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.innerHTML = "Выберите фичу:"
        element.append(h3);
        names.forEach(fiture_name => {
            const checkbox = new Checkbox(fiture_name);
            element.append(checkbox.element);
        });

        this.element = element;
    }
}

class Commands {
    constructor (buttons) {
        const element = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.innerHTML = "Выберите команду:"
        element.append(h4);

        buttons.forEach((button) => {
            element.append(button.element)
        });

        this.element = element;
    }
}

class Button {
    constructor (name) {
        const element = document.createElement('button');
        element.innerHTML = name;
        element.classList.add('button');
        element.addEventListener(
            'click',
            () => {
                this.clickHandler();
            }
        ) 
        this.element = element;
        this.name = name
    }

    clickHandler () {
        console.log("click", this.name);
    }
}

class Checkbox {
    constructor (name) {
        const element = document.createElement('div');
        const label = document.createElement('label');
        
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', name);
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
