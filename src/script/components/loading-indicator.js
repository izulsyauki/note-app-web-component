class LoadingIndicator extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="loading-indicator">
                <p>Loading...</p>
            </div>
        `;
        this.style.display = 'none'; // Secara default disembunyikan
        this.style.textAlign = 'center';
        this.style.margin = '20px 0';
    }

    show() {
        this.style.display = 'block';
    }

    hide() {
        this.style.display = 'none';
    }
}

customElements.define('loading-indicator', LoadingIndicator);
