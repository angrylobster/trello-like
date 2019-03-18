class TaskColumn extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./components/column/column.css">';
        this.shadowRoot.appendChild(document.getElementById('column').content.cloneNode(true));
        this.appendAddCardForm = this.appendAddCardForm.bind(this);
    }

    connectedCallback() {
        this.setColumnContent();
        this.setAddCardButtonListener();
    }

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            console.log(oldValue);
            console.log(newValue);
        }
    }

    appendAddCardForm() {
        let form = document.createElement('form');
        form.id = 'add-card-form';
        let textarea = document.createElement('textarea');
        textarea.placeholder = 'Enter a title for this card...';
        form.append(textarea);
        this.shadowRoot.getElementById('add-card-button').remove();
        this.shadowRoot.getElementById('column-wrapper').appendChild(form.cloneNode(true));

        let addCardForm = this.shadowRoot.getElementById('add-card-form');
        addCardForm.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                let jsonObject = {
                    title: e.target.value,
                    columnId: parseInt(this.id.split('column')[1]),
                }
                db.create('cards', jsonObject);
                console.log(this);
                this.doRenderAgain();
            }
        })
    }

    setAddCardButtonListener() {
        let addCardButton = this.shadowRoot.querySelector('button');
        addCardButton.addEventListener('click', this.appendAddCardForm);
    }

    setColumnContent() {
        if (this.hasAttribute('title')) {
            this.shadowRoot.getElementById('column-title').innerText = this.title;
        }

        if (this.hasAttribute('id')) {
            this.id = 'column' + this.id;
        }
    }
}
window.customElements.define('task-column', TaskColumn);