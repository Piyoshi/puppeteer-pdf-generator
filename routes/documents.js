const express = require('express');
const router = express.Router();
const SampleDocumentService = require('../services/sample-document-service');
const SimplePdfGenerationService = require('../services/simple-pdf-generation-service');
const ProcessHandledPdfGenerationService = require('../services/process-handled-pdf-generation-service');

router.get("/", function (req, res, next) {
  res.render("sample-document", { title: "Sample Document" });
});
router.post('/simple', function(req, res, next) {
    (async () => {
        const filename = await new SampleDocumentService().convertSampleSimple(req);
        res.send(`OK. ${filename} created.`);
    })().catch(next);
});
router.post('/handled', function(req, res, next) {
    (async () => {
        const filename = await new SampleDocumentService().convertSample(req);
        res.send(`OK. ${filename} created.`);
    })().catch(next);
});
router.post('/direct', function(req, res, next) {
    (async () => {
        const filename = await new SampleDocumentService().convertDirect(req);
        res.send(`OK. ${filename} created.`);
    })().catch(next);
});

module.exports = router;
