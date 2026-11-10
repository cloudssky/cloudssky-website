# Clouds Sky — technology trademark logo review
Date: 2026-11-10
Scope: public/technology SVGs embedded in editorial architecture and technology diagrams.

## Owner decision
The owner requests to retain the logos **only where their use is permitted**. This is a conditional design preference, not proof that a third party has licensed its mark.

## Current findings
| Mark | Asset | Public guidance | Conclusion for current commercial company website |
|---|---|---|---|
| Kubernetes | `public/technology/kubernetes.svg` | https://github.com/kubernetes/kubernetes/blob/master/logo/usage_guidelines.md ; https://www.cncf.io/brand-guidelines/ | Likely permitted for accurately depicting compliant Kubernetes integrations, without suggesting CNCF endorsement; verify logo is unaltered and presentation adheres to Linux Foundation rules. |
| Go | `public/technology/go.svg` | https://go.dev/brand | Referential logo use may be permissible when it identifies Go, but no modification or close juxtaposition with another logo/badge without prior approval. Current architecture illustration places it near AWS, so spacing/composition needs review. |
| AWS | `public/technology/aws.svg` | https://aws.amazon.com/terms/ ; https://d1.awsstatic.com/legal/trademarkguidelines/trademark%20guidelines_de.pdf | AWS mark use must follow AWS rights and branding permissions; independent authorization for a third-party commercial site not established. Text reference is safer. |
| Google Cloud | `public/technology/googlecloud.svg` | https://about.google/brand-resource-center/guidance/ ; https://about.google/brand-resource-center/guidance/partnerships/ | Google states a non-partner generally may not display its logos to suggest affiliation; written approval or an applicable contractual exception not established here. |
| VMware | `public/technology/vmware.svg` | https://news-editor.broadcom.com/wp-content/uploads/2021/09/vmware-logo-guidelines.pdf | Logo use by third-party vendors on their site may be restricted; no suitable contractual permission established here. |
| Kafka, OpenStack, Pulumi, Terraform, other marks | `public/technology/*` | Varies by owner; not all official policies reviewed | Unverified: retain in repository but do not claim public-use clearance until applicable current guidelines and source provenance are documented. |

The initial AWS/Google Cloud full-color assets came from a community logo collection rather than first-party authorized downloads. Asset availability does not confer trademark rights.

## Release consequence
- No visual changes were made in this review, in line with the owner's wish to keep legitimately permitted marks.
- `checks.branding` **remains false** because legal rights for all displayed logos are not established.
- Do not claim this audit is legal permission or sign-off.
- Resolution options: attach official written permissions/brand approvals for restricted marks, or replace *only* the unverified marks with styled technology text labels, while retaining marks with confirmed permitted use. Update layout/QA assertions accordingly.
- Post-deployment hosting checks remain separate and may be completed only after successful deployment.
