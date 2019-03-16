function loadComponent(url, callback) {
    axios(url)
        .then(response => {
            const parser = new DOMParser();
            const document = parser.parseFromString(response.data, 'text/html');
            const head = document.head;
            const template = head.querySelector('template');
            const style = head.querySelector('style');
            return {
                template,
                style,
            }
        })
        .then(callback);
}

class App extends HTMLElement {
    constructor() {
        super();
        this.columns = [], this.cards = [];
        this.attachShadow({
            mode: 'open'
        });
        // loadComponent('./app.html', response => {
        //     this.shadowRoot.innerHTML = response.template.innerHTML 
        // })
    }

    connectedCallback() {
        db.all('cards')
            .then(result => {
                this.cards = result.data;
            })
            .then(() => {
                console.log('cards', this.cards);
            })
        db.all('columns')
            .then(result => {
                this.columns = result.data;
            })
            .then(() => {
                console.log('columns', this.columns);
            })
    }
}

customElements.define('trello-app', App);



// loadComponent('./components/column/column.html', response => {
//     this.shadowRoot.innerHTML = response.template.innerHTML;
// })