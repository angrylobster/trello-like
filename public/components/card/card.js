class TaskCard extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./components/card/card.css">';
        this.shadowRoot.appendChild(document.getElementById('card').content.cloneNode(true));
        this.shadowRoot.getElementById('card-delete').addEventListener('click', this.deleteCard);
    }

    connectedCallback() {
        this.initializeCardContent();
    }

    static get observedAttributes() {
        return ['title', 'description', 'columnId'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.setCardContent(name, newValue)
        }
    }

    initializeCardContent(){
        for(let i=0 ; i < this.attributes.length; i++){
            this.setCardContent(this.attributes[i].name, this.attributes[i].value);
        }
    }

    deleteCard(){
        db.delete('cards', this.parentNode.id.split('card')[1])
        .then(result => {
            this.parentNode.remove();
        })
        .catch(error => {
            console.log("Something went wrong: " + error);
        })
    }

    setCardContent(name, newValue) {
        switch (name) {
            case 'title':
                this.shadowRoot.getElementById('card-title').innerText = newValue;
                break;
            case 'description':
                this.shadowRoot.getElementById('card-description').innerText = newValue;
                break;
            case 'id':
                this.shadowRoot.querySelector('div').id = 'card' + newValue;
                break;
            case'columnId':
                this.shadowRoot.querySelector('div').columnId = newValue;
                break;
            default:
                break;
        }
    }
}
window.customElements.define('task-card', TaskCard);