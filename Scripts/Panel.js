class Panel {
    constructor(panel, removeCurrentBLock) {
        this.panel = panel;
        this.removeCurrentBLock = removeCurrentBLock;
    }

    render(horizont, vertical, block) {
        this.currentBlock = block;
        this.panel.style.left = `${horizont - 95 - 15}px`;
        this.panel.style.top = `${vertical + 10}px`;
        this.panel.classList.add('panel_display_show');
        this.panel.style.display = 'flex';
    }

    setEventListeners() {
        document.querySelector('.panel__button_function_delete').addEventListener('click', this.removeCurrentBLock.bind(this));
    }
}