const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
    static async getNotes() {
        try {
            const response = await fetch(`${BASE_URL}/notes`);

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                const { data: notes } = responseJson;

                return Promise.resolve(notes);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async createNote(title, body) {
        try {
            const response = await fetch(`${BASE_URL}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                const { data: note } = responseJson;

                return Promise.resolve(note);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async deleteNote(note_id) {
        try {
            const response = await fetch(`${BASE_URL}/notes/${note_id}`, {
                method: 'DELETE',
            });

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                const { data: note } = responseJson;

                return Promise.resolve(note);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getArchivedNotes() {
        try {
            const response = await fetch(`${BASE_URL}/notes/archived`);
            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                const { data: notes } = responseJson;
                return Promise.resolve(notes);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }    

    static async archiveNote(note_id) {
        try {
            const response = await fetch(`${BASE_URL}/notes/${note_id}/archive`, {
                method: 'POST',
            });

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();

                return Promise.resolve(responseJson.message);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async unarchiveNote(note_id) {
        try {
            const response = await fetch(`${BASE_URL}/notes/${note_id}/unarchive`, {
                method: 'POST',
            });

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();

                return Promise.resolve(responseJson.message);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default NotesApi;