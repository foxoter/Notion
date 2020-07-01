class Block {
    constructor(id, type, content, renderPanel, removeBlockFormBrowser) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.renderPanel = renderPanel;
        this.removeBlockFormBrowser = removeBlockFormBrowser;
    }

    createBlock(currentBlock) {
        const markup = `<textarea></textarea>`;

        if (currentBlock === null) {
            const shell = document.createElement('div');
            shell.insertAdjacentHTML('afterbegin', markup);
            this.newBlock = shell.firstElementChild;
            this.newBlock.textContent = this.content;
        } else {
            const shell = currentBlock.block;
            shell.insertAdjacentHTML('afterend', markup);
            this.newBlock = shell.nextSibling;
        }
        

        if (this.type === 'heading') {
            this.newBlock.classList.add('main__title');
            this.newBlock.style.height = '35px';
        } else if (this.type === 'paragraph') {
            this.newBlock.classList.add('main__text');
            this.newBlock.style.height = `${this.calcHeight(this.content.length)}px`;
        }
        this.setEventListeners(this.newBlock);
        this.block = this.newBlock;
        return this.newBlock;
    }

    renderTip(evt) {
        if (this.type === 'heading') {
            if (this.contentLength === 0) {
                evt.target.classList.add('main__title_tips_on');
            } else {
                evt.target.style.border = '0';
                evt.target.classList.remove('main__title_tips_on');
            }
        } else {
            if (this.contentLength === 0) {
                evt.target.classList.add('main__text_tips_on');
            } else {
                evt.target.style.border = '0';
                evt.target.classList.remove('main__text_tips_on');
            }
        }
    }

    calcHeight(symbols) {
        return Math.ceil(symbols / 75) * 24;
    }

    changeHeight(evt) {
        this.contentLength = evt.target.value.length;
        this.content = evt.target.value;

        evt.target.style.height = `${this.calcHeight(this.contentLength)}px`;
    }

    saveData() {
        articles.forEach((element) => {
            if (element.id === this.id) {
                window.localStorage.setItem(`${element.id}`, `${this.content}`);
            }
        });
    }

    deleteBlock() {
        this.block.removeEventListener('input', this.changeHeight);
        this.block.removeEventListener('input', this.renderTip);
        this.block.removeEventListener('input', this.saveData);
        this.block.removeEventListener('mouseover', this.renderPanel);
        this.removeBlockFormBrowser();
        this.block.remove();
    }

    setEventListeners(block) {
        block.addEventListener('input', this.changeHeight.bind(this));
        block.addEventListener('input', this.renderTip.bind(this));
        block.addEventListener('input', this.saveData.bind(this));
        block.addEventListener('mouseover', this.renderPanel.bind(this));
    }
}