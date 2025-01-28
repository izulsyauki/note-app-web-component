import NotesApi from "../../data/remote/notes.api.js";

class NoteItem extends HTMLElement {
    set note(note) {
        this.innerHTML = `
        <div class="note-item">
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <small>${new Date(note.createdAt).toLocaleString()}</small>
          <span class="note-actions">
          <button class="archive-note-button">${note.archived ? "Batal Arsipkan" : "Arsipkan"}</button>
          <button class="delete-note-button">Delete</button>
          </span>
        </div>
      `;

        const deleteButton = this.querySelector(".delete-note-button");
        deleteButton.addEventListener("click", async () => {
            const confirmDelete = confirm(
                `Apakah kamu yakin mau menghapus catatan: "${note.title}"?`,
            );
            if (confirmDelete) {
                try {
                    await NotesApi.deleteNote(note.id);

                    alert("Catatan berhasil dihapus.");

                    const noteList = document.querySelector("note-list");
                    if (noteList) {
                        await noteList.renderNotes();
                    }
                } catch (error) {
                    console.error("Gagal menghapus catatan:", error);
                    alert("Gagal menghapus catatan. Silakan coba lagi.");
                }
            }
        });

        const archiveButton = this.querySelector(".archive-note-button");
        archiveButton.addEventListener("click", async () => {
            try {
                if (note.archived) {
                    await NotesApi.unarchiveNote(note.id);
                    alert("Catatan berhasil dikembalikan dari arsip.");
                } else {
                    await NotesApi.archiveNote(note.id);
                    alert("Catatan berhasil diarsipkan.");
                }

                const noteList = document.querySelector("note-list");
                if (noteList) {
                    await noteList.renderNotes();
                }
            } catch (error) {
                console.error("Gagal mengubah status arsip catatan:", error);
                alert(
                    "Gagal mengubah status arsip catatan. Silakan coba lagi.",
                );
            }
        });
    }
}

customElements.define("note-item", NoteItem);
