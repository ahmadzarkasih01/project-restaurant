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

  // Pergi ke halaman utama untuk memilih restoran
  I.amOnPage('/');

  // Ambil nama restoran pertama yang benar
  const firstRestaurantName = await I.grabTextFrom('.restaurant-name');

  // Klik tombol "View Details" pada restoran pertama
  I.seeElement('.cta-detail');
  I.click('.cta-detail');

  // Tunggu sampai tombol like muncul
  I.waitForElement('#likeButton', 5);  // Pastikan tombol like tersedia

  // Klik tombol like untuk menyukai restoran
  I.click('#likeButton');

  // Verifikasi bahwa restoran muncul di halaman favorit
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-card');
  const likedRestaurantName = await I.grabTextFrom('.restaurant-name');

  // Memastikan nama restoran yang disukai sesuai
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  // Klik tombol "View Details" di halaman favorite
  I.seeElement('.cta-detail');
  I.click('.cta-detail');

  // Batal menyukai restoran
  I.click('#likeButton');  // Klik lagi untuk membatalkan like

  // Verifikasi bahwa restoran tidak ada lagi di halaman favorit
  I.amOnPage('/#/favorite');
  I.dontSee('.restaurant-card');  // Pastikan restoran tidak ada di daftar favorit
});
