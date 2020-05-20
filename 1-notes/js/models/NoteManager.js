import Note from "./Note";

export default class NoteManager {
    constructor({el, notes}) {
        this.el = el;
        this.notes = notes.map(note => new Note(note, this));

        this.renderNotes();
    }

    renderNotes() {
        this.el.innerHTML = '';
        this.notes.forEach(note => this.renderNote(note.getElement()));
    }

    renderNote(noteEl) {
        this.el.appendChild(noteEl);
    }

    removeNote(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        // Persist data in locaStorage
        // this.persistData();

        this.renderNotes();

    }

    addNote(note) {
        this.notes.push(new Note(note, this));
        // Persist data in locaStorage
        // this.persistData();

        this.renderNotes();


    }

    prependNote(note) {
        this.notes.unshift(new Note(note, this));
        // this.persistData();
        this.renderNotes();
    }

    // persistData() {
    //     localStorage.setItem('notes', JSON.stringify(this.notes));
    // }

    // readStorage() {
    //     const storage = JSON.parse(localStorage.getItem('notes'));

    //     // Restoring likes from the localStorage
    //     if (storage) this.notes = storage;
    // }
}
