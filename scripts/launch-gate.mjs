import fs from 'node:fs';
const file = 'LAUNCH_APPROVAL.json';
if (!fs.existsSync(file)) throw new Error('Production deployment blocked: approval record missing');
const state = JSON.parse(fs.readFileSync(file, 'utf8'));

// A first deployment is required before live HTTPS and redirect checks are possible.
// This is a gated two-stage release, not a claim that the post-deployment tests passed.
const preflight = ['legal', 'privacy', 'branding', 'references', 'contact', 'browserQA'];
const pending = preflight.filter(key => state.checks?.[key] !== true);
const hosting = state.verification?.hostingAndRedirects;
const hostingReady = hosting?.predeployment?.approved === true
  && hosting?.predeployment?.customDomain === 'cloudssky.com'
  && hosting?.predeployment?.dnsCheck === 'successful'
  && hosting?.predeployment?.rollbackDocumented === true;
const finalHostingApproved = state.checks?.hostingAndRedirects === true;

if (state.approved !== true || pending.length || (!hostingReady && !finalHostingApproved)) {
  console.error('Clouds Sky production deployment is BLOCKED. Owner release authorization: ' + Boolean(state.approved));
  console.error('Pending pre-deployment sign-offs: ' + (pending.join(', ') || 'none'));
  console.error('Hosting preflight approved: ' + hostingReady);
  process.exit(1);
}
if (!finalHostingApproved) {
  console.warn('STAGED DEPLOYMENT: live HTTPS, www and legacy redirects must still be verified post-deployment. Not marked complete.');
} else {
  console.log('Final hosting and redirect verification recorded.');
}
console.log('Clouds Sky deployment authorization verified. Release notes: ' + String(state.reviewReference || 'not specified'));
