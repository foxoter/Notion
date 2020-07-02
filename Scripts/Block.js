class Block {
    constructor(id, type, content, renderPanel, removeBlockFormBrowser) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.renderPanel = renderPanel;
        this.removeBlockFormBrowser = removeBlockFormBrowser;
    }

    createBlock(currentBlock) {
        let markup;

        if (this.type === 'heading') {
            markup = `<h2 contenteditable="true"></h2>`;
        } else {
            markup = `<p contenteditable="true"></p>`;
        }

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
        } else if (this.type === 'paragraph') {
            this.newBlock.classList.add('main__text');
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

    saveData(evt) {
        this.content = evt.target.textContent;
        const localSt = JSON.parse(localStorage.getItem('blocks'));

        localSt.forEach((element) => {
            if (element.id === this.id) {
                element.content = this.content;
            }
        });

        localStorage.setItem('blocks', JSON.stringify(localSt));
    }

    deleteBlock() {
        this.block.removeEventListener('input', this.renderTip);
        this.block.removeEventListener('input', this.saveData);
        this.block.removeEventListener('mouseover', this.renderPanel);
        this.removeBlockFormBrowser();
        this.block.remove();
    }

    setEventListeners(block) {
        block.addEventListener('input', this.renderTip.bind(this));
        block.addEventListener('input', this.saveData.bind(this));
        block.addEventListener('mouseover', this.renderPanel.bind(this));
    }
}