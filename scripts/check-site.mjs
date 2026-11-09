import fs from 'node:fs';
import path from 'node:path';

const pages=['home','enterprise','company','work','volkswagen','bayer','man-industrial-messaging','method','insights','architecture-decisions','event-driven-architecture','contact','imprint','privacy'];
let passed=0;
const errors=[];
function fail(s){errors.push(s)}
for(const lang of ['de','en']){
  for(const page of pages){
    const file=path.join(lang,page==='home'?'':page,'index.html');
    if(!fs.existsSync(file)){fail('Missing '+file);continue}
    const html=fs.readFileSync(file,'utf8');
    if(!html.includes('<main id="main">'))fail(file+': content not prerendered');
    if(!html.includes('<title>'))fail(file+': title missing');
    if(!html.includes('hreflang='))fail(file+': language alternate missing');
    if(!html.includes('class="logo"'))fail(file+': primary logo missing');
    if(!html.includes('class="language-menu"'))fail(file+': language dropdown missing');
    if(!html.includes('class="nav-section"'))fail(file+': expandable sections missing');
    if(!html.includes('class="mobile-contact"'))fail(file+': mobile contact entry missing');
    for(const link of ['volkswagen/','bayer/','man-industrial-messaging/','architecture-decisions/','event-driven-architecture/']){
      if(!html.includes(link))fail(file+': submenu link missing '+link);
    }
    for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
      const ref=m[1];if(/^(https?:|mailto:|tel:|#|data:)/.test(ref))continue;
      const target=ref.split(/[?#]/)[0];if(!target)continue;
      const resolved=path.resolve(path.dirname(file),target);
      if(!fs.existsSync(resolved) && !fs.existsSync(path.join(resolved,'index.html')))
        fail(file+': missing local asset/page '+target);
    }
    if(page==='home'){
      if(!html.includes('Vaillant'))fail(file+': Vaillant missing from customer rail');
      if(!html.includes('Kubernautic'))fail(file+': platform invitation missing');
    }
    if(page==='volkswagen' && !html.includes('Pulumi'))fail(file+': flagship case content missing');
    if(page==='bayer' && !html.includes('Document Management'))fail(file+': Bayer content missing');
    if(page==='man-industrial-messaging' && !html.includes('KubeMQ'))fail(file+': MAN content missing');
    passed++;
  }
}
if(errors.length){for(const e of errors)console.error(e);process.exitCode=1}
else console.log('Site QA passed: '+passed+' localized pages, routes, assets, content and navigation.');
