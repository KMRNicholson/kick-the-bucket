"use strict";var precacheConfig=[["/index.html","d95dfa13695114bdfae2eb2daf66f580"],["/static/css/main.679b199b.css","1acc52ed35554a8bc16db9ac978b2595"],["/static/js/main.de382d46.js","07305785e2e5e20162a8c99c56755f29"],["/static/media/archivo-latin-400.cb3502f3.woff","cb3502f33371e8f9691fad12b1830967"],["/static/media/archivo-latin-400.ced69cad.woff2","ced69cad25b9b2115825b35933fb9315"],["/static/media/archivo-latin-400italic.c3ce6175.woff","c3ce617525344a008ebce295b74549ef"],["/static/media/archivo-latin-400italic.d947d714.woff2","d947d71472b6e8484bc72179af638bd9"],["/static/media/archivo-latin-500.b3855802.woff","b3855802625dee691b47dd74d95ac5ac"],["/static/media/archivo-latin-500.fef41b2e.woff2","fef41b2e4521a9b4aa0c510d11d9f87c"],["/static/media/archivo-latin-500italic.7a73d27e.woff2","7a73d27e00fc55aeb7d52fb56a9b5c18"],["/static/media/archivo-latin-500italic.9ccf3e63.woff","9ccf3e6395e6cf19106822af5f7a558b"],["/static/media/archivo-latin-600.572d86ba.woff","572d86ba93713171a2d6ff273a7cfc93"],["/static/media/archivo-latin-600.9a6e9c82.woff2","9a6e9c82d6c5d31ee1bb8ad2106e277d"],["/static/media/archivo-latin-600italic.0c58bd79.woff2","0c58bd79a3bc168be312956bc0c77da9"],["/static/media/archivo-latin-600italic.bfa35d7a.woff","bfa35d7a9d9d302248d1d0efb521506c"],["/static/media/archivo-latin-700.0852bc4a.woff2","0852bc4adbfc1c27bdbb3470d3a06950"],["/static/media/archivo-latin-700.7e0a686d.woff","7e0a686d5917218e0e7e2e57b2d13e5a"],["/static/media/archivo-latin-700italic.95cc475d.woff2","95cc475da66119c9ec4c48ce79b63154"],["/static/media/archivo-latin-700italic.ffe030ad.woff","ffe030ad23c5953783b90766c1be2d79"],["/static/media/bucket.bbd4bfc9.png","bbd4bfc9c2d8ba0cb3c203501e8805c3"],["/static/media/karla-latin-400.27b852a4.woff2","27b852a41d0b7a4ca2b3e454402ee785"],["/static/media/karla-latin-400.915346bf.woff","915346bfd9a2b9d72abda4f1eea7f9de"],["/static/media/karla-latin-400italic.31cc10ef.woff","31cc10ef17802f05967cc7c7680053f8"],["/static/media/karla-latin-400italic.b89fa7ab.woff2","b89fa7ab14573571587dc9d047630526"],["/static/media/karla-latin-700.d14b8b21.woff2","d14b8b2172b9b804e16779b4a8a430de"],["/static/media/karla-latin-700.defc2f6a.woff","defc2f6ab28ecaa4dda00cc0d470fce3"],["/static/media/karla-latin-700italic.3b267e58.woff","3b267e58615ce11711d6c588218257b9"],["/static/media/karla-latin-700italic.ae1a7971.woff2","ae1a797150f46a4617a00004580fb811"],["/static/media/kick2.fa46ed75.png","fa46ed75b99f9d076070f1de715d9526"],["/static/media/slide1.16db0d55.png","16db0d553c5fe8b8ab5d5ed7fd021706"],["/static/media/slide2.fe872856.png","fe872856002bf3baf77fa0c45d6ee6c5"],["/static/media/slide3.430338b3.png","430338b33b6c01f6c69c64535bf396c5"],["/static/media/snowboard.64d2e2f0.png","64d2e2f049fcbd110d95651d33dfe5d0"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var i=new URL(e);return c&&i.pathname.match(c)||(i.search+=(i.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),i.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),i=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),i]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var i="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(i,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});