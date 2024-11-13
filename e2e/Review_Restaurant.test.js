/* eslint-disable no-undef */
const assert = require('assert');

Feature('Review Restaurant');

Before(({ I }) => {
  // Mulai dari halaman utama
  I.amOnPage('/');
});

Scenario('Post resto review', async ({ I }) => {
  const reviewText = 'Ini adalah review dari E2E test';

  // Navigasi ke halaman detail restoran pertama dengan
  I.seeElement('.cta-detail');
  I.click(locate('.cta-detail').first());

  // Pastikan form ulasan muncul dan isi kolom nama serta ulasan
  I.seeElement('.form-review form');
  I.fillField('#inputName', 'test review');
  I.fillField('#inputReview', reviewText);
  I.click('#submit-review');

  // Tunggu respons dari API review
  I.waitForResponse('https://restaurant-api.dicoding.dev/review');

  // Ambil teks dari ulasan terbaru dan verifikasi isinya
  const lastReview = locate('.body-review').last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  assert.strictEqual(reviewText, lastReviewText.trim());
});
