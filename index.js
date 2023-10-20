"use strict";

class Admin {
    constructor () {
        const element = document.createElement('div');
        element.classList.add('admin');
        
        const h1 = document.createElement('h1');
        h1.innerHTML = "Управление TemaBot"
        element.append(h1);

        const h4 = document.createElement('h4');
        h4.innerHTML = "Выберите команду:"
        element.append(h4);

        const menuPoint1 = new MenuPoint("Запустить")
        const menuPoint2 = new MenuPoint("Остановить")
        const menu = new Menu([menuPoint1, menuPoint2]);
        element.append(menu.element);

        const h5 = document.createElement('h5');
        h5.innerHTML = "Статус запуска:"
        element.append(h5);

        this.element = element
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

const admin = new Admin();
document
    .getElementById('root')
    .append(admin.element)