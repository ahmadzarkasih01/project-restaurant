class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer class="footer">
      <div class="socials">
        <a href="#"><i class="fab fa-instagram"></i><span class="sr-only">Instagram</span></a>
        <a href="#"><i class="fab fa-twitter"></i><span class="sr-only">Twitter</span></a>
        <a href="#"><i class="fab fa-facebook-f"></i><span class="sr-only">Facebook</span></a>
      </div>
      <div class="links">
        <a href="#/home">Home</a>
        <a href="#/favorite">Favorite</a>
        <a href="https://ahmadzarkasih01.github.io/">About Us</a>
        <a href="#contact">Contact</a>
      </div>
      <div class="credit">
        <p tabindex="0">Copyright © 2024 - CandyRestaurant</p>
      </div>
    </footer>
        `;
  }
}

customElements.define('footer-bar', FooterBar);