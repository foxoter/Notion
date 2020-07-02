class Panel {
    constructor(panel, removeCurrentBLock, addNewBLock) {
        this.panel = panel;
        this.removeCurrentBLock = removeCurrentBLock;
        this.addNewBLock = addNewBLock;
    }

    render(horizont, vertical, block) {
        this.currentBlock = block;
        this.panel.style.left = `${horizont - 95 - 15}px`;
        this.panel.style.top = `${vertical + 5}px`;
        this.panel.classList.add('panel_display_show');
        this.panel.style.display = 'flex';
    }

    hidePanel() {
        this.panel.style.display = 'none';
    }

    setEventListeners() {
        document.querySelector('.panel__button_function_delete').addEventListener('click', this.removeCurrentBLock.bind(this));
        document.querySelector('.panel__button_function_h1').addEventListener('click', this.addNewBLock.bind(this, 'heading'));
        document.querySelector('.panel__button_function_text').addEventListener('click', this.addNewBLock.bind(this, 'paragraph'));
    }
}