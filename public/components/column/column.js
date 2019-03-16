class TaskColumn extends HTMLElement {
    constructor() {
        super();

        this.addEventListener('click', () => {
            alert('yo');
        })

        let shadowRoot = this.attachShadow({mode: 'open'});
        let test = document.getElementById('my-paragraph');
        shadowRoot.appendChild(test.content.cloneNode(true));
    }

}
window.customElements.define('task-column', TaskColumn);