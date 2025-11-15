# Contributing Guidelines
Hey, **Frontend Engineer!** We’re thrilled to have you contribute to Open School Portal.
We value **collaboration, clarity, and high-quality code**. Please review these guidelines to ensure a smooth contribution process.
---
## Table of Contents
* [How to Contribute](#how-to-contribute)
* [Pull Request Process](#pull-request-process)
* [Commit Message Guidelines](#commit-message-guidelines)
* [Coding Standards](#coding-standards)
* [Issue Reporting](#issue-reporting)
* [Branching Model](#branching-model)
* [Testing](#testing)
* [Documentation](#documentation)
* [Additional Resources](#additional-resources)
---
## 1. How to Contribute
We welcome contributions in many forms:
* **Bug Reports:** Submit detailed issues if you encounter a bug (e.g., wallet funding errors, referral system not tracking, etc.).
* **Feature Requests:** Suggest enhancements (like new payment integrations or property filters).
* **Code Contributions:** Fix bugs or implement new features across domains (auth, broker, payment, property, etc.).
* **Documentation:** Improve our docs, folder structure explanations, or onboarding guides.
:warning: For significant changes, please open an **issue** first to discuss your idea with the team.
---
## 2. Pull Request Process
* **Base Branch:** Always branch off `dev`. PRs must be raised against `dev`, never against `main`.
* **Small, Focused Changes:** Each PR should solve one issue or implement one feature (e.g., "Add OTP verification UI").
* **Clear Title & Summary:** Use descriptive titles and explain your changes, rationale, and testing steps.
* **Follow Feedback:** Address review comments and update your PR accordingly.
* **CI/CD Compliance:** Ensure linting, formatting, and tests pass before submission.
:warning: Only the **project lead** can merge `dev → main` once stability is verified.
---
## 3. Commit Message Guidelines
We follow the **Conventional Commits** specification:
**Format:**
```
<type>(<scope>): <description>
```
**Types:**
* `feat` → New feature (e.g., installment tracking)
* `fix` → Bug fix (e.g., wallet balance mismatch)
* `docs` → Documentation changes
* `style` → Code style changes (formatting, UI tweaks)
* `refactor` → Code refactoring without feature/bug changes
* `test` → Adding/updating tests
* `chore` → Build process, tools, dependencies
**Examples:**
```
feat(auth): implement OTP verification for registration
fix(payment): correct wallet balance after withdrawal
docs(readme): update contribution steps
```
---
## 4. Coding Standards
* **Consistency:** Follow the existing folder structure (`auth/`,  `dashboard/`, etc.).
* **Linting & Formatting:** Code must pass **ESLint + Prettier** before committing.
* **Readability:** Write clean, maintainable, and well-documented code.
* **Security:** Always prioritize **secure coding practices**, especially around authentication and payments.
---
## 5. Issue Reporting
When reporting an issue:
1. Provide a clear description (e.g., "Wallet not updating after auto-withdrawal").
2. Include **steps to reproduce**.
3. Add screenshots or logs where relevant.
4. Suggest potential fixes if possible.
---
## 6. Branching Model
* **Feature Branches:** `feature/<short-description>`
* **Bugfix Branches:** `fix/<short-description>`
* **Hotfix Branches:** Reserved for **urgent fixes** directly on `main` (lead only).
**Examples:**
```
feature/explore-fees-listings
fix/fix-auto-withdrawal-error
```
Regularly pull from `dev` to keep your branch updated.
---
## 7. Testing
* **Automated Tests:** Add/update tests for new features or bug fixes.
* **Local Testing:** Run all tests locally before PR submission.
* **Manual Verification:** Confirm functionality across relevant browsers/devices (especially for payment flows).
---
## 8. Documentation
* Update **README.md** or add documentation when adding/modifying features.
* Add **inline comments** in code where clarity is needed.
* For major features (e.g., Explore Feature, Commission Tracking), update the docs in the respective domain folder.
---
## 9. Additional Resources
* [The Art of Pull Requests](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
* [Conventional Commits](https://www.conventionalcommits.org/)
* [Grundpay Product Overview](./README.md)
---
Thank you for contributing to **Open School Portal** and helping us build a reliable fintech solution for installment payments and property management.