class BlockList {
    constructor(container, blocks, createElement, renderPanel) {
        this.container = container;
        this.blocks = blocks;
        this.createElement = createElement;
        this.renderPanel = renderPanel;
    }

    render() {
        if (!localStorage.getItem('blocks')) {
            localStorage.setItem('blocks', JSON.stringify(this.blocks));
        }
        this.blocks = JSON.parse(localStorage.getItem('blocks'));
        this.blocks.forEach((element) => {
            const newBlock = this.createElement(element.id, element.type, element.content, this.renderPanel, null);

            this.container.appendChild(newBlock);
        });
    }
}