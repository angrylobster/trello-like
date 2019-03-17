class TaskColumn extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./components/column/column.css">';
        this.shadowRoot.appendChild(document.getElementById('column').content.cloneNode(true));
    }

    connectedCallback(){
        this.setColumnContent();
    }

    static get observedAttributes() { 
        return ['title']; 
    }

    attributeChangedCallback(name, oldValue, newValue){
        if (name === 'title'){
            console.log(oldValue);
            console.log(newValue);
        }
    }

    setColumnContent(){
        if (this.hasAttribute('title')){
            this.shadowRoot.getElementById('column-title').innerText = this.title;
        }

        if(this.hasAttribute('id')){
            this.id = 'column' + this.id;
        }
    }
}
window.customElements.define('task-column', TaskColumn);