import NotesApi from '../../data/remote/notes.api.js';

class NoteForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <form class="note-form">
            <h2> Tambah Catatan </h2>
            <label for="note-title">Judul</label>
            <input type="text" id="note-title" placeholder="Masukkan judul note" required minlength="3" maxlength="50">
            <span id="note-title-error" class="error-message"></span>

            <label for="note-body">Catatan</label>
            <textarea id="note-body" placeholder="Tulis notemu di sini" required minlength="10"></textarea>
            <span id="note-body-error" class="error-message"></span>

            <button type="submit">Tambah</button>
        </form>
        `;

        const form = this.querySelector('form');
        const titleInput = this.querySelector('#note-title');
        const bodyInput = this.querySelector('#note-body');
        const titleError = this.querySelector('#note-title-error');
        const bodyError = this.querySelector('#note-body-error');

        const validationField = (input, errorElement) => {
            input.setCustomValidity('');
            if (input.validity.valueMissing) {
                input.setCustomValidity('Wajib diisi.');
            } else if (input.validity.tooShort) {
                input.setCustomValidity(`Minimal ${input.minLength} karakter.`);
            } else if (input.validity.tooLong) {
                input.setCustomValidity(`Maksimal ${input.maxLength} karakter.`);
            }
            errorElement.textContent = input.validationMessage;
        };

        titleInput.addEventListener('blur', () => validationField(titleInput, titleError));
        bodyInput.addEventListener('blur', () => validationField(bodyInput, bodyError));

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            validationField(titleInput, titleError);
            validationField(bodyInput, bodyError);

            if (!form.checkValidity()) {
                return;
            }

            const title = titleInput.value.trim();
            const body = bodyInput.value.trim();

            if (title && body) {
                const loadingIndicator = document.createElement('loading-indicator');
                this.appendChild(loadingIndicator);

                try {
                    await NotesApi.createNote(title, body);

                    alert('Catatan berhasil ditambahkan!');

                    form.reset();
                    titleError.textContent = '';
                    bodyError.textContent = '';

                    const noteList = document.querySelector('note-list');
                    if (noteList) {
                        noteList.renderNotes();
                    }
                } catch (error) {
                    console.error('Gagal menambahkan catatan:', error);
                    alert('Gagal menambahkan catatan. Silakan coba lagi.');
                } finally {
                    loadingIndicator.remove();
                }
            }
        });
    }
}

customElements.define('note-form', NoteForm);
