# Repository transition and website integration

## One code home

Creating a GitHub Project board does not require copying application code. A board can track the existing repository. If a new repository is preferred, preserve commit history and make the relationship explicit; avoid two independently edited copies both described as current.

This package does not create either resource and does not contain application source. Its files can be added after the destination exists.

## Suggested import sequence

1. Confirm existing main still matches the audited SHA, or record intervening changes and re-evaluate affected findings.
2. Preserve a local backup/reference of the source and history before any move.
3. Choose existing repo plus board, or a new repository with history. Do not delete or force-push the original.
4. If moving, import history through an intentional clone/push or GitHub migration workflow once the actual destination is known and the action is authorized. Preserve assets and commit provenance. Do not invent a destination URL in advance.
5. Add this Markdown package. Compare README.md with the existing file; retain the old content in history rather than blindly pasting conflicting setup instructions.
6. Confirm only one repository/branch is the ongoing implementation authority. Link the historical source from the new README.
7. Create a small Project board if useful: Ideas, Ready, In progress, Review, Verified, Blocked. Verified means acceptance evidence is attached, not just code exists.
8. Import CMO-001 through CMO-005 first; do not pre-create dozens of speculative issues.

## What not to import

Do not copy .env files, deployment tokens, node_modules, .next, personal test submissions or browser profiles. Do not publish raw audit tool responses or local machine paths as product documentation. The source/lockfile and selected reviewed docs are sufficient for a reproducible start.

No LICENSE exists at baseline. A new public repository should not claim an MIT or other license until the owner selects it. Public case studies should use synthetic examples and rights-cleared assets; no private prior-employer metrics are needed to demonstrate the tool.

## Website integration options

| Option | Advantage | Cost / constraint | Suggested timing |
|---|---|---|---|
| Ordinary link to stable standalone tool | Smallest change and independent release cycle | Cross-site branding/navigation and return journey need care | First integration |
| Tool under a subdomain | Clear product boundary | Domain, email/canonical policy and analytics decisions | When a stable tool is ready |
| Shared engine package plus native website UI | Unified experience and reusable logic | Versioning/build ownership; avoid duplicated rule code | If native integration becomes valuable |
| Proxy/rewrite under website subpath | Can preserve a standalone deployment | Current absolute /intake, /results, /api and asset paths can break; test basePath/navigation/POSTs | Only with a concrete need |
| Iframe | Fast visual embedding | Focus, responsive height, navigation, share URLs and accessibility complexity | Not the default |

Do not merge two Next.js applications or copy the rules engine into several sites just to make a navigation link feel integrated.

## Vercel transition

The existing production project has a READY deployment of the audited commit. A new repository/project may require new Git linkage, build/runtime settings, variables and sender configuration. Those values do not automatically transfer with Markdown or source history.

Before any preview: confirm team, project, branch, SHA and intended environment. Keep provider sends disabled or fake for synthetic previews. Mirror variable names deliberately; never copy secret values into docs. Verify actual auth/indexing settings rather than assuming a preview is private. A preview deploy is distinct from domain assignment or production promotion.

No deployment, environment change or domain operation is authorized by this handoff itself. Future session instructions control the actual action.

## Integration acceptance

- Site visitor understands why to use the tool and can reach it on mobile.
- Assessment/back/results/share/print work at the actual URL arrangement.
- Browser and email follow-up links reach approved destinations.
- Request data and optional marketing consent go only to the selected destination.
- Metadata/indexing policy for answer URLs is intentional; avoid accidental duplicate/sensitive result indexing.
- Exact source/deployment revisions and completed checks are recorded.
- The GitHub README links to the actual verified public demo only after it exists and is intended to be public.
