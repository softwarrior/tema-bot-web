"use strict";


class Home {
    constructor () {
        const element = document.createElement('div');
        element.classList.add('home');
        
        const linkSettings = document.createElement('a');
        linkSettings.classList.add('link')
        linkSettings.setAttribute('href', '/settings/');
        linkSettings.append('Настройки')
        element.append(linkSettings);

        const linkWorker = document.createElement('a');
        linkWorker.classList.add('link')
        linkWorker.setAttribute('href', '/worker/');
        linkWorker.append('Запуск')
        element.append(linkWorker);

        this.element = element
    }

    setStatusName(name) {
        this.status.setName(name)
    }
}

const home = new Home();
document
    .getElementById('root')
    .append(home.element)

