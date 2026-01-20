"use client";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { TopBanner } from "@/components/site/top-banner";
import { useBannerVisibility } from "@/components/site/top-banner";


export default function PrivacyPolicy() {
    const isBannerVisible = useBannerVisibility();
  
  return (
    <div className="min-h-screen">
      <TopBanner />
      <SiteHeader />
      
      <main className={`${isBannerVisible ? 'mt-28 sm:my-14' : 'mt-0 sm:my-4'} pt-32 pb-16 px-4`}>
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-neutral-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200">
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  1. Introduction
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Welcome to Kallix. This Privacy Policy explains how Kallix (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, uses, discloses, and protects information that applies to our Service, and your choices about the collection and use of your information. This policy applies to visitors of our website https://kallix.in/ (&ldquo;Website&rdquo;) and to the end-users (&ldquo;Client&apos;s Customers&rdquo;) of our clients (&ldquo;Clients&rdquo;) who use our bespoke AI Voice Agent services (&ldquo;Service&rdquo;).
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  2. Our Role: Data Controller vs. Data Processor
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>It is important to understand our role concerning your data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We act as a <strong>Data Controller</strong> for the information we collect from our Website visitors and direct Clients.</li>
                    <li>We act as a <strong>Data Processor</strong> for the information we process on behalf of our Clients through our AI Voice Agent Service. Our Clients are the Data Controllers for this information.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  3. Information We Collect
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    a) Information You Provide to Us Directly (As a Website Visitor or Client):
                  </h3>
                  <p>We collect Personal Data from you when you voluntarily provide it, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Request a Demo or Strategy Call:</strong> We collect your name, email address, phone number, company website, and your stated automation needs (e.g., &ldquo;Real Estate Lead Qualification&rdquo;).</li>
                    <li><strong>Contact Us:</strong> We collect your contact details and the content of your message via email, WhatsApp, or other communication channels.</li>
                    <li><strong>Become a Client:</strong> We collect business contact information, billing details, and information required for service configuration and integration.</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">
                    b) Information We Collect Automatically:
                  </h3>
                  <p>When you visit our Website, we may collect certain information automatically from your device using cookies and similar tracking technologies. This includes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Usage Data:</strong> Your IP address, browser type, device information, pages viewed, and the duration of your visit. This helps us understand user behavior and improve our Website.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 mt-6">
                    c) Information We Process on Behalf of Our Clients (As a Data Processor):
                  </h3>
                  <p>When our AI Voice Agents interact with our Client&apos;s Customers, we process data as instructed by our Client. This may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Contact Details:</strong> Phone numbers of the Client&apos;s Customers.</li>
                    <li><strong>Conversation Data:</strong> Call recordings and transcripts of conversations between the AI Voice Agent and the Client&apos;s Customer. This data may contain any personal information the end-user voluntarily shares during the call.</li>
                    <li><strong>Client-Provided Data:</strong> Any other information our Client provides to us for the purpose of the Service, such as customer names or booking details.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  4. How We Use Your Information
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>To Provide and Manage Our Service:</strong> We use the information you provide to respond to your inquiries, schedule demos, set up and manage your account, process payments, and provide customer support.</li>
                    <li><strong>To Communicate With You:</strong> To send you service-related updates, invoices, and marketing communications (where you have consented).</li>
                    <li><strong>To Fulfill Our Service Obligations to Clients:</strong> We use Conversation Data strictly to operate the AI Voice Agent as instructed by our Client and to provide them with analytics and call records.</li>
                    <li><strong>To Improve Our AI Models and Service:</strong> We may use anonymized and aggregated Conversation Data to analyze, improve, and train our AI models and overall Service. This data will not be traceable to any individual or Client.</li>
                    <li><strong>For Analytics and Website Improvement:</strong> To understand how our Website is used and to improve its functionality and user experience.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  5. How We Share Your Information
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>We do not sell your Personal Data. We may share information with third parties under the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> With third-party vendors and partners who provide services on our behalf, such as cloud hosting (e.g., AWS/Google Cloud), CRM systems (e.g., HubSpot), and payment processors.</li>
                    <li><strong>As Instructed by Our Clients:</strong> We provide our Clients with access to the Conversation Data related to their use of our Service.</li>
                    <li><strong>For Legal Reasons:</strong> If required by law, subpoena, or other legal process, or if we have a good faith belief that disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  6. Data Security
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your Personal Data from accidental or unlawful destruction, loss, alteration, or unauthorized access.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  7. Data Retention
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    We retain Personal Data we collect from you where we have an ongoing legitimate business need to do so. Data we process on behalf of our Clients is retained for the period specified in our agreement with them.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  8. Your Data Protection Rights
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>You have certain rights regarding your Personal Data. These may include the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access, correct, update, or request deletion of your Personal Data.</li>
                    <li>Object to or restrict the processing of your Personal Data.</li>
                    <li>Withdraw your consent at any time for data processing we conduct based on your consent.</li>
                  </ul>
                  <p>
                    To exercise these rights for data you provided directly to Kallix, please contact us. If you are a Client&apos;s Customer, please direct your request to the Client who is the Data Controller of your information.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  9. Children&apos;s Privacy
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Our Service is not intended for use by individuals under the age of 18. We do not knowingly collect Personal Data from children.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  10. Changes to This Privacy Policy
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &ldquo;Last Updated&rdquo; date at the top.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  11. Contact Us & Grievance Officer
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact us. In accordance with the Information Technology Act 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
                  </p>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p><strong>Grievance Officer:</strong> Shreyansh Tiwari</p>
                    <p><strong>Email:</strong> <a href="mailto:support@kallix.in" className="text-blue-600 hover:text-blue-800">support@kallix.in</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+918604911124" className="text-blue-600 hover:text-blue-800">+91 8604911124</a></p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}