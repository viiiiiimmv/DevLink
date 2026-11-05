export interface LegalSection {
  id: string
  title: string
  content: string[]
  subsections?: { title: string; content: string[] }[]
}

export interface LegalDocument {
  title: string
  lastUpdated: string
  intro: string
  sections: LegalSection[]
}

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: 'November 4, 2026',
  intro:
    'DevLink ("we", "our", or "us") provides a developer portfolio builder and collaboration platform. This Privacy Policy outlines how we collect, use, store, and protect your personal data in accordance with applicable data protection laws, including the Digital Personal Data Protection Act, 2023. We are committed to transparency, data minimisation, and giving you full agency over your information.',
  sections: [
    {
      id: 'data-fiduciary',
      title: '1. Data Fiduciary and Contact Details',
      content: [
        'The Data Fiduciary responsible for determining the purposes and means of processing your personal data is:',
        'Entity Name: VIII.III.MMV LABS',
        'Registered Address: [Office / Building Name, Street Address, City, State, PIN Code, India]',
        'Official Email: [privacy@devlink.me]',
        'For any inquiries or privacy-related questions, you may reach out directly to our designated team at the email above.',
      ],
    },
    {
      id: 'itemised-notice',
      title: '2. Itemised Notice: Personal Data Collected and Specific Purposes',
      content: [
        'We collect only the personal data strictly required to deliver DevLink’s services. Each category of data and its explicit purpose is set out below:',
      ],
      subsections: [
        {
          title: 'A. Account Registration & Authentication Data',
          content: [
            'Data items: Full name, primary email address, profile picture URL, and third-party account identifier.',
            'Source: Provided directly by you when authenticating via third-party OAuth providers (Google LLC or GitHub Inc.).',
            'Specific purpose: To authenticate your identity, create and maintain your account session, and prevent unauthorised account access.',
          ],
        },
        {
          title: 'B. Public Developer Profile Information',
          content: [
            'Data items: Chosen username (/yourname), display name, biographical text, technical skills, employment history, education, project details, personal links (GitHub, LinkedIn, personal website), and availability status.',
            'Source: Entered directly by you in the DevLink dashboard or optionally imported via our GitHub integration.',
            'Specific purpose: To assemble, render, and host your public-facing developer portfolio page according to your chosen layout and theme.',
          ],
        },
        {
          title: 'C. GitHub Repository Metadata (Optional Import)',
          content: [
            'Data items: Public repository names, descriptions, primary programming languages, stargazers count, repository topics, and commit count.',
            'Source: Pulled from the public GitHub API upon your explicit request.',
            'Specific purpose: To populate the projects and showcase blocks of your portfolio without requiring manual data entry.',
          ],
        },
        {
          title: 'D. Inquiries and Messaging Communications',
          content: [
            'Data items: Sender name, sender email address, message subject, inquiry text, and timestamps.',
            'Source: Provided by visitors submitting contact inquiries on your public portfolio, or exchanged via SparkForge spark requests.',
            'Specific purpose: To deliver and record inbound inquiries to your private dashboard inbox.',
          ],
        },
        {
          title: 'E. Technical Session & Security Data',
          content: [
            'Data items: IP address, browser user-agent string, cryptographic session tokens, and interface preferences (such as dark/light mode preference).',
            'Source: Automated transmission by your browser during authenticated web requests.',
            'Specific purpose: To maintain secure authenticated sessions, protect against cross-site request forgery (CSRF), and persist your UI theme preferences.',
          ],
        },
      ],
    },
    {
      id: 'lawful-basis',
      title: '3. Lawful Basis for Processing: Consent',
      content: [
        'We process your personal data based on your free, specific, informed, unconditional, and unambiguous consent, indicated through a clear affirmative action (such as checking an unchecked consent box or clicking an explicit authentication prompt).',
        'We do not use pre-ticked checkboxes or bundled consent. Access to our core portfolio service is never conditioned on consent to processing data that is not necessary for that service.',
      ],
    },
    {
      id: 'data-minimisation',
      title: '4. Data Minimisation and Purpose Limitation',
      content: [
        'We collect only the minimum personal data necessary to operate your portfolio, manage collaboration ideas on SparkForge, and relay inquiries.',
        'We do not sell, rent, or trade your personal data. Your data is used exclusively for the purposes specified in this notice and will not be repurposed without obtaining your refreshed consent.',
      ],
    },
    {
      id: 'withdrawing-consent',
      title: '5. Withdrawing Your Consent',
      content: [
        'You have the right to withdraw your consent to data processing at any time. Withdrawing consent is as easy as giving it.',
        'You may withdraw consent by navigating to Dashboard > Settings > Privacy and clicking "Withdraw Consent & Delete Account", or by contacting [privacy@devlink.me].',
        'Consequences of withdrawal: Upon receiving your withdrawal, we will cease processing your data and erase your account, unpublishing your portfolio link within 30 business days, except where retention is mandated by law.',
      ],
    },
    {
      id: 'data-principal-rights',
      title: '6. Rights of the Data Principal',
      content: [
        'As a Data Principal, you are entitled to the following rights under applicable law:',
        '• Right to Access: You may request a plain-language summary of your personal data being processed and the identities of any data processors who have received it.',
        '• Right to Correction and Updating: You may update or correct inaccurate, incomplete, or out-of-date personal data directly through your dashboard settings at any time.',
        '• Right to Erasure: You may request the deletion of your personal data when the purpose for which it was collected is satisfied or upon withdrawal of consent.',
        '• Right of Grievance Redressal: You have access to a straightforward mechanism to address any grievance with us regarding data handling.',
        '• Right to Nominate: You may nominate any individual to exercise your data principal rights in the event of your death or incapacity, by writing to our Grievance Officer.',
        'To exercise any of these rights, email [grievance@devlink.me]. We will review and fulfill verified requests within thirty (30) days.',
      ],
    },
    {
      id: 'retention',
      title: '7. Retention and Erasure of Personal Data',
      content: [
        'We retain your personal data only for as long as your account remains active or as needed to provide you with the DevLink platform.',
        'When you delete your account, your profile data, project imports, and inbox messages are permanently deleted from our active databases. Encrypted system backups rotate and overwrite within 30 days.',
      ],
    },
    {
      id: 'security-safeguards',
      title: '8. Technical and Organisational Security Measures',
      content: [
        'We implement reasonable technical and organisational security safeguards to prevent unauthorised access, alteration, disclosure, or destruction of personal data:',
        '• Transport Encryption: All communications are encrypted in transit using industry-standard TLS (HTTPS).',
        '• Cryptographic Tokens: Sessions use secure, HTTP-only, SameSite-restricted JSON Web Tokens (JWT) signed with secret keys.',
        '• Role-Based Access: Database access is strictly restricted to verified production services with IP whitelisting.',
        '• Environment Isolation: Production environment secrets and credentials are isolated from source code repositories.',
      ],
    },
    {
      id: 'breach-notification',
      title: '9. Personal Data Breach Notification',
      content: [
        'In the event of a personal data breach affecting your information, we are committed to promptly assessing the incident and notifying the Data Protection Board of India and affected users in the form and manner prescribed by law, without undue delay.',
      ],
    },
    {
      id: 'children',
      title: '10. Protection of Children',
      content: [
        'DevLink is not directed at or designed for individuals under eighteen (18) years of age without verifiable consent from a parent or legal guardian.',
        'We do not knowingly collect personal data from minors, nor do we perform any tracking, behavioural monitoring, or targeted advertising directed at children.',
        'If we become aware that personal data of a minor has been collected without parental consent, we will delete that data immediately.',
      ],
    },
    {
      id: 'third-parties',
      title: '11. Third Parties and Data Processors',
      content: [
        'We engage trusted third-party service providers (Data Processors) to assist in operating DevLink. Each processor operates under strict data protection agreements:',
        '• Hosting & Edge Delivery: Vercel Inc. (hosts our Next.js application at global edge locations).',
        '• Database Infrastructure: MongoDB Atlas (MongoDB Inc., provides encrypted database storage).',
        '• Media & Asset Hosting: Cloudinary Inc. (stores user-uploaded avatar images and project screenshots).',
        '• Transactional Email: SMTP service provider (relays contact inquiries and account verification notices).',
        '• Authentication Providers: Google LLC and GitHub Inc. (verify user credentials during login).',
      ],
    },
    {
      id: 'cross-border-transfer',
      title: '12. Cross-Border Data Transfers',
      content: [
        'Your personal data may be stored and processed on secure cloud infrastructure hosted in regions outside of India (such as AWS and Vercel cloud regions).',
        'Any cross-border transfer of personal data is carried out strictly in compliance with applicable law and subject to rigorous security and contractual safeguards.',
      ],
    },
    {
      id: 'cookies-localstorage',
      title: '13. Cookies and Local Storage',
      content: [
        'DevLink uses only strictly necessary cookies and local storage items required for basic functionality:',
        '• next-auth.session-token: An HTTP-only session cookie used to authenticate your account. It expires upon logout.',
        '• next-auth.csrf-token: A cryptographic cookie used to protect against Cross-Site Request Forgery attacks.',
        '• theme: A local storage key used to remember your preferred visual appearance (dark, light, or system).',
        'We do not use tracking cookies, behavioural advertising beacons, or third-party marketing pixels.',
      ],
    },
    {
      id: 'grievance-officer',
      title: '14. Grievance Redressal Mechanism',
      content: [
        'If you have any questions, concerns, or grievances regarding our data practices or wish to exercise your data principal rights, you may contact our designated Grievance Officer:',
        'Grievance Officer: [Grievance Redressal Officer Name]',
        'Designation: [Data Privacy & Compliance Lead]',
        'Email: [grievance@devlink.me]',
        'Postal Address: [Office / Building Name, City, State, PIN Code, India]',
        'Response Timeframe: We will acknowledge your grievance within forty-eight (48) hours and work to resolve the matter within thirty (30) days.',
        'If you are unsatisfied with our resolution, you have the statutory right to escalate the matter to the Data Protection Board of India.',
      ],
    },
    {
      id: 'user-duties',
      title: '15. Duties of the User',
      content: [
        'As a user of DevLink, you agree to comply with your statutory duties:',
        '• Provide true, accurate, and complete information when registering and managing your profile.',
        '• Do not impersonate any person or represent yourself as an affiliate of an entity without authorization.',
        '• Do not file false or frivolous complaints or grievances.',
      ],
    },
    {
      id: 'policy-changes',
      title: '16. Changes to this Privacy Policy',
      content: [
        'We may periodically update this Privacy Policy to reflect enhancements to our services or changes in legal requirements.',
        'When material changes are made, we will notify you by updating the "Last updated" date at the top of this document, and where required, we will seek your refreshed consent prior to applying new processing terms.',
      ],
    },
    {
      id: 'language-accessibility',
      title: '17. Language and Alternative Accessibility',
      content: [
        'This Privacy Policy is written in English. Upon request, an accessible copy of this notice may be made available in any language specified in the Eighth Schedule to the Constitution of India.',
        'To request a translated or accessible copy, please contact our team at [privacy@devlink.me].',
      ],
    },
  ],
}

export const TERMS_AND_CONDITIONS: LegalDocument = {
  title: 'Terms & Conditions',
  lastUpdated: 'November 4, 2026',
  intro:
    'These Terms & Conditions ("Terms") govern your access to and use of the DevLink website, services, and applications (collectively, the "Platform"). By creating an account or accessing the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.',
  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: [
        'By signing in, accessing, or using DevLink, you enter into a legally binding agreement with VIII.III.MMV LABS ("[DevLink]", "we", "us", or "our"). If you do not agree with any part of these Terms, you must not access or use the Platform.',
      ],
    },
    {
      id: 'eligibility',
      title: '2. Eligibility and Age Requirements',
      content: [
        'You must be at least eighteen (18) years of age to register for an account on DevLink.',
        'If you are under 18 years of age, you may use the Platform only with the verifiable involvement, guidance, and consent of a parent or legal guardian who agrees to be bound by these Terms.',
      ],
    },
    {
      id: 'account-responsibilities',
      title: '3. Account Registration & Security',
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials, sessions, and any security PINs you configure.',
        'You agree to notify us immediately at [security@devlink.me] if you suspect any unauthorised access to your account.',
        'You are solely responsible for all activities and public portfolio content published under your account handle.',
      ],
    },
    {
      id: 'acceptable-use',
      title: '4. Acceptable Use and Community Standards',
      content: [
        'When using DevLink, you agree that you will not:',
        '• Publish misleading, false, defamatory, infringing, or unlawful content in your portfolio, projects, or SparkForge posts.',
        '• Impersonate other developers, engineers, or companies.',
        '• Use automated scrapers, spiders, or bots to harvest data from our directory or user portfolios without permission.',
        '• Attempt to bypass or probe our security boundaries, rate limits, or network access controls.',
        '• Send unsolicited advertising, spam, or phishing messages via our portfolio inquiry forms.',
      ],
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property Rights',
      content: [
        '• Your Content: You retain full ownership and intellectual property rights in the code, text, images, and projects you showcase on your portfolio.',
        '• License to DevLink: By publishing content on DevLink, you grant us a worldwide, non-exclusive, royalty-free license solely to host, render, format, and display your public portfolio on the Platform as configured by you.',
        '• Platform IP: The DevLink name, logo, user interface designs, templates, software, and brand assets are the exclusive property of DevLink and its licensors.',
      ],
    },
    {
      id: 'third-party-integrations',
      title: '6. Third-Party Integrations and Services',
      content: [
        'DevLink allows you to connect third-party platforms, such as GitHub and Google. Your use of these third-party platforms is subject to their respective terms of service and privacy notices.',
        'We are not responsible or liable for any interruptions, changes, or policies enforced by third-party API providers.',
      ],
    },
    {
      id: 'disclaimers',
      title: '7. Disclaimers and Limitation of Liability',
      content: [
        'The Platform is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.',
        'We do not guarantee uninterrupted, bug-free, or error-free availability of the Platform or that portfolios will achieve specific employment or freelance outcomes.',
        'To the fullest extent permitted by applicable law, DevLink shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Platform.',
      ],
    },
    {
      id: 'termination',
      title: '8. Account Suspension and Termination',
      content: [
        'You may delete your account and unpublish your portfolio at any time via your dashboard settings.',
        'We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or create security risks for other users.',
      ],
    },
    {
      id: 'governing-law',
      title: '9. Governing Law and Jurisdiction',
      content: [
        'These Terms and any disputes arising out of or related to them shall be governed by and construed in accordance with the laws of the Republic of India.',
        'Subject to the statutory dispute resolution mechanisms provided under applicable data protection laws, the competent courts located in [Bengaluru / New Delhi / Mumbai, India] shall have exclusive jurisdiction over all legal disputes arising under these Terms.',
      ],
    },
    {
      id: 'changes-to-terms',
      title: '10. Changes to these Terms',
      content: [
        'We may modify these Terms periodically. Notice of material changes will be given by updating the date on this page and through our website interface.',
        'Continued use of the Platform after the effective date of updated Terms constitutes your acceptance of the revised Terms.',
      ],
    },
    {
      id: 'contact',
      title: '11. Contact Information',
      content: [
        'If you have any questions or feedback regarding these Terms, please contact us at:',
        'Email: [legal@devlink.me]',
        'Address: [VIII.III.MMV LABS, Office Address, City, State, PIN Code, India]',
      ],
    },
  ],
}

