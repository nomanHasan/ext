importScripts('./workbox/workbox-sw.js');
// workbox.setConfig({
//   modulePathPrefix: '/workbox/'
// });

workbox.setConfig({
  modulePathPrefix: './workbox/'
});
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "alert00.mp3",
    "revision": "c28f55018d42878ac5bc61f268bcad08"
  },
  {
    "url": "alert01.mp3",
    "revision": "31d38099a17a0810e841318c9ed9c729"
  },
  {
    "url": "alert02.mp3",
    "revision": "59582be6c18ddaf14cf34c4a9a3c8655"
  },
  {
    "url": "alert03.mp3",
    "revision": "95d88e3a0f25f266644c194ebd96f8aa"
  },
  {
    "url": "alert04.mp3",
    "revision": "984e81b2afe6bfbbaed87c1348ba2875"
  },
  {
    "url": "alert05.mp3",
    "revision": "790d9c775a6d49ba82f2642a53300c35"
  },
  {
    "url": "alert06.mp3",
    "revision": "f0ac1bf62893e682c64e564bf1af7131"
  },
  {
    "url": "css/app.1736daa6.css",
    "revision": "bc40458a0677a90afbda8f34e7071434"
  },
  {
    "url": "css/chunk-vendors.10dc1890.css",
    "revision": "6276879aa1ad1d0116bbb0a1a35d0c9b"
  },
  {
    "url": "favicon.ico",
    "revision": "23d38844317407b9e8c235d88e910a63"
  },
  {
    "url": "favicon.png",
    "revision": "accbaa29971de74bf65731bfc54dfcda"
  },
  {
    "url": "img/icons/android-chrome-144x144.png",
    "revision": "406d9e78df9dab74e880a8abef10406e"
  },
  {
    "url": "img/icons/android-chrome-192x192.png",
    "revision": "25405677b6f3f1873658eb397d6aad07"
  },
  {
    "url": "img/icons/android-chrome-512x512.png",
    "revision": "993fa191b8aacb18fa3306dde2b84c9a"
  },
  {
    "url": "img/icons/android-chrome-96x96.png",
    "revision": "9678e5ed5e892a46c923b3e849fa293c"
  },
  {
    "url": "img/icons/apple-touch-icon.png",
    "revision": "117abacac8264c13639719870b690b43"
  },
  {
    "url": "img/icons/extimer.svg",
    "revision": "d557f2c26480229f73135b54a0a76f68"
  },
  {
    "url": "img/icons/favicon_io/android-chrome-192x192.png",
    "revision": "25405677b6f3f1873658eb397d6aad07"
  },
  {
    "url": "img/icons/favicon_io/android-chrome-512x512.png",
    "revision": "993fa191b8aacb18fa3306dde2b84c9a"
  },
  {
    "url": "img/icons/favicon_io/apple-touch-icon.png",
    "revision": "117abacac8264c13639719870b690b43"
  },
  {
    "url": "img/icons/favicon_io/favicon-16x16.png",
    "revision": "462fc482cfb26997e1ab3c52b380b010"
  },
  {
    "url": "img/icons/favicon_io/favicon-32x32.png",
    "revision": "517c717efab90fe77781f363a20aecc9"
  },
  {
    "url": "img/icons/favicon_io/favicon.ico",
    "revision": "f0343a47f352dd1732d1dc3e541051ce"
  },
  {
    "url": "img/icons/favicon_io/site.webmanifest",
    "revision": "053100cb84a50d2ae7f5492f7dd7f25e"
  },
  {
    "url": "img/icons/favicon-16x16.png",
    "revision": "462fc482cfb26997e1ab3c52b380b010"
  },
  {
    "url": "img/icons/favicon-32x32.png",
    "revision": "517c717efab90fe77781f363a20aecc9"
  },
  {
    "url": "img/icons/favicon.ico",
    "revision": "f0343a47f352dd1732d1dc3e541051ce"
  },
  {
    "url": "img/icons/safari-pinned-tab.svg",
    "revision": "d557f2c26480229f73135b54a0a76f68"
  },
  {
    "url": "index.html",
    "revision": "3cb32feb6338969a2c4c9374e421aff4"
  },
  {
    "url": "js/about.b1946dad.js",
    "revision": "a7016d0e5b85d5fb3250a3a7a92b3b23"
  },
  {
    "url": "js/app.4b871cfb.js",
    "revision": "850bb153745152c959a44970477e1f74"
  },
  {
    "url": "js/chunk-vendors.c2111fba.js",
    "revision": "b2857bc3138201b25840ce1035201a8d"
  },
  {
    "url": "manifest.json",
    "revision": "43018d2ca80b56ac79ea0f0abf886cb7"
  },
  {
    "url": "precache-manifest.f75396d0c47035428c0817cf5ed15388.js",
    "revision": "f75396d0c47035428c0817cf5ed15388"
  },
  {
    "url": "robots.txt",
    "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
  }
]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
