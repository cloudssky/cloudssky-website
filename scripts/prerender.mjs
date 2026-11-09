import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const source = fs.readFileSync('assets/site.js', 'utf8');
const pages = ['home','enterprise','company','work','method','insights','contact','imprint','privacy'];
let written = 0;
for (const lang of ['de','en']) {
  for (const page of pages) {
    const file = path.join(lang, page === 'home' ? '' : page, 'index.html');
    const html = fs.readFileSync(file, 'utf8');
    const root = page === 'home' ? '../' : '../../';
    let output = '';
    const body = {
      dataset: {lang, page, root},
      set innerHTML(value) { output = value; },
      get innerHTML() { return output; }
    };
    const document = {
      body,
      getElementById() { return null; },
      querySelector() { return null; },
      addEventListener() {}
    };
    vm.runInNewContext(source, { document, location: {href:''}, console }, {filename:'assets/site.js',timeout:3000});
    if (!output.includes('<main id="main">') || !output.includes('</footer>')) {
      throw new Error('Invalid rendered page: ' + file);
    }
    if (page === 'home' && !output.includes('Engineering what matters.')) {
      throw new Error('Home content missing: ' + file);
    }
    const marker = '<script src="' + root + 'assets/site.js" defer></script>';
    if (!html.includes(marker)) throw new Error('Render marker missing: ' + file);
    fs.writeFileSync(file, html.replace(marker, output + marker));
    written++;
  }
}
console.log('Pre-rendered ' + written + ' localized pages to static HTML');
