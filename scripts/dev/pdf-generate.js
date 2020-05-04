const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(path.join('views', 'sample.html')), "utf-8");

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.pdf({ path: path.resolve(path.join('tmp', 'sample.pdf')), format: 'A4' });
  await browser.close();
})();
