const express = require('express');
const ensureAuth = require('../Middlewares/Auth');

const router = express();

router.get('/', ensureAuth, (req, res) => {
    res.status(200).json([
        {
            name: 'mobile',
            price: 15000
        },
        {
            name: 'laptop',
            price: 50000
        },
        {
            name: 'watch',
            price: 5000
        }
    ])
})

module.exports = router;    