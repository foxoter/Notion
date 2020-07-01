class BlockList {
    constructor(container, initialData, createElement) {
        this.container = container;
        this.initialData = initialData;
        this.createElement = createElement;
    }

    render() {
        this.initialData.forEach((element) => {
            const newBlock = this.createElement(element.id, element.type, element.content);
            this.container.appendChild(newBlock);
        });

    }
}