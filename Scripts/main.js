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
        const newBlock = new Block(id, type, content, renderPanel, add);
        const createdBlock = newBlock.createBlock(currentBlock);

        return { newBlock, createdBlock };
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
        let element;
        let block;

        if (this !== null) {
            const { newBlock, createdBlock } = createElement(generateId(), type, '', renderPanel, this.currentBlock);
            element = newBlock;
            block = createdBlock;
        } else {
            const { newBlock, createdBlock } = createElement(generateId(), type, '', renderPanel, null);
            element = newBlock;
            block = createdBlock;
        }

        block.focus();

        const classL = block.classList[0];
        block.classList.add(`${classL}_tips_on`);

        return { element, block };
    }

    function remove() {
        this.currentBlock.deleteBlock();
        panelItem.hidePanel();
    }

    const panelItem = new Panel(panel, remove, add);
    panelItem.setEventListeners();

    mainTitle.addEventListener('input', saveMainTitle);
})();