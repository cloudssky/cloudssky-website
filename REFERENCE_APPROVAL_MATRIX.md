# Clouds Sky — Named customer references: release approval matrix

**Status (2026-11-10): OWNER CONTENT APPROVAL RECORDED.** The website owner explicitly approved all remaining displayed references and content via chat. Independent customer/partner publication rights, confidentiality obligations, and precise contractual attribution have not been verified. This is a review aid, not a license or legal opinion.

## Public claims requiring explicit owner review

| Name / context | Public locations | Proposed wording scope | Confirmation required | Status |
|---|---|---|---|---|
| Volkswagen | Homepage VW architecture, Selected Work, VW case, client ticker, submenu | Kops/AWS -> EKS -> GKE, Terraform/Pulumi, Go extensions, shared platform engineering | Confirm public identification is permitted, actual attribution and stages; confirm technical detail does not disclose non-public architecture; partner contributions correctly credited | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| Bayer | Selected Work, detailed Bayer case, client ticker, submenu | Enterprise document management, HR portals, intranet, ~20 organizational units | Confirm customer name and scope may be public, exact relationship and quantitative organizational scope | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| MAN / SYNAOS | Selected Work, industrial messaging case, client ticker, submenu | IBM MQ/KubeMQ/VerneMQ and RKE2; disclaimer that Kubernauts participated as contracting partner/subcontractor | Confirm neither entity's name or confidential technical detail is improperly disclosed; review MAN, SYNAOS, Volkswagen and Kubernauts relationship statements | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| DKV Mobility | Selected Work, client ticker | OpenShift, Azure, Rancher, Strimzi, Confluent Kafka | Confirm public name, exact technical involvement and contract role | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| ZEISS | Selected Work, client ticker | IoT messaging, Kubernetes, HiveMQ, VerneMQ | Confirm public name and technical involvement | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| Covestro | Selected Work, client ticker | Recruiting portal, SAP integration | Confirm public name and work scope | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| Vaillant | Selected Work, client ticker | Kafka on Microsoft Azure | Confirm public name and project scope | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| SAP | Client ticker | Name only, no technical detail in ticker | Confirm that referring to SAP as customer/project experience is accurate; distinguish technology provider from contractual customer | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| Deutsche Post | Client ticker | **Name only** (no logo or detailed project claim) | Owner explicitly approved the public name-only ticker reference on 2026-11-10; precise group entity, scope and contractual role are not yet documented | **APPROVED — TEXT ONLY** |
| WWK | Client ticker | Name only | Confirm exact business entity, scope and permitted mention | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |
| Enovos | Client ticker | Name only | Confirm exact business entity, scope and permitted mention | OWNER APPROVED; EXTERNAL RIGHTS UNVERIFIED |

## Technology marks (not client-relationship endorsement)

AWS, Google Cloud, Kubernetes, Go, VMware, Kafka, OpenStack, Terraform and other technology symbols appear as product/technology references. These are not customer logos. Confirm the versions currently used comply with each trademark and brand-assets guideline; avoid language implying endorsement, certification or partnership unless verified. The homepage client ticker currently uses **text only** for customer names.

## Recommended safe choices for each item

- **Approved:** Record the approver/date, authorized scope, approved relationship wording and evidence (e.g., public case study, written client approval or contract reference clause). This is sufficient to update the release matrix but not necessarily to reproduce brand artwork.
- **Text only:** Keep a verified factual reference with precise supplier/partner attribution; exclude client logo artwork.
- **Not approved / cannot verify:** Remove the entity from the client ticker and Selected Work, and hide or generalize the corresponding case study before deployment. Do not use protected technical descriptions from confidential contracts.
- **Tech marks:** Keep only appropriately attributed unmodified marks with confirmed permissible use or substitute neutral text labels.

## Special cutover consideration — legacy content

The detailed Volkswagen case currently links to an existing article:
`https://cloudssky.com/en/insights/cloud-native-shared-platform-gke/`.

This path is **not** among the 28 new static routes. A domain cutover may therefore break it unless the article is migrated, a redirect is provisioned or the link is revised before launch.

## Approval record template

For each named reference, append:
- Customer / entity:
- Permitted public name and description:
- Clouds Sky / Kubernauts / other contracting-role distinction:
- Brand logo permission (separate from text permission):
- Authorized by / date / evidence:
- Approved public URL(s):

Set `LAUNCH_APPROVAL.json.checks.references=true` only when every retained named reference is reviewed; set `checks.branding=true` only when every displayed mark is checked or substituted with an approved alternative.

### All remaining references — owner approval (2026-11-10)
The website owner stated **„alles andere ist auch freigegeben“** following approval of the Telekom → Deutsche Post replacement. This records the owner's editorial/publication approval for the named references and depictions *as currently displayed*. It does not independently verify permission granted by each named third party, compliance with trademark guidelines, or confidentiality and contracting limitations.

### Deutsche Post — explicit owner approval (2026-11-10)
The owner replied **„Freigabe“** immediately after the Telekom → Deutsche Post homepage ticker substitution. This records permission to display **Deutsche Post as text in the customer-experience ticker only**. It does not authorize a Deutsche Post logo, an additional case study, or undisclosed project details. The current ticker notes that roles and contracting arrangements vary.
