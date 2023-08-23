// window.twttr = (function (d, s, id) { // 引入sdk
//     var t, js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://platform.twitter.com/widgets.js";
//     fjs.parentNode.insertBefore(js, fjs);
//     return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
// }(document, "script", "twitter-wjs"));
// try {
//     twttr.ready(function (twttr) {   // 注册事件
//         twttr.events.bind('tweet', function (event) {
//             // your callback action here...
//             console.log('callback')
//         });
//     });
// } catch (err) {
//     new Error('twttr fail to load')
// }
