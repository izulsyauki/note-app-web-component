class NoteItem extends HTMLElement {
    set note(note) {
        this.innerHTML = `
        <div class="note-item">
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <small>${new Date(note.createdAt).toLocaleString()}</small>
        </div>
      `;
    }
}

customElements.define('note-item', NoteItem);
