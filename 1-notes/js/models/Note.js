export default class Note {
    constructor({title, body}, noteManager) {
        this.title = title;
        this.body = body;
        this.el = null;
        this.noteManager = noteManager;
    }

    getElement() {
        const tpl = this.getTemplate();
        const tmpDiv = document.createElement('div');
        tmpDiv.innerHTML = tpl.replace('{{title}}', this.title).replace('{{body}}', this.body);

        this.el = tmpDiv.children[0];

        this.attachEventListeners();

        return this.el;
    }

    getTemplate() {
        return `
            <div class="note">
                <div class="note-header">
                    <span class="note-close">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
                <div class="note-title" contenteditable>
                    {{title}}
                </div>
                <div class="note-body" contenteditable>
                    {{body}}
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const btnClose = this.el.querySelector('.note-close');
        btnClose.onclick = () => this.noteManager.removeNote(this);
    

        const title = this.el.querySelector('.note-title');
        title.oninput = (ev) => {
            this.title = ev.target.innerText;
        };

        const body = this.el.querySelector('.note-body');
        body.oninput = (ev) => {
            this.body = ev.target.innerText;
        };

    };


};