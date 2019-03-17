class TaskCard extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./components/card/card.css">';
        this.shadowRoot.appendChild(document.getElementById('card').content.cloneNode(true));

    }

    connectedCallback() {
        this.initializeCardContent();
        // if (this.hasAttribute('title')){
        //     this.shadowRoot.getElementById('column-title').innerText = this.title;
        // }
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