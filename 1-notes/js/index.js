import NoteManager from "./models/NoteManager";

const noteManager = new NoteManager({
    el: document.querySelector('.notes'),
    notes: []
});


const newNoteBtn = document.querySelector('.new-note-btn');
newNoteBtn.onclick = () => {
    noteManager.prependNote({
        title: '',
        body: ''
    })
}

// window.addEventListener('load', () => {

//     // Restore notes
//     noteManager.readStorage();
//     noteManager.renderNotes();

// });