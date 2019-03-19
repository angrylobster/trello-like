class TaskCard extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./components/card/card.css">';
        this.shadowRoot.appendChild(document.getElementById('card').content.cloneNode(true));
        this.shadowRoot.getElementById('card-delete').addEventListener('click', this.deleteCard);
        this.addEventListener('click', this.toggleDescription);
        this.shadowRoot.getElementById('card-edit').addEventListener('click', e => {this.editDescription(e)});
    }

    toggleDescription(){
        let description = this.shadowRoot.getElementById('card-description');
        if(!description.style.display || description.style.display === 'none'){
            description.style.display = 'block';
        } else {
            description.style.display = 'none';
        }
    }

    connectedCallback() {
        this.initializeCardContent();
        this.shadowRoot.getElementById('card-title').addEventListener('click', this.editTitle);
    }

    editDescription(e){
        e.stopPropagation();
        let textarea = document.createElement('textarea');
        let description = this.shadowRoot.getElementById('card-description');
        textarea.innerText = description.innerText;
        textarea.rows = 3;

        function hideTextArea() {
            textarea.remove();
            description.editing = false;
            description.style.display = 'block';
        }
        textarea.addEventListener('blur', hideTextArea);
        textarea.addEventListener('keydown', e => {
            if (e.keyCode === 27) {
                hideTextArea();
            }
            if (e.keyCode === 13) {
                db.modify('cards', {
                        "title": this.title,
                        "description": e.target.value.trim().length === 0 ? '(No description)' : e.target.value,
                        "id": parseInt(this.id),
                        "columnId": this.getAttribute('column-id')
                    })
                    .then(result => {
                        description.innerText = result.data.description;
                        textarea.blur();
                        this.addEventListener('click', this.toggleDescription);
                    })
                    .catch(error => {
                        console.log('Something went wrong: ', error);
                    })
            }
        })
        if (!description.editing) {
            description.parentNode.insertBefore(textarea, description);
            description.style.display = 'none';
            description.editing = true;
            textarea.focus();
            textarea.setSelectionRange(0, textarea.innerHTML.length);
            this.removeEventListener('click', this.toggleDescription);
        }
    }

    editTitle(){
        let input = document.createElement('input');
        let h1 = this;
        input.value = h1.innerText;
        input.type = 'text';

        function hideInput() {
            input.remove();
            h1.editing = false;
            h1.style.display = 'inline-block';
        }

        input.addEventListener('blur', hideInput);
        input.addEventListener('keydown', e => {
            input.removeEventListener('blur', hideInput);
            if (e.keyCode === 27) {
                hideInput(e);
            }
            if (e.keyCode === 13) {
                db.modify('cards', {
                        "title": e.target.value.trim().length ? e.target.value : '(No Title)',
                        "description": this.parentNode.parentNode.getElementById('card-description').innerText,
                        "id": parseInt(this.parentNode.id.split('card')[1]),
                        "columnId": this.parentNode.parentNode.querySelector('div').getAttribute('column-id')
                    })
                    .then(result => {
                        h1.innerText = result.data.title;
                        h1.style.display = 'inline-block';
                        h1.editing = false;
                        input.remove();
                    })
                    .catch(error => {
                        console.log('Something went wrong: ', error);
                    })
            }
        })

        if (!h1.editing) {
            h1.parentNode.insertBefore(input, h1);
            h1.style.display = 'none';
            h1.editing = true;
            input.focus();
            input.setSelectionRange(0, input.value.length);
        }
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
            case 'column-id':
                this.shadowRoot.querySelector('div').setAttribute('column-id', newValue);
                break;
            default:
                break;
        }
    }
}
window.customElements.define('task-card', TaskCard);