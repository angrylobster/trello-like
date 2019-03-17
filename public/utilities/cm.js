//cm stands for Component Manager
const cm = {
    createColumn: column => {
        const columnNode = document.createElement('task-column');
        columnNode.setAttribute('id', column.id);
        columnNode.setAttribute('title', column.title);
        return columnNode;
    },
    createCard: card => {
        const cardNode = document.createElement('task-card');
        cardNode.setAttribute('id', card.id);
        cardNode.setAttribute('title', card.title);
        cardNode.setAttribute('description', card.description);
        cardNode.setAttribute('column-id', card.columnId);
        return cardNode;
    }
}