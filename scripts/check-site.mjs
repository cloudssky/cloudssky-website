import fs from 'node:fs';
import path from 'node:path';

if(!fs.existsSync('assets/volkswagen-digital-wave.svg'))fail('Missing Volkswagen procedural vector wave asset');
const wave=fs.readFileSync('assets/volkswagen-digital-wave.svg','utf8');
if(!wave.includes('<svg')||!wave.includes('id="wave"'))fail('Volkswagen wave SVG invalid');
const css=fs.readFileSync('assets/site.css','utf8');
for(const expected of ['volkswagen-digital-wave.svg','.hero:before','.cards .card-visual.visual-1']){
  if(!css.includes(expected))fail('Missing visual system component '+expected);
}
if(!fs.existsSync('assets/hero-clouds.svg'))fail('Homepage cloud SVG missing');
const heroClouds=fs.readFileSync('assets/hero-clouds.svg','utf8');
if(!heroClouds.includes('<svg')||!heroClouds.includes('cloudWhite')||!heroClouds.includes('cloudBlue'))fail('Homepage cloud SVG invalid');
if(!css.includes('hero-clouds.svg')||!css.includes('csg-cloud-back')||!css.includes('prefers-reduced-motion:reduce'))fail('Cloud animation or motion accessibility missing');
if(!css.includes('.hero .hero-cloud-playground{z-index:3;pointer-events:none}'))fail('Cloud SVG must be above the hero text wrapper for pointer hit-testing');
if(!css.includes('.hero .hero-cloud-playground .cloud-grab{pointer-events:visiblePainted'))fail('Cloud shape pointer targeting must be enabled');
if(!fs.existsSync('assets/hero-ocean.svg'))fail('Hero ocean SVG missing');
const ocean=fs.readFileSync('assets/hero-ocean.svg','utf8');
if(!ocean.includes('<svg')||!ocean.includes('id="sea"'))fail('Hero ocean SVG invalid');
if(!css.includes('csg-ocean-swell')||!css.includes('hero-ocean.svg'))fail('Hero ocean visual missing');
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
    if(page==='home' && !html.includes('class="hero-brand"'))fail(file+': WE DO. hero brand missing');
    if(page==='home' && !html.includes('class="hero-ocean"'))fail(file+': ocean behind clouds missing');
    if(page==='home' && html.includes('class="hero-whale"'))fail(file+': whale should no longer appear');
    if(page==='home' && !html.includes('Enjoy IT! ☁️🚀</span>'))fail(file+': cloud emojis must stay adjacent to caption');
    if(page==='home' && !html.includes('Even clouds are interactive. Enjoy IT! ☁️🚀'))fail(file+': hero Easter egg caption missing');
    if(page==='home' && !html.includes('class="hero-clouds hero-cloud-playground"'))fail(file+': cloud playground missing');
    if(page==='home' && (html.match(/data-cloud="/g)||[]).length!==4)fail(file+': expected four independently draggable clouds');
    if(page==='home' && !html.includes('tabindex="0"'))fail(file+': cloud keyboard control missing');
    if(['home','volkswagen','enterprise'].includes(page) && !html.includes('class="tech-mark tech-text-mark"'))fail(file+': technology text identifiers missing');
    if(['home','volkswagen','enterprise'].includes(page) && !html.includes('aria-label="Amazon Web Services"'))fail(file+': accessible AWS identifier missing');
    if(['home','volkswagen','enterprise'].includes(page) && !html.includes('aria-label="Google Cloud"'))fail(file+': accessible Google Cloud identifier missing');
    if(['home','volkswagen','enterprise'].includes(page) && !html.includes('public/technology/kubernetes.svg'))fail(file+': Kubernetes logo missing');
    if(['home','volkswagen','enterprise'].includes(page) && /public\\/technology\\/(aws|googlecloud|vmware|terraform|pulumi|openstack|apachekafka|go)\\.svg/.test(html))fail(file+': unverified technology mark must not be displayed');
    if(page==='home' && !html.includes('Kops / AWS'))fail(file+': one-line Kops / AWS heading missing');
    if(page==='home' && !html.includes('aria-label="Go language — custom Kops extensions"'))fail(file+': Go text identifier missing from Kops stage');
    if(!html.includes('data-privacy-notice'))fail(file+': privacy notice missing');
    if(!html.includes('data-dismiss-privacy'))fail(file+': privacy notice dismiss missing');
    if(page==='contact' && html.includes('data-email-form'))fail(file+': contact form must be removed');
    if(page==='contact' && !html.includes('mailto:support@cloudssky.com'))fail(file+': direct email link missing');
    if(page==='contact' && !html.includes('href="https://calendly.com/cloudssky"'))fail(file+': Calendly booking link missing');
    if(page==='imprint' && (html.includes('Prüfhinweis vor Veröffentlichung')||html.includes('historical disclaimer')))fail(file+': outdated legal draft text still present');
    if(page==='imprint' && !html.includes('href="../privacy/"'))fail(file+': privacy policy cross-reference missing');
    if(page==='imprint' && !['HRB 70999','DE815247371','215/5808/2975','Stephan Hartmann','Arash Kaffamanesh'].every(token=>html.includes(token)))fail(file+': restored imprint details missing');
    if(page==='imprint' && !html.includes('DDG'))fail(file+': updated German legal reference missing');
    if(page==='privacy' && !html.includes('privacy-content'))fail(file+': expanded privacy notice missing');
    if(page==='privacy' && /STATUS: PRÜFENTWURF|STATUS: REVIEW DRAFT|legal-review/.test(html))fail(file+': internal draft warning remains in public privacy notice');
    if(page==='privacy' && !['GitHub Pages','Cloudflare','Google Workspace','Calendly','csg-privacy-notice-v1','10. November 2026'].some(s=>html.includes(s)))fail(file+': privacy provider details missing');
    if(page==='privacy' && !['GitHub Pages','Cloudflare','Google Workspace','Calendly','csg-privacy-notice-v1'].every(s=>html.includes(s)))fail(file+': privacy provider section incomplete');
    if(['enterprise','company','method','work','volkswagen','bayer','man-industrial-messaging','insights','architecture-decisions','event-driven-architecture'].includes(page) && !html.includes('aria-current="page"'))
      fail(file+': active navigation missing');
    if(page==='home'){
      if(!html.includes('Deutsche Post'))fail(file+': Deutsche Post missing from customer ticker');
      if(html.includes('>Telekom</span>'))fail(file+': old Telekom ticker name remains');
      if(!html.includes('Vaillant'))fail(file+': Vaillant missing from customer rail');
      if(!html.includes('Kubernautic'))fail(file+': platform invitation missing');
    }
    if(page==='volkswagen' && !html.includes('Pulumi'))fail(file+': flagship case content missing');
    if(html.includes('cloudssky.com/en/insights/cloud-native-shared-platform-gke/'))fail(file+': legacy GKE article link not migrated');
    if(page==='company'){
      for(const role of ['CEO · Cloud Architect','CEO · Enterprise Software Architect','SRE Solution Architect']){
        if(!html.includes(role))fail(file+': expected team role missing: '+role);
      }
      const order=['Anja Daniels','Stephan Hartmann','Arash Kaffamanesh','Daniel Santiago Gawenda','Christian Weihs','Tim Stellfeldt'];
      if(!order.every((name,i)=>html.includes(name) && (i===0 || html.indexOf(order[i-1])<html.indexOf(name))))fail(file+': team order differs from requested three-column layout');
      if(!html.includes('Office & Finance'))fail(file+': Anja role missing');
    }
    if(page==='bayer' && !html.includes('Document Management'))fail(file+': Bayer content missing');
    if(page==='man-industrial-messaging' && !html.includes('KubeMQ'))fail(file+': MAN content missing');
    passed++;
  }
}
if(errors.length){for(const e of errors)console.error(e);process.exitCode=1}
else console.log('Site QA passed: '+passed+' localized pages, routes, assets, content and navigation.');
