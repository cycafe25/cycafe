# Website content publishing

Both pages load content-defaults.js, cyber-services-data.js and content-store.js.
content-firebase.js listens to the root services and notices collections with
onSnapshot, including for signed-out visitors. Only registered admins may write.

Existing catalogue entries appear in admin without copying hundreds of documents.
Editing one writes its complete record under its stable ID. Deleting sets
deleted:true so the built-in entry cannot reappear on reload. Do not remove a
built-in's tombstone document manually unless you intend to restore it.

Jobs use type:notice; schemes use type:scheme (legacy schemes is accepted).
Admin editors now show contextual publishing fields rather than a collapsed
generic details form. Job notices offer institute/stage/eligibility presets with
editable custom text, vacancies, numeric ageMin/ageMax (including half years),
ageAsOf, ageRelaxation, ageLimit legacy text, application/exam schedule and a
calendar deadline picker. A legacy text deadline is preserved unless changed.
Schemes offer a searchable multiple-authority checkbox dropdown plus manual
department entries, stage, benefits, beneficiaries, mandatory documents,
independent latest update and description, effective schedule and deadline.
The preset central ministry list was checked against the official
[Government directory](https://igod.gov.in/ug/categories) on 2026-10-02; state/UT
governments, existing authorities and other institutes can also be selected or
entered manually. This is not an automatically updated exhaustive state
department directory. Services support institute, government/state/UT and all
existing categories, including Legal & Security and Identity & Citizenship.
Expanded metadata is rendered on the public website and stored in the existing
Firestore records, preserving unrelated legacy fields. Run
`npm run test:metadata --prefix tests` for add/edit/reload and safe-render tests.
The public renderer accepts both link/officialUrl and desc/keyUpdate formats.
Old browser notices, including posts saved under the old undefined key, appear as
saved drafts in admin. Review and click Publish saved draft to publish them once.

Deploy the changed HTML, JS, and service worker together. Publish firestore.rules
to project login-me-71357 if permissions prevent reading or writing notices.
The Firebase CLI account available during implementation did not list that project,
so no cloud rules or hosting deployment was performed. Read-only production checks
confirmed services was readable (one saved item) and notices was readable but empty.

Validation: npm install --prefix tests, then npm test --prefix tests.
The jsdom integration test uses an in-memory Firebase adapter shared by two page
contexts. It covers built-ins, create/edit/delete, cross-page updates, reloads,
legacy types, draft recovery, metadata preservation and unsigned write rejection.
It does not substitute for a signed-in live Firebase publishing test or emulator
security-rule tests. No test data is written to the production database.
