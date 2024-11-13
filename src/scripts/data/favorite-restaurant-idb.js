import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

function showLoading() {
  if (!document.getElementById('loader')) {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = '<p>Loading...</p>';
    loader.style.position = 'fixed';
    loader.style.top = '50%';
    loader.style.left = '50%';
    loader.style.transform = 'translate(-50%, -50%)';
    loader.style.fontSize = '24px';
    loader.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    loader.style.border = '2px solid #fff';
    loader.style.padding = '20px';
    loader.style.borderRadius = '8px';
    loader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    document.body.appendChild(loader);
  }
}

function hideLoading() {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.remove();
    }, 2000);
  }
}

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) {
      console.error('No ID provided for getRestaurant');
      return;
    }
    showLoading();
    try {
      return (await dbPromise).get(OBJECT_STORE_NAME, id);
    } finally {
      hideLoading();
    }
  },

  async getAllRestaurant() {
    showLoading();
    try {
      return (await dbPromise).getAll(OBJECT_STORE_NAME);
    } finally {
      hideLoading();
    }
  },

  async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      console.error("Restaurant object must have an 'id' property");
      return;
    }
    showLoading();
    try {
      return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    } finally {
      hideLoading();
    }
  },

  async deleteRestaurant(id) {
    if (!id) {
      console.error('No ID provided for deleteRestaurant');
      return null;
    }
    showLoading();
    try {
      return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    } finally {
      hideLoading();
    }
  },
};

export default FavoriteRestaurantIdb;
