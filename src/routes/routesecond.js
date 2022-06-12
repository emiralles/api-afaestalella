
const express = require('express');


const router = express.Router();

router.get("/rsdata", (req, res) => {
    res.json({
        data: "nombres de animales",
        animales: ["lobo","elefante","leones"]
    });
});

router.post("/poststatus", (req, res) => {
    res.status(200).send(
        res.json({
            animales: ["pajaro","mamut","chita"]
        })
    );
});


module.exports = router;