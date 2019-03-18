class App extends HTMLElement {
    constructor() {
        super();
        this.columns = [], this.cards = [];
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./app.css">';
        this.shadowRoot.appendChild(document.getElementById('app').content.cloneNode(true));
        this.addButtonListeners();
    }

    addButtonListeners(){
        let addColumnButton = this.shadowRoot.querySelector('button');
        addColumnButton.addEventListener('mouseup', e =>{
            e.target.blur();
        })
        addColumnButton.addEventListener('click', () => { this.addColumn() });
    }

    addColumn(){
            db.all('cards')
            .then(cards => {
                this.cards = cards.data;
                return db.all('columns');
            })
            .then(columns => {
                this.columns = columns.data;
                return db.create('columns', {
                    'title': '(No Title)'
                })
            })
            .then(column => {
                console.log('column created', column)
                this.shadowRoot.appendChild(cm.createColumn(column.data));
            })
    }

    connectedCallback() {
        this.renderColumnsAndCards();
    }

    doRenderAgain(){
        new Promise((resolve, reject) => {
            console.log(this);
            resolve(this.clearColumnsAndCards());
        }).then(result => {
            console.log(result);
            this.renderColumnsAndCards();
        })
    }

    renderColumnsAndCards(){
        db.all('cards')
        .then(cards => { this.cards = cards.data })
        .then(() => { return db.all('columns')})
        .then(columns => { this.columns = columns.data })
        .then(() => { 
            this.setColumnsAndCards() 
        });
    }

    clearColumnsAndCards(){
        while(this.shadowRoot.childNodes.length>0){
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }
    }

    setColumnsAndCards(){
        this.columns.forEach(column => {
            let columnNode = cm.createColumn(column);
            columnNode.doRenderAgain = this.doRenderAgain;
            console.log(this.shadowRoot)
            this.shadowRoot.getElementById('columns-wrapper').appendChild(columnNode);
            this.cards.forEach(card => {
                if (columnNode.id === 'column' + card.columnId){
                    let cardNode = cm.createCard(card);
                    cardNode.doRenderAgain = this.doRenderAgain;
                    columnNode.shadowRoot.getElementById('column-content').appendChild(cardNode);
                }
            })
        })
    }
}

customElements.define('trello-app', App);