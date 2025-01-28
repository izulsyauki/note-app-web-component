import NotesApi from "../../data/remote/notes.api.js";

class NoteList extends HTMLElement {
    connectedCallback() {
        if (!this.querySelector("loading-indicator")) {
            const loadingIndicator =
                document.createElement("loading-indicator");
            this.appendChild(loadingIndicator);
        }
        if (!this.querySelector(".notes-container")) {
            const notesContainer = document.createElement("div");
            notesContainer.classList.add("notes-container");
            this.appendChild(notesContainer);
        }

        this.renderNotes();
    }

    async renderArchivedNotes() {
        const loadingIndicator = this.querySelector("loading-indicator");
        const notesContainer = this.querySelector(".notes-container");

        if (!(loadingIndicator instanceof HTMLElement)) {
            console.error("loadingIndicator bukan elemen valid!");
            return;
        }

        loadingIndicator.show();

        try {
            const notesData = await NotesApi.getArchivedNotes();
            const sortedNotes = notesData.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );

            notesContainer.innerHTML = "";

            if (sortedNotes.length === 0) {
                notesContainer.innerHTML =
                    '<p class="no-notes">Tidak ada catatan yang diarsipkan.</p>';
            } else {
                sortedNotes.forEach((note) => {
                    const noteItem = document.createElement("note-item");
                    noteItem.note = note;
                    notesContainer.appendChild(noteItem);
                    setTimeout(() => {
                        noteItem.classList.add("show");
                    }, 50);
                });
            }
        } catch (error) {
            console.error("Gagal memuat catatan yang diarsipkan:", error);
            notesContainer.innerHTML =
                "<p>Gagal memuat data. Silakan coba lagi nanti.</p>";
        } finally {
            loadingIndicator.hide();
            notesContainer.classList.add("loaded");
        }
    }

    async renderNotes() {
        const loadingIndicator = this.querySelector("loading-indicator");
        const notesContainer = this.querySelector(".notes-container");

        if (!(loadingIndicator instanceof HTMLElement)) {
            console.error("loadingIndicator bukan elemen valid!");
            return;
        }

        loadingIndicator.show();

        try {
            const notesData = await NotesApi.getNotes();
            const sortedNotes = notesData.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );

            notesContainer.innerHTML = "";

            if (sortedNotes.length === 0) {
                notesContainer.innerHTML =
                    '<p class="no-notes">Tidak ada catatan.</p>';
            } else {
                sortedNotes.forEach((note) => {
                    const noteItem = document.createElement("note-item");
                    noteItem.note = note;
                    notesContainer.appendChild(noteItem);
                    // Setelah menambahkan note-item, tambahkan kelas show untuk animasi
                    setTimeout(() => {
                        noteItem.classList.add("show");
                    }, 50); // Menambahkan sedikit delay agar animasi lebih halus
                });
            }
        } catch (error) {
            console.error("Gagal memuat catatan:", error);
            notesContainer.innerHTML =
                "<p>Gagal memuat data. Silakan coba lagi nanti.</p>";
        } finally {
            loadingIndicator.hide();
            // Menambahkan kelas loaded pada container agar transisi opacity terjadi
            notesContainer.classList.add("loaded");
        }
    }
}

customElements.define("note-list", NoteList);
