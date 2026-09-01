# Runner sign in

Runners authenticate with employee ID and demo PIN before zone check-in.

## Sub-features

- `credentials-form` collects employee ID and PIN.
- `demo-pin` accepts PIN `1234` for any non-empty employee ID.
- `redirect-check-in` navigates to `/check-in` on success.

## How to get to it (user POV)

- Open `http://127.0.0.1:3001/login`.
- Enter credentials, tap **Continue**.

## Driving it with Playwright

Preconditions:

- Runner on `:3001`, fresh browser context.

- **Open login.** Heading **Sign in** visible.
- **Invalid.** Wrong PIN → **Check your Employee ID and PIN, then try again.**
- **Valid.** `R-1042` + `1234` → **Zone check-in** heading.
- **Proof.** Screenshot shows **StadiYums Runner** eyebrow.

## Gotchas

- Client-side scaffold only — no database credential check.
- PIN must be exactly `1234` after trim.
