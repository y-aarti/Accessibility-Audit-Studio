# Accessibility Audit Studio — User Story Backlog

Priority: P0 = essential MVP, P1 = important next, P2 = later enhancement.

## EPIC 1: Project and Website Management

### US-01: Create a project
**Priority:** P0  
**As an** auditor, **I want to** create a project for a website, **so that** all its audits and findings are organized in one place.

**Feature details**
- Create a project with a name, description, website URL, and optional team name.
- Assign a project an owner.
- Display the project creation date and last-updated date.
- Allow project details to be edited.
- Prevent deletion when the user lacks permission.

**Acceptance criteria**
1. Given I am on the projects page, when I select “Create project,” a form opens.
2. The project name and valid website URL are required.
3. The URL must use an accepted HTTP or HTTPS format.
4. A successful submission creates a project and displays it in the project list.
5. Invalid fields display useful validation messages.
6. The project list supports empty, loading, and error states.

**Implementation tasks**
- Build the project list and creation form in Angular.
- Use Angular Reactive Forms for validation.
- Create `POST /api/projects` and `GET /api/projects`.
- Store project data in PostgreSQL.
- Add API validation and error handling in Node.js.

### US-02: View and manage projects
**Priority:** P0  
**As an** auditor, **I want to** view and manage my projects, **so that** I can quickly find the website I need to audit.

**Feature details**
- Display project name, website, number of audits, open findings, and last activity.
- Search by project name or website.
- Sort by name or recent activity.
- Open a project overview.
- Edit project details.

**Acceptance criteria**
1. Each project displays its key information.
2. Search results update based on the entered text.
3. Selecting a project opens its overview.
4. Projects with no audits display appropriate empty-state messaging.
5. API failures show a retry option.

---

## EPIC 2: Audit Lifecycle

### US-03: Create an audit
**Priority:** P0  
**As an** auditor, **I want to** create an audit for a project, **so that** I can evaluate a website at a particular point in time.

**Feature details**
- Select an existing project.
- Enter an audit name and target URL.
- Choose a testing scope: single page or a list of specified pages.
- Choose the WCAG target level: A, AA, or AAA.
- Record the applicable WCAG version.
- Set an initial status of Draft.
- Record who created the audit and when.

**Acceptance criteria**
1. An audit must belong to an existing project.
2. The target URL must be valid.
3. The selected WCAG version and level are stored with the audit.
4. A newly created audit appears in the project's audit history.
5. The user can reopen a draft and edit its configuration.
6. The app does not claim a website is compliant merely because an audit has been created.

### US-04: View audit details
**Priority:** P0  
**As an** auditor, **I want to** view audit results and metadata, **so that** I can understand the current state of the evaluation.

**Feature details**
- Show the target URL, creation date, status, WCAG target, and creator.
- Display findings grouped by severity and status.
- Show the number of pages assessed.
- Display the most recent execution time.
- Link each finding to its details.

**Acceptance criteria**
1. The audit page displays data belonging to the selected audit only.
2. Findings are grouped consistently.
3. Clicking a finding opens its detail view.
4. An audit with no findings is distinguished from an audit that has not been run.
5. An audit with failed or incomplete checks clearly displays its execution state.

### US-05: Track audit history
**Priority:** P1  
**As an** auditor, **I want to** review previous audit runs, **so that** I can compare results over time.

**Feature details**
- Store each execution as a separate audit run.
- Record the start time, completion time, outcome, and summary counts.
- Show changes in findings between runs.
- Preserve previous run results when a new run starts.

**Acceptance criteria**
1. Each run receives a unique identifier.
2. A failed run does not overwrite the previous successful results.
3. The history page displays each run's status and timestamp.
4. Comparisons distinguish newly detected, resolved, and recurring findings.
5. The app explains that changes in results may reflect website changes or differences in test coverage.

---

## EPIC 3: Accessibility Testing

### US-06: Run automated accessibility checks
**Priority:** P0  
**As an** auditor, **I want to** run automated accessibility checks on a target page, **so that** I can identify potential problems efficiently.

**Feature details**
- Start a browser-based test using Playwright.
- Integrate axe-core to identify supported accessibility violations.
- Record the tested URL, timestamp, execution status, and tool version.
- Capture rule identifiers, affected elements, and relevant DOM snippets.
- Show progress and a clear completion or failure state.
- Prevent accidental duplicate runs for the same audit if a run is already active.

**Acceptance criteria**
1. Only valid, permitted URLs can be tested.
2. The user can see whether a run is queued, running, completed, or failed.
3. Each detected violation includes a rule ID, description, impact where supplied, and affected elements.
4. A timeout or inaccessible page produces a clear error.
5. Results are persisted after completion.
6. Automated results are labelled as automated findings.
7. A successful scan is not presented as proof of full WCAG conformance.

**Implementation tasks**
- Build a Playwright worker or service on the backend.
- Integrate axe-core into the browser test.
- Define a normalized result model.
- Store runs and violations in PostgreSQL.
- Add execution limits, timeouts, and structured logs.

**Important engineering consideration:** Because users submit URLs for the server to visit, protect the scan service against SSRF. Block private and internal IP ranges, localhost, cloud metadata endpoints, unsafe redirects, and disallowed protocols. Revalidate destinations after DNS resolution and redirects. Restrict browser network access and execution time.

### US-07: Perform a manual keyboard-navigation check
**Priority:** P0  
**As an** auditor, **I want to** record keyboard-navigation checks, **so that** I can assess behavior that automated scanning may not fully evaluate.

**Feature details**
- Provide a manual checklist for Tab, Shift+Tab, Enter, Space, Escape, and arrow-key behavior where applicable.
- Record whether keyboard access works, fails, or was not tested.
- Add notes and affected page references.
- Record the auditor and review date.

**Acceptance criteria**
1. Each checklist item has a clear expected behavior.
2. The auditor can mark an item Pass, Fail, or Not tested.
3. Failed items can be converted into findings.
4. The system distinguishes manual results from automated results.
5. A partially completed checklist is not labelled as passed.

### US-08: Evaluate color contrast
**Priority:** P0  
**As an** auditor, **I want to** review text and interface color contrast, **so that** I can identify potential readability problems.

**Feature details**
- Record foreground and background colors.
- Calculate contrast ratios.
- Evaluate applicable WCAG contrast thresholds.
- Distinguish normal text, large text, and relevant non-text interface elements.
- Attach evidence or notes.

**Acceptance criteria**
1. Valid colors are accepted in supported formats such as hexadecimal RGB.
2. The ratio is calculated using WCAG relative luminance.
3. Text contrast results use the applicable threshold: generally 4.5:1 for normal text and 3:1 for large text under WCAG 2.x AA.
4. Relevant non-text contrast checks use their applicable criteria.
5. The result explains which threshold was used.
6. The feature does not claim to detect every contrast issue automatically.

### US-09: Check labels and accessible names
**Priority:** P0  
**As an** auditor, **I want to** inspect form controls and interactive elements, **so that** I can identify elements that may not have accessible names or instructions.

**Feature details**
- Identify common form controls that lack associated labels.
- Inspect accessible names and relevant ARIA attributes.
- Show the affected element and its location in the DOM.
- Allow the auditor to verify the issue manually.

**Acceptance criteria**
1. Supported automated rules are displayed with their source and rule ID.
2. The auditor can open the affected element's details.
3. The interface differentiates a confirmed violation from an item needing manual review.
4. The system does not assume that every visible label or accessible name is correct merely because one exists.

### US-10: Review focus order and focus visibility
**Priority:** P1  
**As an** auditor, **I want to** review focus order and visible focus indicators, **so that** keyboard users can understand where they are on the page.

**Feature details**
- Document unexpected focus order.
- Record elements that cannot be reached or skipped unintentionally.
- Record missing or insufficiently visible focus indicators.
- Attach screenshots and reproduction steps.

**Acceptance criteria**
1. The auditor can identify the relevant page and element.
2. Findings include expected and observed behavior.
3. Focus-order and focus-visibility findings can be tracked independently.
4. Results are not automatically marked as passing based solely on the presence of CSS focus styles.

---

## EPIC 4: Finding Management

### US-11: Create a finding manually
**Priority:** P0  
**As an** auditor, **I want to** create a finding, **so that** I can document accessibility problems discovered during testing.

**Feature details**
- Title and detailed description.
- Affected URL and DOM selector or element reference.
- Severity and status.
- WCAG criterion reference where applicable.
- Steps to reproduce.
- Expected and actual behavior.
- Suggested remediation.
- Source: automated, manual, or imported.
- Optional assignee.

**Acceptance criteria**
1. A finding requires a title, description, severity, and affected page.
2. The finding is linked to its audit and project.
3. Valid WCAG references can be associated with a finding.
4. The finding receives a unique ID.
5. The finding appears in the audit's findings list.
6. The system records who created the finding and when.

### US-12: Assign severity
**Priority:** P0  
**As an** auditor, **I want to** classify findings by severity, **so that** the team can prioritize remediation.

**Feature details**
- Use Critical, High, Medium, and Low as product-defined severity levels.
- Provide definitions for each level.
- Allow severity changes with an audit trail.
- Keep severity distinct from axe-core impact ratings.

**Acceptance criteria**
1. Every finding has one product-defined severity.
2. Changing severity updates the finding list and dashboard.
3. The change is recorded in the finding's history.
4. The interface explains that severity is a prioritization aid, not a formal WCAG conformance rating.

### US-13: Track finding status
**Priority:** P0  
**As a** developer, **I want to** update a finding's status, **so that** the team can track remediation progress.

**Feature details**
- New
- Confirmed
- In progress
- Fixed
- Retest required
- Closed
- Won't fix

**Acceptance criteria**
1. The initial status is New.
2. Status changes are recorded with the user and timestamp.
3. A Fixed finding can be moved to Retest required.
4. A finding is not automatically considered resolved merely because its status is changed to Fixed.
5. Closing a finding requires an appropriate reason or verification.
6. The Won't fix status supports a justification.

### US-14: Filter, search, and sort findings
**Priority:** P0  
**As an** auditor, **I want to** find specific findings quickly, **so that** I can focus on relevant issues.

**Feature details**
- Filter by severity, status, source, WCAG criterion, and assignee.
- Search by title, URL, and description.
- Sort by severity, creation date, and last update.
- Combine multiple filters.
- Reset filters.

**Acceptance criteria**
1. Filters can be combined.
2. The displayed results match the selected criteria.
3. A result count is visible.
4. Clearing filters restores the full authorized result set.
5. Empty search results display a useful message.

### US-15: Attach screenshots and evidence
**Priority:** P0  
**As an** auditor, **I want to** attach screenshots and supporting evidence, **so that** developers can reproduce and understand a finding.

**Feature details**
- Upload PNG, JPEG, or WebP screenshots.
- Add a caption and optional annotations.
- Associate evidence with a specific finding.
- Preview and remove attachments.
- Store evidence metadata and upload timestamps.

**Acceptance criteria**
1. Unsupported file types and oversized uploads are rejected.
2. Upload failures can be retried.
3. Only authorized users can access private evidence.
4. Filenames and file contents are handled safely.
5. The finding displays its evidence attachments.
6. Evidence can be included in an exported report when requested.

### US-16: Comment on findings
**Priority:** P1  
**As a** developer, **I want to** comment on findings, **so that** the team can discuss fixes and clarifications.

**Feature details**
- Add comments.
- Display author and timestamp.
- Edit or delete comments according to permissions.
- Preserve a record of relevant changes.

**Acceptance criteria**
1. Comments are associated with a finding.
2. Empty comments cannot be submitted.
3. Comments are displayed in chronological order.
4. Unauthorized users cannot edit another user's comments.
5. Comment content is safely rendered and cannot execute HTML or scripts.

---

## EPIC 5: Dashboard and Reporting

### US-17: View the audit dashboard
**Priority:** P0  
**As an** auditor, **I want to** see an overview of audit results, **so that** I can understand the state of accessibility work quickly.

**Feature details**
- Total audits and pages assessed.
- Total findings by severity.
- Open versus resolved findings.
- Recent activity.
- Findings requiring attention.
- Links to relevant audits and findings.

**Acceptance criteria**
1. Metrics are derived from persisted data.
2. Clicking a metric opens the corresponding filtered view.
3. An empty project displays a first-audit call to action.
4. Loading and API error states are handled.
5. Metrics are scoped to the user's authorized projects.

### US-18: Export an audit report
**Priority:** P0  
**As an** auditor, **I want to** export audit results, **so that** I can share findings with stakeholders.

**Feature details**
- Export to CSV for analysis and PDF for sharing.
- Include project and audit metadata.
- Include findings, severity, status, affected URLs, WCAG references, and remediation notes.
- Include run timestamps and scope.
- Optionally include screenshots.
- Display a limitation statement explaining the scope of automated and manual testing.

**Acceptance criteria**
1. The export contains only findings the user is authorized to access.
2. CSV values are escaped safely, including cells that could trigger spreadsheet formulas.
3. PDF output includes the report title, generation date, and audit scope.
4. Large exports provide clear progress or failure feedback.
5. Exported results match the selected audit and filters.
6. Reports do not claim full WCAG compliance without appropriate supporting evaluation.

### US-19: Compare audit runs
**Priority:** P1  
**As an** auditor, **I want to** compare two audit runs, **so that** I can measure whether accessibility issues are improving.

**Feature details**
- Show new, resolved, recurring, and unchanged findings.
- Compare finding counts by severity.
- Link to the original finding.
- Identify the runs being compared.

**Acceptance criteria**
1. The user can select two runs belonging to the same audit.
2. The comparison shows differences in counts and individual findings.
3. Matching uses stable rule and element information where possible.
4. Findings that cannot be matched confidently are labelled as uncertain rather than incorrectly declared resolved.

---

## EPIC 6: Quality, Security, and Reliability

### US-20: Authenticate users
**Priority:** P1  
**As a** user, **I want to** sign in securely, **so that** I can access my projects and findings.

**Feature details**
- Sign-in and sign-out.
- Secure password handling if using passwords.
- Session or token management.
- Authorization checks on protected APIs.
- Optional password reset.

**Acceptance criteria**
1. Unauthenticated requests cannot access protected data.
2. Passwords are never stored in plaintext.
3. The backend verifies authorization on every protected resource.
4. Users cannot access another project's data by changing an ID in a request.

### US-21: Maintain an audit trail
**Priority:** P1  
**As a** project owner, **I want to** see important changes, **so that** I can understand how audit findings evolved.

**Feature details**
- Record changes to status, severity, assignee, and relevant audit configuration.
- Store the actor, timestamp, and previous and new values.
- Provide a chronological history.

**Acceptance criteria**
1. Important updates produce history records.
2. History records are linked to the relevant project, audit, or finding.
3. Unauthorized users cannot alter the history.
4. Sensitive data is not unnecessarily recorded in logs.

### US-22: Test and deploy reliably
**Priority:** P0 for basic tests; P1 for full CI/CD  
**As a** developer, **I want to** verify application behavior automatically, **so that** changes do not break existing features.

**Feature details**
- Angular component and service tests.
- Node.js API tests.
- PostgreSQL integration tests.
- Playwright end-to-end tests.
- Accessibility checks on the application's own UI.
- CI pipeline for linting, testing, and building.

**Acceptance criteria**
1. Critical user workflows have automated tests.
2. Failed tests cause the CI pipeline to fail.
3. Database migrations can be applied in a reproducible environment.
4. Secrets are stored in environment configuration, not committed to Git.
5. The deployment process and required environment variables are documented.

---

# Suggested Definition of Done

A user story is complete when:

- [ ] The UI supports loading, success, empty, and error states as applicable.
- [ ] Client-side and server-side validation are implemented.
- [ ] Authorization and data ownership are checked where relevant.
- [ ] Data persists correctly in PostgreSQL when applicable.
- [ ] Tests cover the main success path and important failure cases.
- [ ] Keyboard navigation and accessible names work in the new UI.
- [ ] The feature is documented in the README.
- [ ] The change is committed and the build passes.
