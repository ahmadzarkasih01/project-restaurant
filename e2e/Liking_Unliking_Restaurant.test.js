// eslint-disable-next-line no-undef
const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Liking and Unliking Restaurant');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

// eslint-disable-next-line no-undef
Scenario('showing empty liked restaurant', ({ I }) => {
  I.waitForElement('#restaurants-container', 5);
  I.seeElement('#restaurants-container');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

// eslint-disable-next-line no-undef
Scenario('liking and unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-name', 5);
  const firstRestaurantName = await I.grabTextFrom('.restaurant-name');

  I.waitForElement('.cta-detail', 5);
  // eslint-disable-next-line no-undef
  I.click(locate('.cta-detail').first());

  I.waitForElement('#likeButton', 5);

  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-card', 5);
  const likedRestaurantName = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.waitForElement('.cta-detail', 5);
  I.click('.cta-detail');

  I.waitForElement('#likeButton', 5);
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('#restaurants-container', 5);
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});
