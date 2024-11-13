class HeroBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <!-- hero section start -->
      <section class="hero" id="home">
        <div class="content">
          <h1 tabindex="0">Let go to <span>Candy</span>Restaurant.</h1>
          <p tabindex="0">Candy Restaurant serves creative sweet dishes in a colorful atmosphere, with friendly service. The perfect place to enjoy fun moments together!</p>
          <a href="#" class="cta" tabindex="0" role="button" aria-label="Go to the restaurant">Go Now</a>
        </div>
      </section>
      <!-- hero section end -->
    `;
  }
}

customElements.define('hero-bar', HeroBar);