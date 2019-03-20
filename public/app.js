class App extends HTMLElement {
    constructor() {
        super();
        this.columns = [], this.cards = [];
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./app.css">';
        this.shadowRoot.appendChild(document.getElementById('app').content.cloneNode(true));
        this.renderColumnsAndCards = this.renderColumnsAndCards.bind(this);
        this.shadowRoot.getElementById('search-bar').addEventListener('input', e => { this.searchCards(e) });
        this.shadowRoot.getElementById('search-bar').addEventListener('keydown', e => {
            if (e.keyCode === 27){
                e.target.value = '';
                this.searchCards(e);
            }
        })
    }

    searchCards(e) {
        this.shadowRoot.querySelectorAll('task-column').forEach(column => {
            column.shadowRoot.querySelectorAll('task-card').forEach(card => {
                // console.log(card.getAttribute('description').toLowerCase())
                if (card.title.toLowerCase().includes(e.target.value.toLowerCase())){
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            })
        })
    }

    addButtonListeners() {
        let addColumnButton = this.shadowRoot.querySelector('button');
        addColumnButton.addEventListener('mouseup', e => {
            e.target.blur();
        })
        addColumnButton.addEventListener('click', () => {
            this.addColumn();
        });
    }

    addColumn() {
        db.create('columns', {
                'title': '(No Title)'
            })
            .then(result => {
                this.shadowRoot.getElementById('columns-wrapper').appendChild(cm.createColumn(result.data));
            })
    }

    connectedCallback() {
        this.addButtonListeners();
        this.renderColumnsAndCards();
    }

    renderColumnsAndCards() {
        db.all('cards')
            .then(cards => {
                this.cards = cards.data;
                return db.all('columns');
            })
            .then(columns => {
                this.columns = columns.data;
            })
            .then(() => {
                this.columns.forEach(column => {
                    let columnNode = cm.createColumn(column);
                    columnNode.renderColumnsAndCards = this.renderColumnsAndCards;
                    this.shadowRoot.getElementById('columns-wrapper').appendChild(columnNode);
                    this.cards.forEach(card => {
                        if (columnNode.id === 'column' + card.columnId) {
                            let cardNode = cm.createCard(card);
                            columnNode.shadowRoot.getElementById('column-content').appendChild(cardNode);
                        }
                    })
                })
            })
    }
}

customElements.define('trello-app', App);