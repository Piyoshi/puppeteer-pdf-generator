const SimplePdfGenerationService = require('./simple-pdf-generation-service');
const ProcessHandledPdfGenerationService = require('./process-handled-pdf-generation-service');

class SampleDocumentService {
    constructor() {
        this.generationPromise = null;
    }

    async convertSampleSimple(req) {
        const templateParam = {
            title: 'Smaple Document',
            isRenderRawCss: true,
        };

        req.app.render('sample-document', templateParam, this.generatePdfSimple.bind(this));
        return this.generationPromise;
    }

    async convertSample(req) {
        const templateParam = {
            title: 'Smaple Document',
            isRenderRawCss: true,
        };

        req.app.render('sample-document', templateParam, this.generatePdf.bind(this));
        return this.generationPromise;
    }

    async convertDirectSimple(req) {
        const html = req.body.html;
        return SimplePdfGenerationService.generateFromHtmlWithPuppeteer(html);
    }
    async convertDirect(req) {
        const html = req.body.html;
        return ProcessHandledPdfGenerationService.generateFromHtmlWithPuppeteer(html);
    }

    generatePdfSimple(err, html) {
        if (err) {
            throw new Error(`rendering error has occured. ${err.message}`);
        }

        this.generationPromise = SimplePdfGenerationService.generateFromHtmlWithPuppeteer(html);
    }

    generatePdf(err, html) {
        if (err) {
            throw new Error(`rendering error has occured. ${err.message}`);
        }

        this.generationPromise = ProcessHandledPdfGenerationService.generateFromHtmlWithPuppeteer(html);
    }
}

module.exports = SampleDocumentService;
