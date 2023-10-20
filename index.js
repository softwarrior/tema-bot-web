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

        const features_names_to_create = ['Фича 1', 'Фича 2', 'Фича 3', 'Фича 4']
        const features = new Features(features_names_to_create)
        element.append(features.element)

        const h4 = document.createElement('h4');
        h4.innerHTML = "Выберите команду:"
        element.append(h4);

        const menuPoint1 = new MenuPoint("Запустить")
        const menuPoint2 = new MenuPoint("Остановить")
        const menu = new Menu([menuPoint1, menuPoint2]);
        element.append(menu.element);

        const status = document.createElement('h5');
        status.append("Статус запуска:")
        const status_span = document.createElement('span')
        status_span.classList.add('status')
        status_span.innerHTML = 'незапущен'
        status.append(status_span)
        element.append(status);

        this.element = element
    }
}

class Features {
    constructor (names) {
        const element = document.createElement('div');
        const h_fitures = document.createElement('h3');
        h_fitures.innerHTML = "Выберите фичу:"
        element.append(h_fitures);
        names.forEach(fiture_name => {
            const checkbox = new MenuCheckbox(fiture_name);
            element.append(checkbox.element);
        });

        this.element = element;
    }
}
class Menu {
    constructor (menuPoints) {
        const element = document.createElement('div');
        element.classList.add('menu');

        menuPoints.forEach((menuPoint) => {
            element.append(menuPoint.element)
        });

        this.element = element;
    }
}

class MenuPoint {
    constructor (name) {
        const element = document.createElement('button');
        element.innerHTML = name;
        element.classList.add('menuPoint');
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

class MenuCheckbox {
    constructor (name) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', name);
        checkbox.setAttribute('checked', true);
        checkbox.setAttribute('onchange','toggleFeature(this)' )

        label.append(checkbox)
        label.append(name)
        
        div.append(label) 

        this.element = div;
    }
}
function toggleFeature(menuCheckbox) {
    console.log(menuCheckbox.name, menuCheckbox.checked) 
}

const admin = new Admin();
document
    .getElementById('root')
    .append(admin.element)
