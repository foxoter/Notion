'use strict';

(function () {
    // localStorage.clear();
    const container = document.querySelector('.main');
    const mainIcon = document.querySelector('.header__emoji');
    const mainTitle = document.querySelector('.header__title');
    const panel = document.querySelector('.panel');

    mainIcon.textContent = headerData.icon;
    mainTitle.value = headerData.title;

    if (window.localStorage.title) {
        mainTitle.value = window.localStorage.title;
    }

    function createElement(id, type, content, renderPanel, currentBlock) {
        const element = new Block(id, type, content, renderPanel);

        return element.createBlock(currentBlock);
    }

    function renderPanel(evt) {
        panelItem.render(evt.target.offsetLeft, evt.target.offsetTop, this);
    }

    let blocks = articles;

    if (localStorage.getItem('blocks')) {
        blocks = JSON.parse(localStorage.getItem('blocks'));
    }

    const blockList = new BlockList(container, blocks, createElement, renderPanel);
    blockList.render();

    function saveMainTitle() {
        window.localStorage.setItem('title', `${this.value}`);
    }

    function generateId() {
        let id = Math.floor(Math.random() * (2 ** 12));

        while (articles.find((element) => element.id === id)) {
            id = Math.floor(Math.random() * (2 ** 12));
        }

        return id;
    }

    function add(type) {
        const newBlock = createElement(generateId(), type, '', renderPanel, this.currentBlock);
        newBlock.focus();
        if (newBlock.classList.contains('main__title')) {
            newBlock.classList.add('main__title_tips_on');
        } else {
            newBlock.classList.add('main__text_tips_on');
        }
    }

    function remove() {
        this.currentBlock.deleteBlock();
        panelItem.hidePanel();
    }

    const panelItem = new Panel(panel, remove, add);
    panelItem.setEventListeners();

    mainTitle.addEventListener('input', saveMainTitle);
})();