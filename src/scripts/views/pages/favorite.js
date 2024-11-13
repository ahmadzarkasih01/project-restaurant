import { createRestaurantItemTemplate, createSkeletonRestaurantTemplate } from '../templates/template-creator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Favorite = {
  async render() {
    return `
      <!-- list restaurant section start -->
      <section id="restaurant-list">
        <div>
          <h2 tabindex="0" id="title" class="title">Favorite <span>Restaurants</span></h2>
          <p tabindex="0">Discover unique flavors and exceptional service in a captivating dining experience. Let us take you on a memorable culinary journey!</p>
        </div>
        <div class="restaurants-container" id="restaurants-container">
          <!-- Restaurant cards will be appended here dynamically -->
          ${createSkeletonRestaurantTemplate(20)}
        </div>
      </section>
      <!-- list restaurant section end -->
    `;
  },

  async afterRender() {
    const restaurant = await FavoriteRestaurantIdb.getAllRestaurant();
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

export default Favorite;
