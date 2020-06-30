'use strict';

(function () {
    const container = document.querySelector('.main');
    const mainIcon = document.querySelector('.header__emoji');
    const mainTitle = document.querySelector('.header__title');

    mainIcon.textContent = headerData.icon;
    mainTitle.value = headerData.title;


    function createElement(type, content) {
        const element = new Block(type, content);
        return element.createBlock();
    }

    const blockList = new BlockList(container, articles, createElement);
    blockList.render();
})();