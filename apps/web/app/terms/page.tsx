import * as React from "react";

export default function TermsPage() {
  return (
    <>
      <main className="container mx-auto max-w-screen px-7 py-12 sm:py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mt-4">
            Last Updated: October 20, 2025
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert mx-auto max-w-none">
          <h2 className="text-bold text-lg lg:text-xl">1. Introduction</h2>
          <p className="mb-5">
            Welcome to Starty SCPI ("we," "us," or "our"). These Terms of
            Service ("Terms") govern your use of our website and the services we
            offer. By accessing or using our services, you agree to be bound by
            these Terms.
          </p>

          <h2 className="text-bold text-lg lg:text-xl">
            2. Use of Our Services
          </h2>
          <p className="mb-4">
            You must be at least 18 years old to use our services. You agree to
            use our services only for lawful purposes and in accordance with
            these Terms. You are responsible for any activity that occurs
            through your account.
          </p>

          <h2 className="text-bold text-lg lg:text-xl">
            3. Investment Disclaimers
          </h2>
          <p className="mb-5">
            Starty SCPI provides information and tools for educational purposes
            only. We are not a financial advisor. All investments, including
            SCPIs, carry risks. Past performance is not indicative of future
            results. You should consult with a qualified financial professional
            before making any investment decisions.
          </p>

          <h2 className="text-bold text-lg lg:text-xl">
            4. Intellectual Property
          </h2>
          <p className="mb-5">
            All content on our website, including text, graphics, logos, and
            software, is the property of Starty SCPI or its licensors and is
            protected by intellectual property laws.
          </p>

          <h2 className="text-bold text-lg lg:text-xl">
            5. Limitation of Liability
          </h2>
          <p className="mb-5">
            To the fullest extent permitted by law, Starty SCPI shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly.
          </p>

          <h2 className="text-bold text-lg lg:text-xl">
            6. Changes to These Terms
          </h2>
          <p className="mb-5">
            We reserve the right to modify these Terms at any time. We will
            notify you of any changes by posting the new Terms on this page.
            Your continued use of the service after any such change constitutes
            your acceptance of the new Terms.
          </p>
        </div>
      </main>
    </>
  );
}
