import fs from 'node:fs';
const file='LAUNCH_APPROVAL.json';
if(!fs.existsSync(file))throw new Error('Production deployment blocked: approval record missing');
const state=JSON.parse(fs.readFileSync(file,'utf8'));
const required=['legal','privacy','branding','references','contact','browserQA','hostingAndRedirects'];
const pending=required.filter(key=>state.checks?.[key]!==true);
if(state.approved!==true||pending.length){
  console.error('Clouds Sky production deployment is BLOCKED. Approval: '+Boolean(state.approved));
  console.error('Pending sign-offs: '+(pending.join(', ')||'final approval'));
  process.exit(1);
}
console.log('Clouds Sky deployment approval verified. Release notes: '+String(state.reviewReference||'not specified'));
