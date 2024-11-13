class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this._addHamburgerMenuEvent();
  }

  render() {
    this.innerHTML = `
    <header class="header">
      <nav class="navbar">
        <a href="#" class="navbar-title" tabindex="0">Candy<span>Restaurant.</span></a>

        <a href="#" id="hamburger-menu" tabindex="0" role="button" aria-label="Menu"><i class="fas fa-bars"></i></a>

        <div class="navbar-nav">
          <a href="#/home">Home</a>
          <a href="#/favorite">Favorite</a>
          <a href="https://ahmadzarkasih01.github.io/">About Us</a>
          <a href="#contact">Contact</a>
        </div>

      </nav>
    </header>
    `;
  }

  _addHamburgerMenuEvent() {
    const hamburgerMenu = this.querySelector('#hamburger-menu');
    const drawer = this.querySelector('.navbar-nav');

    hamburgerMenu.addEventListener('click', (event) => {
      event.preventDefault();
      drawer.classList.toggle('open');
    });
  }
}

customElements.define('app-bar', AppBar);