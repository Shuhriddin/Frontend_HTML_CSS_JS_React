const express = require('express');

const router = express.Router();

const db = require('../utils/database')

router.get('/', (req, res) => {
    db.query('SELECT * from user_info', (error, results)=>{
        if (error) throw error;
        res.json(results[0]);
    });
})

module.exports = router;