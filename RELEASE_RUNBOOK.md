# Clouds Sky — production cutover runbook (2026-11-10)

## Release state
- Owner authorized public launch of `cloudssky.com` via chat on 2026-11-10.
- GitHub Pages **Source = GitHub Actions** was enabled by owner (screenshot).
- PR #1 was squash-merged into `main` on 2026-11-10 as `ae09c757bfe356504f9abd0d068c0f4730e6a6c1`. Pre-merge PR CI passed; successful production deployment has **not** been verified.
- `LAUNCH_APPROVAL.json` keeps a default-deny gate until each outstanding release check is verified.
- User prefers **direct production cutover**; no separate preview address.
- Legacy website is presently routed through Cloudflare A records to `46.16.74.96` (owner screenshot), and Google Workspace MX records must remain unchanged.

## Mandatory pre-merge verification
1. **Legal:** Review both /de/imprint/ and /en/imprint/. Compare company identifiers with a current official Handelsregister extract and confirm manager full names, address, editorial responsibility. Do not publish internal legal-review notices or outdated blanket disclaimer assertions as approved legal content.
2. **Privacy:** Replace DE/EN `STATUS: PRÜFENTWURF / REVIEW DRAFT` with a completed, factually correct Art. 13 notice. Confirm GitHub Pages hosting and Cloudflare DNS proxy mode, access logs, recipients/transfers, retention, processor agreements, external Calendly and contact mail. GitHub documents visitor IP logging for security.
3. **Brand / client attribution:** Obtain approvals for customer brand marks and project descriptions (particularly Volkswagen, MAN/SYNAOS and Bayer); if permissions cannot be established, replace client logos with neutral text and adjust case-study statements before sign-off.
4. **Contact:** mailto and outbound Calendly are configured (no server-side contact form); verify recipient mailbox accepts messages and booking link opens as intended.
5. **Browser/accessibility:** Test Chrome and Safari, desktop and mobile, no horizontal overflow, keyboard navigation, cloud pointer gestures, reduced-motion preference and external links.
6. **Deployment:** Validate URL redirects from the legacy site, HTTPS, a rollback method, and only then sign off `hostingAndRedirects`. DNS changes must be restricted to the web apex and `www`.

## GitHub Pages activation
1. Settings > Pages > Source: **GitHub Actions** (already done).
2. After all sign-offs, set `approved=true` and all seven `checks` to true in `LAUNCH_APPROVAL.json`, each with evidence, and review the separate release commit. Do not remove or bypass `scripts/launch-gate.mjs`.
3. **Completed:** PR #1 was marked ready and merged into `main` on 2026-11-10; do not repeat this step.
4. After the verified release gate is approved, in GitHub Actions inspect **Deploy Clouds Sky to GitHub Pages**: `Verify production release approval`, prerender, upload and deployment must all succeed.
5. Set custom domain `cloudssky.com` under Settings > Pages. GitHub might take some time to issue TLS. **Do not enable Enforce HTTPS until a valid certificate is issued.**

## Cloudflare DNS cutover (once approved and Pages is deployable)
Snapshot/export existing Cloudflare DNS zone and record original website values and proxy states first.

Apex: replace only website routing records for `@`:
- A @ -> `185.199.108.153`
- A @ -> `185.199.109.153`
- A @ -> `185.199.110.153`
- A @ -> `185.199.111.153`
- Set **DNS only (gray cloud)** while GitHub validates domain and TLS, to avoid ambiguous GitHub Pages verification/proxy behavior.

WWW: replace only existing web A record with:
- CNAME `www` -> `cloudssky.github.io` (**DNS only**) or use GitHub's exact custom-domain instructions at cutover.

Never change or delete:
- MX records for Google Workspace
- TXT records for SPF/Google site verification or other services
- DKIM/DMARC TXT records
- `mail`, `ftp`, `opencms` and unrelated subdomains
- NS, DNSSEC, Cloudflare email routing, or SSL modes

## Post-cutover smoke test
- `https://cloudssky.com/de/` and `/en/` load the new hero, interactive clouds, working navbar and ocean.
- `https://www.cloudssky.com/` redirects correctly according to GitHub's domain configuration.
- Routes: /de/company/, /de/contact/, /de/imprint/, /de/privacy/, /en/contact/ and case studies.
- Legal/privacy pages must show finalized public text without internal review-draft notices.
- Pages certificate status: valid; HTTPS works, no mixed-content errors.
- Test email `support@cloudssky.com` inbound and outbound independently of the website.
- Test Calendly outbound link and mobile/tablet navigation.
- Ensure any important legacy URLs redirect or have documented replacements.

## Rollback
If the website fails, restore original apex and www web DNS record values and Cloudflare proxy settings saved in the zone snapshot (currently the supplied screenshot shows `46.16.74.96`). Do not roll back or change mail records. Keep production PR commit available for debugging.

## Evidence considered
- Owner Cloudflare DNS screenshot, owner GitHub Pages screenshot, and reviewed Chrome desktop screenshots.
- GitHub Pages docs: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Public business directory cross-check (not official register): https://handelsregister.ai/de/organizations/koeln/datenverarbeitung-hosting-und-damit-verbundene-taetigkeiten-a-n-g/clouds-sky-gmbh-50f0e49044e578f29aa3751561cfb611
- Current official commercial register document still required for formal confirmation.

## Post-merge verification — 2026-11-10
- Merge confirmed by GitHub: PR #1, squash commit `ae09c757bfe356504f9abd0d068c0f4730e6a6c1`.
- The `main` branch contains `LAUNCH_APPROVAL.json` with `approved=false`; all checks except `contact` still false. **Do not bypass or falsely approve.**
- Pages workflow present on `main`; it invokes `scripts/launch-gate.mjs` before pre-render and deployment. Connector workflow-run lookup only exposes PR-triggered runs, therefore absence of a result does **not** establish whether the push-triggered Pages run started or failed.
- Remote HTTP/DNS verification inconclusive from the execution environment (DNS lookup unavailable); public search results show legacy site content but are not real-time evidence of routing.
- Next steps: verify independent rights/legal/privacy and hands-on accessibility/browser testing, then evidence-backed release approval, deploy, validate certificate and DNS cutover while preserving mail records.

## Two-stage controlled hosting gate — 2026-11-10
- A first Pages deployment is necessary to test a production TLS certificate and live routing; these cannot truthfully be marked passed before publication.
- The deployment gate now checks six pre-deployment sign-offs (legal, privacy, branding, references, contact, browserQA), explicit owner release authorization (`approved=true`), and an evidenced hosting preflight (`verification.hostingAndRedirects.predeployment.approved=true`), **or** the final hosting sign-off.
- The hosting preflight has been documented from owner GitHub/Cloudflare screenshots: `cloudssky.com` is configured in Pages; GitHub DNS check reported success; web DNS points to GitHub Pages with DNS-only, and rollback instructions are recorded here. This **does not** certify successful deployment, HTTPS or redirects. `checks.hostingAndRedirects=false` until post-deployment verification.
- **The deployment remains blocked**: `checks.branding=false`, because separate third-party technology SVG marks are not yet verified for public usage; `approved=false` remains.
- Once branding is cleared (or unverified third-party logos are replaced with neutral text labels), record evidence, then explicitly set `approved=true` and run `Deploy Clouds Sky to GitHub Pages` via workflow_dispatch. Do not set unverified statuses merely to unblock CI.
- Immediately after first deploy: check https://cloudssky.com/de/, /en/, /de/privacy/, /de/imprint/, https://www.cloudssky.com/, certificate validity and legacy URLs; record each outcome. Only then set `checks.hostingAndRedirects=true`.
- If deployment fails or Pages returns 404, restore the previous website A records for apex and www from the saved DNS snapshot as appropriate. Never touch MX, SPF, DKIM or DMARC.
