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
    "url": "css/app.8851448b.css",
    "revision": "a29f6c9ad27835b61b62a8a5f6172203"
  },
  {
    "url": "css/chunk-vendors.ee2f7d48.css",
    "revision": "67e7f9b926b2053affad092a0075a0c7"
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
    "revision": "7f120b42268c4ce234aa4d3215d3ad6f"
  },
  {
    "url": "js/app.0e2db692.js",
    "revision": "20280db33b204ed4001a67f3bd9f9ed9"
  },
  {
    "url": "js/chunk-vendors.40574135.js",
    "revision": "d1e583577a9b89672dae16b097314263"
  },
  {
    "url": "manifest.json",
    "revision": "43018d2ca80b56ac79ea0f0abf886cb7"
  },
  {
    "url": "precache-manifest.2d8f2a6cf901a43e8a2b34de3b7ad260.js",
    "revision": "2d8f2a6cf901a43e8a2b34de3b7ad260"
  },
  {
    "url": "robots.txt",
    "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
  }
]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
