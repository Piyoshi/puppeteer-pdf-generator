const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program.option('-f, --file <file>', 'target view html file', 'sample.html').parse(process.argv);
console.log("arguments option: ", program.opts());
const filename = program.file;
const html = fs.readFileSync(path.resolve(path.join('views', program.file)), "utf-8");

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.emulateMediaType('screen')
  await page.setContent(html);
  await page.pdf({ path: path.resolve(path.join('tmp', 'sample.pdf')), format: 'A4' });
  await browser.close();
})();
