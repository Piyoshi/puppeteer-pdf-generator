const express = require('express');
const router = express.Router();
const PdfGenerationService = require('../services/pdf-generation-service');

router.get("/", function (req, res, next) {
  res.render("sample-document", { title: "Sample Document" });
});
router.post('/', function(req, res, next) {
    (async () => {
        const filename = await new PdfGenerationService().generate(req);
        res.send(`OK. ${filename} created.`);
    })().catch(next);
});

module.exports = router;
