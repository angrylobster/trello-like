let template = document.createElement('template');
template.innerHTML = `
<style>
    div {
        background-color: rgb(230,230,230);
        padding: 10px;
        border-radius: 5px;
    }
    h1 {
        color: #17394d;
        font-size: 14px;
        font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
        padding: 0 5px 0 5px;
    }
</style>
<div>
    <h1>
    Hey yo
    </h1>
    
</div>
`

class TaskColumn extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('click', () => {
            alert('yo');
        })

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

}
window.customElements.define('task-column', TaskColumn);