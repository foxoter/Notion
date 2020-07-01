class Panel {
    constructor(panel) {
        this.panel = panel;
    }

    render(horizont, vertical) {
        this.panel.style.left = `${horizont - 95 - 15}px`;
        this.panel.style.top = `${vertical + 10}px`;
        this.panel.classList.add('panel_display_show');
        this.panel.style.display = 'flex';
    }
}