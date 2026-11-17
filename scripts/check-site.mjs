import fs from 'node:fs';
import path from 'node:path';

if(!fs.existsSync('assets/engineering-digital-wave.svg'))fail('Missing Volkswagen procedural vector wave asset');
const wave=fs.readFileSync('assets/engineering-digital-wave.svg','utf8');
if(!wave.includes('<svg')||!wave.includes('id="wave"'))fail('Engineering wave SVG invalid');
const css=fs.readFileSync('assets/site.css','utf8');
for(const expected of ['engineering-digital-wave.svg','.hero:before','.cards .card-visual.visual-1']){
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
const pages=['home','enterprise','products','company','work','method','insights','architecture-decisions','event-driven-architecture','contact','imprint','privacy'];
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
    if(!html.includes('/products/') && !html.includes('products/'))fail(file+': products navigation missing');
    if(page==='products' && (!html.includes('https://openkubes.org/') || !html.includes('https://kubernautic.com/')))fail(file+': product destination links missing');
    if(page==='home' && !html.includes('class="product-grid"'))fail(file+': homepage product cards missing');
    for(const link of ['architecture-decisions/','event-driven-architecture/']){
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
    if(page==='enterprise' && ['terraform','pulumi','openstack','apachekafka','vmware'].some(mark=>!html.includes('public/technology/'+mark+'.svg')))fail(file+': technology landscape logo missing');
    if(['enterprise'].includes(page) && !html.includes('public/technology/aws.svg'))fail(file+': authorized AWS logo missing');
    if(['enterprise'].includes(page) && !html.includes('public/technology/googlecloud.svg'))fail(file+': authorized Google Cloud logo missing');
    if(['enterprise'].includes(page) && !html.includes('public/technology/kubernetes.svg'))fail(file+': Kubernetes logo missing');
    if(['home'].includes(page) && ['terraform','pulumi','openstack','apachekafka','vmware','go'].some(mark=>html.includes('public/technology/'+mark+'.svg')))fail(file+': unexpected logo outside technology landscape');
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
    if(['enterprise','company','method','work','insights','architecture-decisions','event-driven-architecture'].includes(page) && !html.includes('aria-current="page"'))
      fail(file+': active navigation missing');
    if(page==='home'){
      if(!html.includes(lang==='de'?'Automobilindustrie':'Automotive'))fail(file+': industry ticker missing');
      if(/Volkswagen|Bayer Business Services|MAN \/ SYNAOS|Deutsche Post|DKV Mobility|ZEISS/.test(html))fail(file+': customer reference exposed');
      if(!html.includes('Kubernautic'))fail(file+': platform invitation missing');
    }
    if(html.includes('cloudssky.com/en/insights/cloud-native-shared-platform-gke/'))fail(file+': legacy GKE article link not migrated');
    if(page==='company'){
      if(html.includes('class="people"') || html.includes('class="digital-team"') || html.includes('class="person person-digital"') || html.includes('team-disclosure'))fail(file+': team section must not be published');
      if(html.includes('assets/team/'))fail(file+': team portrait reference must not be published');
      for(const required of ['company-people-section','company-people-capabilities','company-people-signature']){
        if(!html.includes(required))fail(file+': experience-led People section missing '+required);
      }
      if(!html.includes('Experience is human.') && !html.includes('Erfahrung ist menschlich.'))fail(file+': People headline missing');
    }
    passed++;
  }
}
for (const lang of ['de','en']) {
  for (const legacy of ['volkswagen','bayer','man-industrial-messaging']) {
    const file=path.join(lang,legacy,'index.html');
    const html=fs.readFileSync(file,'utf8');
    if(!html.includes('name="robots" content="noindex,follow"'))fail(file+': old case URL not set to noindex');
    if(!html.includes('http-equiv="refresh"'))fail(file+': old case URL missing transition to industry overview');
    if(!html.includes('https://cloudssky.com/'+lang+'/work/'))fail(file+': industry overview link missing');
    if(/<title>(Volkswagen|Bayer|MAN)/i.test(html))fail(file+': named case title still published');
  }
}
if(errors.length){for(const e of errors)console.error(e);process.exitCode=1}
else console.log('Site QA passed: '+passed+' localized pages, routes, assets, content and navigation.');
