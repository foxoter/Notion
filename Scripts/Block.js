class Block {
    constructor(id, type, content, renderPanel) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.renderPanel = renderPanel;
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

            if (this.newBlock.textContent.length === 0) {
                if (this.type === 'heading') {
                    this.newBlock.classList.add('main__title_tips_on');
                } else {
                    this.newBlock.classList.add('main__text_tips_on');
                }
            }
        } else {
            const shell = currentBlock.block;
            const local = JSON.parse(localStorage.getItem('blocks'));
            const index = local.findIndex((element) => element.id === currentBlock.id);

            shell.insertAdjacentHTML('afterend', markup);
            this.newBlock = shell.nextSibling;

            const newObj = {
                id: this.id,
                type: this.type,
                content: this.content
            }

            local.splice(index + 1, 0, newObj);
            localStorage.setItem('blocks', JSON.stringify(local));
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
        const local = JSON.parse(localStorage.getItem('blocks'));
        const index = local.findIndex((element) => element.id === this.id);

        local.splice(index, 1);
        localStorage.setItem('blocks', JSON.stringify(local));

        this.block.removeEventListener('input', this.renderTip);
        this.block.removeEventListener('input', this.saveData);
        this.block.removeEventListener('mouseover', this.renderPanel);
        this.block.remove();
    }

    setEventListeners(block) {
        block.addEventListener('input', this.renderTip.bind(this));
        block.addEventListener('input', this.saveData.bind(this));
        block.addEventListener('mouseover', this.renderPanel.bind(this));
    }
}