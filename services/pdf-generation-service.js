const puppeteer = require('puppeteer');
const path = require('path');

class PdfGenerationService {
    constructor() {
        this.generationPromise = null;
    }

    async generate(req) {
        req.app.render('sample-document', { title: 'Smaple Document' }, this.generatePdf.bind(this));
        return this.generationPromise;
    }

    generatePdf(err, html) {
        if (err) {
            throw new Error(`rendering error has occured. ${err.message}`);
        }

        this.generationPromise = this.generateFromHtmlWithPuppeteer(html);
    }

    async generateFromHtmlWithPuppeteer(html) {
        const filename = 'sample-document.pdf';
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(html);
        await page.pdf({ path: path.resolve(path.join('tmp', filename)), format: 'A4' });
        await browser.close();

        return filename;
    }
}

module.exports = PdfGenerationService;
