'use strict';

(function () {
    const container = document.querySelector('.main');
    const mainIcon = document.querySelector('.header__emoji');
    const mainTitle = document.querySelector('.header__title');
    const panel = document.querySelector('.panel');

    mainIcon.textContent = headerData.icon;
    mainTitle.value = headerData.title;

    if (window.localStorage.title) {
        mainTitle.value = window.localStorage.title;
    }

    articles.forEach((element) => {
        if (window.localStorage[element.id]) {
            element.content = window.localStorage[element.id];
        }
    });

    function createElement(id, type, content, renderPanel) {
        const element = new Block(id, type, content, renderPanel);

        return element.createBlock();
    }

    function renderPanel(evt) {
        panelItem.render(evt.target.offsetLeft, evt.target.offsetTop, evt.target);
    }

    const blockList = new BlockList(container, articles, createElement, renderPanel);
    blockList.render();

    function saveMainTitle() {
        window.localStorage.setItem('title', `${this.value}`);
    }

    function remove() {
        this.currentBlock.deleteBlock();
    }

    const panelItem = new Panel(panel, remove);
    panelItem.setEventListeners();

    mainTitle.addEventListener('input', saveMainTitle);
})();