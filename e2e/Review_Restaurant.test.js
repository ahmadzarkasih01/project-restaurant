/* eslint-disable no-undef */
const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Post resto review', async ({ I }) => {
  const reviewText = 'Ini adalah review dari E2E test';

  I.seeElement('.cta-detail');
  I.click(locate('.cta-detail').first());

  I.waitForElement('.form-review form', 5);
  I.fillField('#inputName', 'test review');
  I.fillField('#inputReview', reviewText);
  I.click('#submit-review');

  I.waitForElement('.body-review', 5);
  const lastReviewText = await I.grabTextFrom(locate('.body-review').last());
  assert.strictEqual(reviewText, lastReviewText.trim());
});
