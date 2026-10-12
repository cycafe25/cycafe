# ReviewLink inside Cycafe

ReviewLink is now a native workspace in `admin.html`. It uses the existing Firebase project and Cycafe administrator registry. There are no ChatGPT SDKs, authentication headers, domains, redirects, or hosted API dependencies in the new QR workflow.

## Deploy

1. Run `python package-site.py` to build `dist/cycafe` and `dist/Cycafe-integrated-ReviewLink.zip`.
2. Upload the contents of `dist/cycafe` to any HTTPS static host. No Node server or SQL migration is required. Keep `review.html` and the JS files at the same level as `admin.html`. For a subfolder installation, keep the folder structure intact.
3. In Firebase project **login-me-71357**, replace Firestore rules with the complete root `firestore.rules` file and publish. This adds the two QR collections while preserving the existing application rules. The ZIP includes the rules in `deployment/` for reference; that folder is not part of the website.
4. Keep the existing `admins/FIREBASE_AUTH_UID` administrator record. No additional login is required for QR management. Add a new hosting domain to Firebase Authentication's Authorized Domains when needed by your authentication provider.
5. Open your deployed `admin.html`, sign in, and select **ReviewLink Manager**. Set **Permanent deployment URL** to the final HTTPS location of your website. For a subfolder, include a trailing slash, for example `https://example.com/cycafe/`.
6. Create a board, click **Manage**, enter the business name and Google Business Profile review-request link, choose **Active**, and save. Download SVG/PNG or print the board.
7. Scan the printed QR on a different phone or private browser. It opens `review.html?code=...` on your own domain, reads only the latest public mapping, and redirects directly to Google. Google may require its own sign-in to submit a review.

For Firebase Hosting, the configured public folder is `dist/cycafe`. After building, a project owner can run `firebase deploy --project login-me-71357 --only hosting,firestore:rules`. Do not deploy the project root: it contains the original source ZIP extraction, tests, and development tools.

## Data and access

- `reviewBoards/{20-character-code}`: private inventory, business details, timestamps, and permanent deployment base. Accessible only to Cycafe administrators.
- `reviewRedirects/{same-code}`: status and active Google review destination only. Anonymous customers may fetch a single known code; they cannot list codes or modify records.
- Private board changes and public redirects are committed atomically. Creation batches use at most eight boards per commit to respect Firestore cross-document rule limits. If a later batch fails, already-created boards remain visible and the error reports the completed count.
- Paused and unassigned boards have an empty public destination. The review page always reads from the server and does not use stale offline mappings.
- The production domain is saved on creation. It is immutable on subsequent edits, so changing a business's review destination does not change the printed QR. Keep that domain and path available for the lifetime of your boards.
- The default Firebase browser configuration is in `firebase-public-config.js`. To use a different Firebase backend, update that file and set up its admin registry/rules. Firebase browser configuration is not an administrator credential; security is enforced by the database rules.

## Existing boards

The supplied ReviewLink ZIP contains source code, not records from the old hosted D1 database. Those records and visit counts were not migrated. Existing QR codes physically encode the old `chatgpt.site` domain; changing the program cannot rewrite printed QR codes. Keep the old redirect service running for those boards, or create and print replacements from Cycafe. The extracted `ReviewLink/` folder is retained only as the original source reference and is excluded from the deployment build.

## Verification

- `node tests/reviewlink.cjs`: validation, actual QR decoding, protected Firebase adapter, atomic mapping updates, pause/activate behavior, stable URLs, UI escaping, sign-out cleanup, failed writes.
- `firebase emulators:exec --project demo-cycafe-reviewlink --config firebase.review-tests.json --only firestore "node tests/reviewlink-rules.cjs"`: real Firestore rules, anonymous scan resolution, denied inventory reads/public writes, no customer admin escalation, batch access limits.
- Existing metadata and content synchronization regression tests also pass.

Test dependencies: `jsdom`, `jsqr`, `firebase`, `@firebase/rules-unit-testing`; the test loader also supports the local temporary dependency directory used during development. QR rendering is bundled in `vendor/qrcode.js` (qrcode-generator 2.0.4, MIT), and needs no external QR service.

Live writes require publishing the updated rules. Local code changes do not publish Firebase rules or upload the site automatically.
