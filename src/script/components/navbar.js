class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <h1 class="navbar-title">Note App</h1>
                <ul class="navbar-links">
                    <li><a href="#" id="nav-home">Home</a></li>
                    <li><a href="#" id="nav-archived">Arsip Catatan</a></li>
                </ul>
            </nav>
        `;

        const homeLink = this.querySelector("#nav-home");
        const archivedLink = this.querySelector("#nav-archived");

        homeLink.addEventListener("click", (e) => {
            e.preventDefault();
            const noteList = document.querySelector("note-list");
            if (noteList) {
                noteList.renderNotes();
            }
        });

        archivedLink.addEventListener("click", (e) => {
            e.preventDefault();
            const noteList = document.querySelector("note-list");
            if (noteList) {
                noteList.renderArchivedNotes();
            }
        });
    }
}

customElements.define("nav-bar", NavBar);
