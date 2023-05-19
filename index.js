const { API } = require("easy-api.ts");

const api = new API({
    port: process.env.PORT || 3000,
    spaces: 1,
    reverseReading: false
})

api.routes.add({
    path: '/color',
    code: `
    $ignore[Check docs to see how does functions work ;)]
    $if[$getQuery[hex]==undefined||$isValidHex[$getQuery[hex]]==false;
        $send[400;json;{
            "error": "Invalid hex color code provided"
        }]
        $break $ignore[IMPORTANT!!]
    ]

    $createCanvas[512;512]
    $color[$getQuery[hex]]
    $drawRect[0;0;512;512]
    $send[200;canvas;$default]
    `
    `
})

api.routes.load('./routes').then(() => {
    console.log('Source loaded.')
    api.connect() // We're connecting to the API when the source is loaded.
})
