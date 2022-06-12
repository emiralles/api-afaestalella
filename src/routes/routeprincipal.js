const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
      hello: "hi!"
    });
});

router.get("/data", (req, res) => {
    res.json({
        data: "pasos1",
        animales: ["caballos","vaca","burros"]
    });
});


module.exports = router;