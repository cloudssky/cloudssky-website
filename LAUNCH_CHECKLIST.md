# Clouds Sky relaunch — Go-live readiness

## Completed in website-relaunch-v1
- 28 localized static pages (DE and EN), 3 case studies, 2 engineering insights.
- Large WE DO. brand statement leads the homepage hero.
- V3 visual design: multi-layer CSS light/shadow architectural arcs in the hero, an original generated vector mesh-wave behind the Volkswagen project panel, and harmonized blue editorial Insights cards. No remote image fetches or third-party assets are needed for these backgrounds.
- Responsive header and hierarchical Selected Work / Insights menu with active-page states.
- Customer experience ticker, preliminary visual assets, technology landscape and selected work diagrams.
- AWS navy/orange and Google Cloud four-color brand SVGs added to the Volkswagen timeline and Enterprise Technology Landscape. Assets are sourced from gilbarbara/logos and remain subject to AWS/Google trademark guidelines; provenance is not official brand approval.
- Static HTML pre-rendering, localized SEO metadata and GitHub Actions link/route QA.
- Revised concise DE/EN factual imprint without obsolete five-part blanket disclaimer; owner-supplied company details still need formal verification. DE/EN public-facing privacy text is complete, while formal service/processing verification remains open.
- Contact form is intentionally removed until a secure backend is commissioned. Contact is currently through direct email or an external Calendly booking link.
- Protected production Pages workflow: `scripts/launch-gate.mjs` requires `LAUNCH_APPROVAL.json` with all seven verified sign-offs before deployment.
- Downloadable static preview artifact from the PR quality workflow.

## Mandatory sign-offs — contact verified; remaining checks pending
1. **Legal:** The website owner approves the supplied corporate data for the imprint (2026-11-10); this does not replace independent legal verification of the historical disclaimer. The user supplied the old imprint with both managing directors (Stephan Hartmann and Arash Kaffamanesh), Amtsgericht Köln HRB 70999, VAT ID DE815247371, tax number 215/5808/2975 and Finance Office: Cologne Center. These details are now included, but current registry/tax data and the historical five-section disclaimer still require legal verification. The cited law was modernized from § 5 TMG to § 5 DDG. Confirm editorial responsibility and other mandatory notices.
2. **Privacy (content drafted and ready for owner review):** Eight sections in DE/EN now describe GitHub Pages, Cloudflare DNS-only vs proxy, Google Workspace, Calendly external bookings, the localStorage preference and GDPR rights. The text contains no visible internal draft warning. Confirm actual hosting, processing terms, retention criteria, international transfer mechanisms and business procedures before formal GDPR Art. 13 sign-off.
3. **Branding:** Approve customer logo usage and replace preliminary Simple Icons SVGs with approved marks when needed. Customer name permission is not the same as trademark asset approval.
4. **References:** Approve customer project narratives and contracting attributions, especially MAN / SYNAOS / Kubernauts and Volkswagen partner relationships. Validate Company roles and imagery.
5. **Contact (approved for current no-form scope, 2026-11-10):** `support@cloudssky.com` is the intended intake. See CONTACT_INTEGRATION.md for recommended server-side Turnstile verification, mail provider and optional external Calendly scheduling. The current website intentionally has **no form**; visitors can email directly or open the external Calendly page. If a form is later required, select a service/provider, configure secure server-side delivery/anti-spam and revise privacy text.
6. **Browser QA:** Complete hands-on Safari and Chromium mobile/desktop checks, keyboard, reduced motion, screen readers, focus and cross-device layouts. CI verifies static routes, not rendered pixels.
7. **Hosting and redirects:** Confirm Pages publication, preview URL, custom domain, legacy URL redirect plan, HTTPS, DNS records and rollback. Preserve email MX/SPF/DKIM/DMARC records.

## Release guard
Production deployment is **default-denied** by `LAUNCH_APPROVAL.json` (all fields false). Verify each category, set its flag to true with a review reference, and set `approved=true` only after completed sign-off. Keep this as a separate reviewed commit. Do not bypass the gate.

## Asset provenance
The preliminary third-party client marks under `public/clients/` and technology previews under `public/technology/` were retrieved from Simple Icons. Each trademark belongs to its owner and its permitted use must be verified.

## Unchanged
- Public cloudssky.com and DNS records are untouched.
- Draft PR has not been merged.

## Cloud logo provenance
- `public/technology/aws.svg`: `gilbarbara/logos/logos/aws.svg`, SVG shapes in AWS navy `#252F3E` and orange `#FF9900`.
- `public/technology/googlecloud.svg`: `gilbarbara/logos/logos/google-cloud.svg`, original four-color Google Cloud motif.
- Both are community-hosted copies of branded artwork. Verify permitted use and approved asset versions before public deployment.

## Release review — 2026-11-10
- Website owner explicitly authorized publication to cloudssky.com; this records intent, not independent legal, brand, or technical validation.
- **Contact = approved** for the current mailto/telephone/outbound Calendly design; CI covers presence of links and absence of a form, but does not prove email delivery.
- **Browser QA = partial:** Owner visually checked Chrome desktop DE/EN and tested draggable clouds. Mobile, Safari, focus, accessibility and reduced-motion checks remain open.
- **Hosting = partial:** Screenshot confirms GitHub Pages Source changed to GitHub Actions. Cloudflare screenshot indicates apex and www still point to 46.16.74.96; Google Workspace mail records exist. Domain, HTTPS and redirect checks remain open. Do not alter unrelated DNS or mail records.
- **Legal/privacy = pending:** Visible preview/legal warnings and data processing uncertainties must be resolved before approving a production release; the historical boilerplate should not be presumed enforceable.
- **Branding/references = pending:** Customer and provider marks and project attributions require sign-off; otherwise remove unapproved elements before launch.
- `LAUNCH_APPROVAL.json` retains `approved=false` and the deployment gate must not be bypassed.

## Imprint cleanup — 2026-11-10
- Removed old five-part blanket liability disclaimer and visible pre-publication warning from both imprint languages. Replaced with concise operator, register, tax, copyright, external-link and privacy cross-reference sections.
- Retained owner-supplied legal identifiers without representing them as independently certified. The named managing directors, register and tax details, editorial responsibility and applicable legal requirements still require formal review.
- Latest website QA passed after imprint cleanup.
- The **privacy pages still contain REVIEW DRAFT** and MUST be completed before the public release gate is approved.

## Privacy copy update — 2026-11-10
- Replaced both visible privacy review drafts with readable DE/EN notices of eight sections, including purpose and legal basis by processing category, data recipients, data-subject rights, NRW regulator, and last-updated date.
- Describes GitHub Pages security logging and Cloudflare DNS-only setup, Google Workspace for email, Calendly as external link, and localStorage privacy-notice acknowledgement.
- Provider-specific storage periods and contractual transfer safeguards were not invented; retention criteria and the availability of transfer information are disclosed without claiming verified signed agreements.
- **Formal privacy release status remains pending** until current provider setup, arrangements, and documented retention processes are checked. Do not set `checks.privacy=true` solely because the copy is finished.

## Client-brand and reference mitigation — 2026-11-10
- Customer ticker now uses typographic company names instead of four unapproved client logo SVG reproductions (Volkswagen, MAN, SAP, Deutsche Telekom). Existing neutral textual client marks remain.
- Ticker qualification expressly distinguishes experience in varied delivery and contractual roles from a claim of universal direct customer status.
- Named case studies and technology brand marks still need approval/attribution review; this change is **not** a blanket trademark or case-study sign-off.
- Required reference review: Volkswagen (platform, Kops/EKS/GKE, Go extensions); Bayer (document/HR/intranet); MAN/SYNAOS (industrial messaging via Kubernauts); remaining named environments in the ticker and Selected Work.

## Named-reference and legacy-link review — 2026-11-10
- `REFERENCE_APPROVAL_MATRIX.md` catalogs 11 publicly named companies/environments, role/attribution caveats, logo versus text permissions, and evidence fields for release approval.
- Preserved explanatory case studies but did not mark customer permission as verified. Customer/partner confidentiality and usage rights require owner review.
- Replaced the legacy `https://cloudssky.com/en/insights/cloud-native-shared-platform-gke/` link from the Volkswagen article with the new local Engineering Method page; add a migrated permalink later if desired. QA now rejects that obsolete link.
- No public DNS, production branch or Pages deployment changed.

## Owner blanket approval — 2026-11-10
- The website owner explicitly confirmed **"alles andere ist auch freigegeben"** after approving the Telekom → Deutsche Post replacement, thereby authorizing the currently presented editorial content, reference names and visual choices.
- This approval was recorded in `LAUNCH_APPROVAL.json` and `REFERENCE_APPROVAL_MATRIX.md` without asserting independent customer trademark/publicity rights or legal/GDPR compliance.
- The seven-category production gate remains closed until evidence-backed legal/privacy and third-party rights validation, hands-on browser/accessibility QA, and hosting/HTTPS/redirect checks are completed. Owner authorization is not equivalent to passing these tests.
- Protect Google Workspace MX/SPF/DKIM/DMARC and other mail-related DNS records during any cutover.
