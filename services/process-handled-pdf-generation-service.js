const puppeteer = require('puppeteer');
const path = require('path');
const { nanoid } = require('nanoid');

class PuppeteerProcess {
    static launch() {
        PuppeteerProcess.instance = puppeteer.launch({ args: ['--no-sandbox'] });    ;
        process.once('beforeExit', PuppeteerProcess.close);
    }
    static async getInstance() {
        return PuppeteerProcess.instance;
    }

    static close() {
        console.log('before exit event call back puppeteer closing.')
        PuppeteerProcess.getInstance().then(async browser => {
            await browser.close();
            console.log("puppeteer closed.");
        })
    }
}

PuppeteerProcess.launch();

class ProcessHandledPdfGenerationService {
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
        const id = nanoid();
        const filename = `sample-document_${id}.pdf`;
        const browser = await PuppeteerProcess.getInstance();
        const page = await browser.newPage();
        await page.setContent(html);
        await page.pdf({ path: path.resolve(path.join('tmp', filename)), format: 'A4' });
        await page.close();

        return filename;
    }
}

module.exports = ProcessHandledPdfGenerationService;
