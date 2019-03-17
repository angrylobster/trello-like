class App extends HTMLElement {
    constructor() {
        super();
        this.columns = [], this.cards = [];
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./app.css">';
    }

    connectedCallback() {
        db.all('cards')
        .then(cards => { this.cards = cards.data })
        .then(() => { return db.all('columns')})
        .then(columns => { this.columns = columns.data })
        .then(() => { 
            this.setColumnsAndCards() 
        });
    }

    getColumns(){
        db.all('columns')
        .then(columns => { this.columns = columns.data });
    }

    getCards(){
        db.all('cards')
        .then(cards => { this.cards = cards.data });
    }

    setColumnsAndCards(){
        this.columns.forEach(column => {
            let columnNode = cm.createColumn(column);
            columnNode.getColumns = this.getColumns;
            columnNode.getCards = this.getCards;
            this.shadowRoot.appendChild(columnNode);
            this.cards.forEach(card => {
                if (columnNode.id === 'column' + card.columnId){
                    columnNode.shadowRoot.getElementById('column-content').appendChild(cm.createCard(card));
                }
            })
        })
    }
}

customElements.define('trello-app', App);