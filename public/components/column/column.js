class TaskColumn extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = '<link rel="stylesheet" href="./components/column/column.css">';
        this.shadowRoot.appendChild(document.getElementById('column').content.cloneNode(true));
        this.appendAddCardForm = this.appendAddCardForm.bind(this);
        this.deleteColumn = this.deleteColumn.bind(this);
    }

    connectedCallback() {
        this.setColumnContent();

        let addCardButton = this.shadowRoot.querySelector('button');
        addCardButton.addEventListener('click', this.appendAddCardForm);
        
        let deleteColumnButton = this.shadowRoot.getElementById('column-delete');
        deleteColumnButton.addEventListener('click', this.deleteColumn);

        let columnTitle = this.shadowRoot.getElementById('column-title');
        columnTitle.addEventListener('click', this.editTitle);
    }

    static get observedAttributes() {
        return ['title'];
    }

    deleteColumn(){
        let confirmDelete = confirm('Do you want to delete this column?');
        if (confirmDelete){
            db.delete('columns', parseInt(this.id.split('column')[1]))
            .then(result => {
                this.remove();
            })
            .catch(error => {
                console.log('Something went wrong: ', error);
            })
        }
    }

    editTitle(){
        let input = document.createElement('input');
        let h1 = this;
        input.value = h1.innerText;
        input.type = 'text';

        function hideInput(){
            input.remove(); 
            h1.editing = false;
            h1.style.display = 'block';
        }

        input.addEventListener('blur', hideInput);
        input.addEventListener('keydown', e => { 
            input.removeEventListener('blur', hideInput);
            if (e.keyCode === 27){
                hideInput(e);
            }    
            if (e.keyCode === 13){
                db.modify('columns', {
                    "title": e.target.value,
                    "id": parseInt(this.parentNode.parentNode.parentNode.host.id.split('column')[1])
                })
                .then(result => {
                    h1.innerText = result.data.title;
                    h1.style.display = 'block';
                    input.remove();
                })
                .catch(error => {
                    console.log('Something went wrong: ', error);
                })
            }
        })

        if (!h1.editing){
            h1.parentNode.insertBefore(input, h1);
            h1.style.display = 'none';
            h1.editing = true;
            input.focus();
            input.setSelectionRange(0,input.value.length);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {

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
            }
        })
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