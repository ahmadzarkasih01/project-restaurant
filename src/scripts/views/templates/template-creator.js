import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <img tabindex="0" src="${CONFIG.BASE_IMAGE_URL.replace('<pictureId>', restaurant.pictureId)}" alt="${restaurant.name}" crossorigin="anonymous" class="lazyload">
    <p>Address: ${restaurant.address}</p>
  <div class="restaurant__info">
  <h3>Information</h3>
    <h4>Address</h4>
    <p>${restaurant.address} , Kota ${restaurant.city}</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
    <h4>Categories</h4>
    <p>${restaurant.categories.map((category) => category.name).join(' | ')}</p>
    <h4>Foods</h4>
    <p>${restaurant.menus.foods.map((food) => food.name).join(' | ')}</p>
    <h4>Drinks</h4>
    <p>${restaurant.menus.drinks.map((drink) => drink.name).join(' | ')}</p>
  </div>
  <div class="restaurant__description">
    <h3>Description</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="restaurant__description">
  <h3 class="title-review">Reviews</h3>
  <div class="detail-review">
  ${restaurant.customerReviews
    .map(
      (review) => `
      <div class="detail-review-item">
        <div class="header-review">
          <p class="name-review"<i title="restaurant" class="fa fa-user-circle" style="font-size:1.3em; padding-right:10px;"></i>${review.name}</p>

          <p class="date-review">${review.date}</p>
        </div>

        <div class="body-review">
          ${review.review}
        </div>
      </div>
    `,
    )
    .join('')}
  </div>
</div>
`;

const createSkeletonRestaurantTemplate = (count) => {
  let skeleton = '';

  for (let i = 0; i < count; i += 1) {
    skeleton += `
      <div class="restaurant-card">
        <img class="card-image" alt="skeleton" src="/images/heros/placeholder.png" crossorigin="anonymous"/>
        <h3 class="restaurant-name">Loading restaurant name...</h3>
        <p class="skeleton">Rating: ... | City: ...</p>
        <a href="javascript:void(0)" class="cta-detail" tabindex="0">View Details</a>
      </div>
    `;
  }

  return skeleton;
};


const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-card">
    <img src="${CONFIG.BASE_IMAGE_URL.replace('<pictureId>', restaurant.pictureId)}" alt="${restaurant.name}" tabindex="0" crossorigin="anonymous" class="card-image lazyload">
    <h3 class='restaurant-name'>${restaurant.name}</h3>
    <p class='skeleton'>Rating: ${restaurant.rating} | City: ${restaurant.city}</p>
    <a href="#/detail/${restaurant.id}" class="cta-detail" tabindex="0">View Details</a>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { createRestaurantDetailTemplate, createRestaurantItemTemplate, createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate, createSkeletonRestaurantTemplate };
