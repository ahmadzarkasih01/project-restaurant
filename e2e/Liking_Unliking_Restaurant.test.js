// eslint-disable-next-line no-undef
const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Liking and Unliking Restaurant');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/favorite');
  I.wait(3);
});

// eslint-disable-next-line no-undef
Scenario('showing empty liked restaurant', ({ I }) => {
  I.seeElement('#restaurants-container');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

// eslint-disable-next-line no-undef
Scenario('liking and unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.wait(10);

  I.seeElement('.restaurant-card a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.restaurant-card a').first();
  const firstRestaurantName = await I.grabTextFrom('.restaurant-name');
  I.click(firstRestaurant);
  I.waitForElement('#likeButton', 5);
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-card', 5);
  const likedRestaurantName = await I.grabTextFrom('.restaurant-name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
  I.waitForElement('.restaurant-card a', 5);
  I.click('.restaurant-card a');
  I.waitForElement('#likeButton', 5);
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.waitForElement('#restaurants-container', 5);
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item__not__found'
  );
});
