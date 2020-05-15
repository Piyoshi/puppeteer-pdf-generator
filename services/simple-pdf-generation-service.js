const puppeteer = require('puppeteer');
const path = require('path');
const { nanoid } = require('nanoid');

class SimplePdfGenerationService {
    static async generateFromHtmlWithPuppeteer(html) {
        const id = nanoid();
        const filename = `sample-document_${id}.pdf`;
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(html);
        await page.pdf({ path: path.resolve(path.join('tmp', filename)), format: 'A4' });
        await browser.close();

        return filename;
    }
}

module.exports = SimplePdfGenerationService;
