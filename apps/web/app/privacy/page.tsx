import * as React from "react";

export default function PrivacyPage() {
  return (
    <>
      <main className="container mx-auto max-w-screen px-7 py-12 sm:py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-4">
            Last Updated: October 20, 2025
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert mx-auto max-w-none">
          <h2 className="text-bold text-lg lg:text-xl">
            1. Information We Collect
          </h2>
          <p className="mb-5">
            We collect information you provide directly to us, such as when you
            create an account, fill out a form, or communicate with us. This may
            include your name, email address, and other personal details. We
            also collect technical information automatically, such as your IP
            address and browsing behavior, through cookies and similar
            technologies.
          </p>

          <h2 className="text-bold text-lg lg:text-xl">
            2. How We Use Your Information
          </h2>
          <p className="mb-1">We use the information we collect to:</p>
          <ol className="mb-5">
            <li>Provide, maintain, and improve our services.</li>
            <li>Process transactions and send you related information.</li>
            <li>Communicate with you about products, services, and events.</li>
            <li>
              Monitor and analyze trends, usage, and activities in connection
              with our services.
            </li>
          </ol>

          <h2 className="text-bold text-lg lg:text-xl">
            3. How We Share Your Information
          </h2>
          <p className="mb-5">
            We do not sell your personal information. We may share information
            with vendors, consultants, and other service providers who need
            access to such information to carry out work on our behalf. We may
            also share information in response to a legal request if we believe
            disclosure is in accordance with, or required by, any applicable law
            or legal process.
          </p>

          <h2 className="text-bold text-lg lg:text-xl">4. Your Choices</h2>
          <p>
            You may update, correct, or delete information about you at any time
            by logging into your account. You can also opt out of receiving
            promotional communications from us by following the instructions in
            those communications.
          </p>
        </div>
      </main>
    </>
  );
}
