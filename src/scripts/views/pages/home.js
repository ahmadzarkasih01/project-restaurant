import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate, createSkeletonRestaurantTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <!-- list restaurant section start -->
    <section id="restaurant-list">
      <div>
        <h2 tabindex="0" id="title">Explore Our <span>Restaurants</span></h2>
        <p tabindex="0">Discover unique flavors and exceptional service in a captivating dining experience. Let us take you on a memorable culinary journey!</p>
      </div>
      <div class="restaurants-container" id="restaurants-container">
        <!-- Restaurant cards will be appended here dynamically -->
        ${createSkeletonRestaurantTemplate(20)}
      </div>
    </section>
    <!-- list restaurant section end -->

    <!-- contact section start -->
    <section id="contact" class="contact">
      <h2 tabindex="0">Our <span>Contact</span></h2>
      <p tabindex="0">Contact us for quick and accurate solutions. Our team is ready to assist you and make you our top priority!</p>
      <div class="row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.841951918848!2d110.37608397412086!3d-7.806550577500688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5777e269d1c5%3A0xc48d144e3f0c4571!2sAsrama%20SIILAMPARI!5e0!3m2!1sid!2sid!4v1728374690284!5m2!1sid!2sid"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="map"
          title="Map to Candy Restaurant"
          aria-label="Map to Candy Restaurant"
        ></iframe>

        <form action="">
          <div class="input-group">
            <label for="name" class="sr-only">Your Name</label>
            <i class="fas fa-user"></i>
            <input type="text" id="name" placeholder="Your Name" aria-label="Your Name" />
          </div>
          <div class="input-group">
            <label for="email" class="sr-only">Your Email</label>
            <i class="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="Your Email" aria-label="Your Email" />
          </div>
          <div class="input-group">
            <label for="phone" class="sr-only">Your Phone</label>
            <i class="fas fa-phone"></i>
            <input type="tel" id="phone" placeholder="Your Phone" aria-label="Your Phone" />
          </div>
          <button type="submit" class="btn" aria-label="Send Message">Send Message</button>
        </form>
      </div>
    </section>
    <!-- contact section end -->
  `;
  },

  async afterRender() {
    const restaurant = await TheRestaurantDbSource.getListRestaurants();
    const restaurantContainer = document.querySelector('#restaurants-container');
    restaurantContainer.innerHTML = '';
    if (restaurant.length === 0) {
      restaurantContainer.innerHTML = '<p class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</p>';
    } else {
      restaurant.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }

    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#title').focus();
    });
  },
};

export default Home;
