import NotesData from '../data/local/note.js';

class NoteList extends HTMLElement {
    connectedCallback() {
        this.renderNotes();
    }

    renderNotes() {
        const notesData = NotesData.getAll();

        const sortedNotes = notesData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (sortedNotes.length === 0) {
            this.innerHTML = '<p>No notes available.</p>';
        } else {
            this.innerHTML = sortedNotes
                .map(
                    (note) => `
            <note-item></note-item>
          `
                )
                .join('');

            requestAnimationFrame(() => {
                this.querySelectorAll('note-item').forEach((item, index) => {
                    item.note = sortedNotes[index];
                });
            })
        }
    }
}

customElements.define('note-list', NoteList);

