

// const PROXY_CONFIG = {
//     "/api": {
//         "target": "https://login.salesforce.com/services/oauth2/token",
//         "secure": false,
//         "pathRewrite": {
//            "^/api": ""
//         },
//         "bypass": function (req, res, proxyOptions) {
            
//         }
//     },
//         "/qq": {
//         "target": "https://resourceful-moose-9ygm0z-dev-ed.my.salesforce.com/services/apexrest/Questions?categories=kids,normal&total=6",
//         "secure": false,
//         "pathRewrite": {
//            "^/qq": ""
//         },
//         "bypass": function (req, res, proxyOptions) {
//         }
//     },
//     "/foo": {
//         "target": "https://jsonplaceholder.typicode.com/posts",
//         "secure": false,
//         "pathRewrite": {
//            "^/foo": ""
//         },
//         "bypass": function (req, res, proxyOptions) {
//             console.log("***req**************************************************************************");
//             console.log(req);
//             //console.log("***res**************************************************************************");
//             //console.log(res);
//             //console.log("***proxyOptions**************************************************************************");
//             //console.log(proxyOptions);
            
//         },
//     "changeOrigin": true,
//     "logLevel": "debug"
//     }
// }

const PROXY_CONFIG = {
    "/api/*": {
        "target": "http://localhost:5000",
        "secure": false,
        "changeOrigin": true,
    "logLevel": "debug"
    
    },
    "changeOrigin": true,
    "logLevel": "debug"
    
}

module.exports = PROXY_CONFIG;