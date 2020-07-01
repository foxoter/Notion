class BlockList {
    constructor(container, initialData, createElement, renderPanel) {
        this.container = container;
        this.initialData = initialData;
        this.createElement = createElement;
        this.renderPanel = renderPanel;
    }

    render() {
        this.initialData.forEach((element) => {
            const newBlock = this.createElement(element.id, element.type, element.content, this.renderPanel, null);
            this.container.appendChild(newBlock);
        });
    }
}