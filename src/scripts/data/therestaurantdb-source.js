import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static showLoading() {
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

  static hideLoading() {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.remove();
      }, 2000);
    }
  }

  static async getListRestaurants() {
    this.showLoading();
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error('Error fetching list of restaurants:', error);
      return null;
    } finally {
      this.hideLoading();
    }
  }

  static async detailRestaurant(id) {
    this.showLoading();
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching details for restaurant with id ${id}:`, error);
      return null;
    } finally {
      this.hideLoading();
    }
  }

  static async postReview(data) {
    this.showLoading();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(API_ENDPOINT.POST_REVIEW, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error posting review:', error);
      return null;
    } finally {
      this.hideLoading();
    }
  }
}

export default TheRestaurantDbSource;
