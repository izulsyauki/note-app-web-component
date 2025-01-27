import NotesApi from '../../data/remote/notes.api.js';

class NoteList extends HTMLElement {
    connectedCallback() {
        // Tambahkan loading indicator ke dalam DOM
        if (!this.querySelector('loading-indicator')) {
            this.innerHTML = `<loading-indicator></loading-indicator>`;
        }
        this.renderNotes();
    }

    async renderNotes() {
        const loadingIndicator = this.querySelector('loading-indicator');
        console.log('LoadingIndicator:', loadingIndicator);
        if (!(loadingIndicator instanceof HTMLElement)) {
            console.error('loadingIndicator bukan elemen valid!');
        }
        console.log(customElements.get('loading-indicator'));

        // Pastikan elemen ditemukan
        if (!loadingIndicator) {
            console.error('LoadingIndicator tidak ditemukan!');
            return;
        }

        loadingIndicator.show(); // Tampilkan loading indicator

        try {
            const notesData = await NotesApi.getNotes();
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
                });
            }
        } catch (error) {
            console.error('Gagal memuat catatan:', error);
            this.innerHTML = '<p>Gagal memuat data. Silakan coba lagi nanti.</p>';
        } finally {
            loadingIndicator.hide(); // Sembunyikan loading indicator
        }
    }
}

customElements.define('note-list', NoteList);
