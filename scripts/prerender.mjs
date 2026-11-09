import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const meta = {
  de:{
    home:['Clouds Sky | Software & Systems Engineering','Softwarearchitektur, Systems Integration und souveräne Cloud-Architekturen für geschäftskritische Systeme.'],
    enterprise:['Enterprise Engineering | Clouds Sky','Software Engineering, Event-Driven Integration, Cloud Engineering und Data & AI. Von vSphere und OpenStack bis AWS und GCP.'],
    company:['Company & Engineering DNA | Clouds Sky','Clouds Sky GmbH: unabhängig im Engineering seit 2010. Unsere Menschen, Architekturprinzipien und langfristige Verantwortung.'],
    work:['Selected Work | Clouds Sky','Ausgewählte Engineering-Projekte bei Volkswagen, Bayer, MAN, DKV Mobility, Vaillant und weiteren Unternehmen.'],
    volkswagen:['Volkswagen Shared Platform | Clouds Sky','Engineering einer Shared Platform für Volkswagen Business Units: Kops, EKS, GKE, Terraform, Pulumi, Java und Node.js.'],
    method:['Engineering Method | Clouds Sky','Von Requirements zu Contracts, ADRs und Engineering Evidence: nachvollziehbare Architekturentscheidungen in der Praxis.'],
    insights:['Insights & Research | Clouds Sky','Fachliche Perspektiven auf Event-Driven Architecture, Softwarearchitektur, AI Engineering und Quantum Research.'],
    'architecture-decisions':['Architecture Decisions in Practice | Clouds Sky','ADRs, Architecture Contracts und überprüfbare Engineering-Ergebnisse für langlebige Systeme.'],
    'event-driven-architecture':['Event-Driven Architecture | Clouds Sky','Event Contracts, Delivery Semantics, Idempotenz und resilienter Betrieb von Messaging-Systemen.'],
    contact:['Projekt anfragen | Clouds Sky','Sprechen Sie mit Clouds Sky über Software Engineering, Systems Integration, Cloud und Data Engineering.'],
    imprint:['Impressum | Clouds Sky','Anbieterinformationen und Kontaktdaten der Clouds Sky GmbH.'],
    privacy:['Datenschutz | Clouds Sky','Informationen zum Datenschutz auf der Website der Clouds Sky GmbH.']
  },
  en:{
    home:['Clouds Sky | Software & Systems Engineering','Independent architecture, software engineering, systems integration and cloud expertise for business-critical systems.'],
    enterprise:['Enterprise Engineering | Clouds Sky','Software engineering, event-driven integration, cloud engineering, and data and AI from OpenStack to public cloud.'],
    company:['Company & Engineering DNA | Clouds Sky','Meet the people and engineering principles behind Clouds Sky, an independent software and systems engineering company.'],
    work:['Selected Work | Clouds Sky','Engineering experience with Volkswagen, Bayer, MAN, DKV Mobility, Vaillant and other enterprise clients.'],
    volkswagen:['Volkswagen Shared Platform | Clouds Sky','Long-term Volkswagen platform engineering across Kops, EKS, GKE, Terraform, Pulumi, Java and Node.js.'],
    method:['Engineering Method | Clouds Sky','Engineering from requirements and contracts to architecture decisions, implementation and evidence.'],
    insights:['Insights & Research | Clouds Sky','Engineering perspectives on event-driven architecture, software design, AI engineering and quantum research.'],
    'architecture-decisions':['Architecture Decisions in Practice | Clouds Sky','Architecture Decision Records, explicit contracts and engineering evidence for durable software systems.'],
    'event-driven-architecture':['Event-Driven Architecture | Clouds Sky','Event contracts, delivery semantics, idempotency and resilient messaging operations.'],
    contact:['Discuss a Project | Clouds Sky','Connect with Clouds Sky for software architecture, systems integration, cloud and data engineering.'],
    imprint:['Imprint | Clouds Sky','Corporate contact and provider details for Clouds Sky GmbH.'],
    privacy:['Privacy | Clouds Sky','Privacy information for the Clouds Sky GmbH website.']
  }
};
const escapeHtml = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');

const source = fs.readFileSync('assets/site.js', 'utf8');
const pages = ['home','enterprise','company','work','volkswagen','method','insights','architecture-decisions','event-driven-architecture','contact','imprint','privacy'];
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
    const [title,description]=meta[lang][page];
    const canonical='https://cloudssky.com/'+lang+'/'+(page==='home'?'':page+'/');
    let documentHtml=html.replace(marker, output + marker);
    documentHtml=documentHtml.replace(/<title>[^<]*<\/title>/,'<title>'+escapeHtml(title)+'</title>');
    documentHtml=documentHtml.replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+escapeHtml(description)+'">');
    documentHtml=documentHtml.replace('</head>','<meta property="og:type" content="website"><meta property="og:title" content="'+escapeHtml(title)+'"><meta property="og:description" content="'+escapeHtml(description)+'"><meta property="og:url" content="'+canonical+'"><meta name="twitter:card" content="summary"></head>');
    fs.writeFileSync(file, documentHtml);
    written++;
  }
}
console.log('Pre-rendered ' + written + ' localized pages to static HTML');
