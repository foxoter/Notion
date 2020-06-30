class Block {
    constructor(type, content) {
        this.type = type;
        this.content = content;
        this.changeHeigth = this.changeHeight.bind(this);
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
            newBlock.style.height = `${this.setHeight(this.content)}px`;
            this.setEventListeners(newBlock);
        }
        return newBlock;
    }

    changeHeight(evt) {
        const symbols = evt.target.value.length;

        evt.target.style.height = `${Math.ceil(symbols / 75) * 24}px`;
    }

    setHeight(str) {
        return Math.ceil(str.length / 75) * 24;
    }
    
    deleteBlock() {
    }
    
    setEventListeners(block) {
      block.addEventListener('input', this.changeHeight);
    }
}