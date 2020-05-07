const express = require('express');
const router = express.Router();
const SimplePdfGenerationService = require('../services/simple-pdf-generation-service');
const ProcessHandledPdfGenerationService = require('../services/process-handled-pdf-generation-service');

router.get("/", function (req, res, next) {
  res.render("sample-document", { title: "Sample Document" });
});
router.post('/simple', function(req, res, next) {
    (async () => {
        const filename = await new SimplePdfGenerationService().generate(req);
        res.send(`OK. ${filename} created.`);
    })().catch(next);
});
router.post('/handled', function(req, res, next) {
    (async () => {
        const filename = await new ProcessHandledPdfGenerationService().generate(req);
        res.send(`OK. ${filename} created.`);
    })().catch(next);
});

module.exports = router;
