# Runner sign in

Runners authenticate with employee ID and a demo PIN before zone check-in and the order queue.

## Sub-features

- `credentials-form` collects employee ID and PIN.
- `demo-pin` accepts PIN `1234` for any non-empty employee ID.
- `redirect-check-in` navigates to zone check-in on success.

## How to get to it (user POV)

- Open `http://127.0.0.1:3001/login` (or open Runner root and follow auth redirect).
- Enter employee ID and PIN, tap **Continue**.

## Driving it with Playwright

Preconditions:

- Runner app running on `:3001` (`pnpm dev:runner`).
- Fresh browser context (no prior runner session).

- **Open login.** `page.goto('http://127.0.0.1:3001/login')`. Heading **Sign in** is visible.
- **Invalid attempt.** Leave fields empty or wrong PIN, click **Continue**. Error copy mentions demo PIN `1234`.
- **Valid login.** Fill employee ID `R-1042`, PIN `1234`, click **Continue**. URL becomes `/check-in`; heading **Zone check-in** appears.
- **Proof.** Screenshot includes **StadiYums Runner** eyebrow and **Zone check-in** heading.

## Gotchas

- Auth is client-side scaffold only — no Convex credential check.
- PIN must be exactly `1234` (trimmed).
- Employee ID must be non-empty after trim.
