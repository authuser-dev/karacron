export const terms = `
## Terms and Conditions

**Last updated: May 2, 2026**

Please read these Terms and Conditions carefully before using Kara. By accessing or using the application, you agree to be bound by these terms. If you do not agree with any part, you may not use the service.

## 1. Acceptance of Terms

By installing, accessing, or using Kara ("the Application", "the Service"), you confirm that you are at least 16 years of age, have read and understood these Terms, and agree to be legally bound by them. If you are using Kara on behalf of an organization, you represent that you have authority to bind that organization to these Terms.

## 2. Description of Service

Kara is a **local-first AI assistant** that runs primarily on your device. Your conversations, learned context, and configuration are stored locally. Kara may optionally connect to third-party AI providers (such as Anthropic or OpenAI) only when you explicitly configure an API key for those services.

## 3. License and Permitted Use

Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use Kara for your personal or internal business purposes.

You agree **not** to:

- Reverse-engineer, decompile, or disassemble any part of the Application
- Use the Service for any unlawful, fraudulent, or malicious purpose
- Attempt to gain unauthorized access to any system or network
- Redistribute, sublicense, or sell the Application without express written permission
- Use automated tools to scrape or extract data from the Service

## 4. User Accounts and Security

You are solely responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

Kara stores sensitive credentials (API keys, tokens) exclusively in your operating system's native keychain (macOS Keychain, Linux Secret Service, Windows Credential Manager). We never store secrets in plaintext.

## 5. Third-Party AI Providers

When you configure a cloud AI provider (Anthropic, OpenAI, Google, etc.), your messages and relevant context will be transmitted to that provider to generate responses. This transmission is subject to the **privacy policy and terms of service of that third-party provider**, not Kara's.

You acknowledge that Kara is not responsible for the data practices of third-party AI providers. If you prefer that no data leave your device, you may configure Kara to use a local AI model exclusively.

## 6. Intellectual Property

All rights, title, and interest in and to the Service (excluding user-generated content) are and will remain the exclusive property of Kara and its licensors. Nothing in these Terms grants you a right to use any trademark, service mark, logo, or trade name.

## 7. Disclaimer of Warranties

The Service is provided on an **"AS IS" and "AS AVAILABLE"** basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.

We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.

## 8. Limitation of Liability

To the maximum extent permitted by applicable law, Kara and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Service.

In no event shall our total liability to you exceed the amount you paid for the Service in the twelve (12) months preceding the claim.

## 9. Termination

We reserve the right to suspend or terminate your access to the Service at any time, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.

Upon termination, the license granted herein will automatically expire. Provisions that by their nature should survive termination (including but not limited to ownership provisions, warranty disclaimers, and limitations of liability) shall survive.

## 10. Governing Law

These Terms shall be governed by and construed in accordance with applicable law, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved through good-faith negotiation before resorting to formal legal proceedings.

## 11. Changes to Terms

We may revise these Terms at any time by posting an updated version within the Application. Material changes will be notified via in-app notification. Your continued use of the Service after changes become effective constitutes acceptance of the revised Terms.

## 12. Contact

If you have any questions about these Terms, please reach out through the official Kara support channels.
`;

export const privacy = `
## Data Usage Policy

**Last updated: May 2, 2026**

Your privacy is a fundamental principle of Kara, not an afterthought. Kara is built **local-first**: your data lives on your device by default. This policy explains exactly what data we handle, how, and why.

## 1. Our Core Principle

Kara operates on a strict **opt-in** model. Nothing is shared with external services without your explicit, prior authorization. We collect the minimum data necessary to operate the Service.

## 2. Data Stored Locally on Your Device

The following data is stored **exclusively on your device** and never transmitted to Kara's servers:

- **Conversation history** — all messages and context, stored in a local SQLite database
- **Learned memory and facts** — contextual information the assistant learns about you
- **User configuration** — preferences, settings, and application state
- **API keys and tokens** — stored in your operating system's native keychain (encrypted)
- **Local AI models** — model binaries downloaded to your local storage
- **Skills and plugins** — installed locally under your control

## 3. Data That May Leave Your Device

Kara may transmit data outside your device only in the following explicitly opt-in scenarios:

**3.1 Cloud AI Provider Requests**

If you configure a cloud AI provider (Anthropic, OpenAI, Google, etc.), the content of your messages and a minimal relevant context window will be sent to that provider to generate responses. This is necessary for the AI functionality to work. This data is subject to the **privacy policy of the respective provider**.

**3.2 External Skill Integrations**

If you install a skill that connects to an external service (e.g. Telegram, GitHub, Notion), only the data strictly necessary for that skill's function will be transmitted to that service. You must explicitly install and configure each skill, providing the required credentials.

**3.3 Anonymous Update Checks**

If enabled (disabled by default), Kara may contact update servers to check for new versions. This request contains only your current Kara version and platform (e.g. macOS, Windows). No personal data, conversation content, or configuration is included.

## 4. Data We Do Not Collect

Kara does **not** collect or transmit:

- Your full conversation history to our servers
- Files or code you interact with
- Your location
- Behavioral analytics or usage telemetry (unless explicitly opted in)
- Any data for advertising purposes

## 5. Security

We apply industry-standard security practices:

- **Secrets (API keys, tokens)** are stored exclusively in the OS native keychain — never in plaintext
- **Local database** is accessible only by the Kara daemon process (file permissions 600)
- **Network communication** with local daemon occurs only via loopback (localhost), never exposed to the network
- **Encryption at rest** for sensitive configuration is available as an opt-in setting

## 6. Data Retention and Deletion

Local data is retained indefinitely unless you choose to delete it. You have full control:

- Delete individual sessions from account settings
- Purge all local data at any time
- Export your data before deletion

Data transmitted to third-party AI providers is subject to **their** retention policies.

## 7. Your Rights

Depending on your jurisdiction, you may have rights including access to your data, correction, deletion, and portability. Since most data is stored locally, you can exercise these rights directly from the application at any time.

## 8. Changes to This Policy

If we make material changes to this policy, we will notify you via an in-app notice before the change takes effect. Continued use of the Service after the effective date constitutes acceptance.

## 9. Contact

For privacy-related questions or requests, please contact us through the official Kara support channels.
`;
