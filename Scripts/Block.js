class Block {
    constructor(id, type, content, renderPanel) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.renderPanel = renderPanel;
    }

    createBlock() {
        const markup = `<textarea></textarea>`;
        const shell = document.createElement('div');
        shell.insertAdjacentHTML('afterbegin', markup);
        const newBlock = shell.firstElementChild;
        newBlock.textContent = this.content;
        if (this.type === 'heading') {
            newBlock.classList.add('main__title');
            newBlock.style.height = '35px';
        } else if (this.type === 'paragraph') {
            newBlock.classList.add('main__text');
            newBlock.style.height = `${this.calcHeight(this.content.length)}px`;
        }
        this.setEventListeners(newBlock);

        return newBlock;
    }

    renderBorder(evt) {
        if (this.contentLength === 0) {
            evt.target.style.border = '1px solid salmon';
        } else {
            evt.target.style.border = '0';
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
    }

    setEventListeners(block) {
        block.addEventListener('input', this.changeHeight.bind(this));
        block.addEventListener('input', this.renderBorder.bind(this));
        block.addEventListener('input', this.saveData.bind(this));
        block.addEventListener('mouseover', this.renderPanel);
    }
}