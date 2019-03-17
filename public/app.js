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
        .then(() => { this.setColumnsAndCards() });
    }

    setColumnsAndCards(){
        this.columns.forEach(column => {
            this.shadowRoot.appendChild(cm.createColumn(column));
        })
    }
}

customElements.define('trello-app', App);