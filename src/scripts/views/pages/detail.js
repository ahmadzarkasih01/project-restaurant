import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import PostReview from '../../utils/postreview-initiator';

const Detail = {
  async render() {
    return `
      <!-- list detail section start -->
      <section id="detail-restaurant">
        <div>
          <h2 tabindex="0" id="title">Detail <span>Restaurants</span></h2>
          <p tabindex="0">Discover unique flavors and exceptional service in a captivating dining experience. Let us take you on a memorable culinary journey!</p>
        </div>
        <div class="detail-restaurants-container" id="detail-restaurants-container">
        <!-- Restaurant cards will be appended here dynamically -->
        </div>
        <div class="form-review">
          <form>
            <div class="mb-3">
              <label for="inputName" class="form-label">Name</label>
              <input name="inputName" type="text" class="form-control" id="inputName">
            </div>
            <div class="mb-3">
              <label for="inputReview" class="form-label">Review</label>
              <input name="inputReview" type="text" class="form-control" id="inputReview">
            </div>
            <button id="submit-review" type="submit" class="btn">Submit</button>
          </form>
        </div>
      </section>
      <!-- list detail section end -->
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await TheRestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detail-restaurants-container');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });

    const submitReview = document.getElementById('submit-review');
    submitReview.addEventListener('click', (event) => {
      event.preventDefault();
      PostReview();
    });

    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#title').focus();
    });
  },
};

export default Detail;
