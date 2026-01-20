"use client";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { TopBanner } from "@/components/site/top-banner";
import { useBannerVisibility } from "@/components/site/top-banner";

export default function TermsOfUse() {
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
              Terms of Use
            </h1>
            <p className="text-lg text-neutral-600">
              Last Updated: September 21, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200">
              
              <div className="text-neutral-700 space-y-4 mb-8">
                <p>
                  Welcome to Kallix. These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of the Kallix website, https://kallix.in/ (the &ldquo;Website&rdquo;), and the bespoke AI Voice Agent services, software, and platform provided by Kallix (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                </p>
                <p>
                  By accessing our Website or using our services (the &ldquo;Service&rdquo;), you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our Service.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  1. The Service
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Kallix provides a custom-built, fully managed service where we design, build, train, and deploy bespoke AI Voice Agents tailored to our clients&apos; (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; &ldquo;your&rdquo;) specific business needs, including but not limited to, automating sales, customer support, and appointment booking conversations. The specifics of the Service provided to each Client, including features, scope, and fees, will be detailed in a separate Service Agreement or Order Form.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  2. Client Accounts and Responsibilities
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p><strong>Account Information:</strong> You must provide accurate, current, and complete information during the onboarding process and keep this information updated.</p>
                  <p><strong>Lawful Use:</strong> You agree to use the Service in compliance with all applicable local, state, national, and international laws and regulations. This includes, but is not limited to, laws related to telemarketing, data privacy and protection (including obtaining necessary consents from your customers), and telecommunications (e.g., TRAI regulations in India, TCPA in the US).</p>
                  <p><strong>You are the Data Controller:</strong> You acknowledge that you are the data controller for any personal data of your customers that is processed by our Service on your behalf. You are solely responsible for the legality and appropriateness of this data.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  3. Acceptable Use Policy
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>You agree not to use the Service for any of the following prohibited purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To engage in any illegal, fraudulent, or abusive activities.</li>
                    <li>To make unsolicited calls or send messages in violation of anti-spam laws.</li>
                    <li>To harass, threaten, or impersonate any person or entity.</li>
                    <li>To transmit any material that is infringing, libelous, defamatory, or otherwise unlawful or tortious.</li>
                  </ul>
                  <p>The Service is not intended for making emergency calls (e.g., to police, fire, or medical services). You are responsible for informing your users of this limitation.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  4. Fees and Payment
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p><strong>Service Fees:</strong> You agree to pay all fees specified in your applicable Service Agreement or Order Form. All fees are non-refundable except as required by law or as explicitly stated in your Service Agreement.</p>
                  <p><strong>Billing:</strong> We will bill you in accordance with the terms set forth in your Service Agreement. You agree to provide current and accurate billing information.</p>
                  <p><strong>Taxes:</strong> All fees are exclusive of applicable taxes, which you are responsible for paying.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  5. Intellectual Property Rights
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p><strong>Our Intellectual Property:</strong> We retain all rights, title, and interest in and to our Service, including the underlying AI models, software, platform, know-how, and any materials we create. This agreement does not grant you any license to our software or intellectual property, other than the right to use the Service as described.</p>
                  <p><strong>Your Intellectual Property:</strong> You retain all rights, title, and interest in and to your own data, including customer lists, call recordings, and transcripts generated for you through the Service (&ldquo;Client Data&rdquo;). You grant us a worldwide, royalty-free license to use, reproduce, and process your Client Data solely for the purpose of providing and improving the Service for you.</p>
                  <p><strong>Service Improvement:</strong> We may use anonymized and aggregated data derived from your use of the Service to analyze, improve, and train our AI models and overall platform. This data will not identify you or any individuals.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  6. Confidentiality
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    Both parties agree not to disclose the other party&apos;s Confidential Information, except as required to provide or use the Service, or as required by law. Confidential Information includes business plans, customer data, and proprietary technology.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  7. Term and Termination
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p><strong>Term:</strong> The term of this agreement will be specified in your Service Agreement.</p>
                  <p><strong>Termination:</strong> Either party may terminate the agreement as specified in the Service Agreement, typically with written notice. We reserve the right to suspend or terminate your access to the Service immediately if you are in breach of these Terms, particularly the Acceptable Use Policy.</p>
                  <p><strong>Effect of Termination:</strong> Upon termination, your right to use the Service will cease, and you must pay any outstanding fees.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  8. Disclaimer of Warranties
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  9. Limitation of Liability
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL KALLIX, ITS AFFILIATES, DIRECTORS, OR EMPLOYEES BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE.
                  </p>
                  <p>
                    OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL IN NO EVENT EXCEED THE AMOUNT PAID BY YOU TO KALLIX FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  10. Indemnification
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    You agree to defend, indemnify, and hold harmless Kallix and its employees from and against any claims, damages, losses, liabilities, costs, and expenses (including attorneys&apos; fees) arising out of your violation of these Terms or your use of the Service in violation of applicable laws.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  11. Governing Law and Dispute Resolution
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    These Terms shall be governed by the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  12. Changes to These Terms
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the new Terms on our Website and updating the &ldquo;Last Updated&rdquo; date. Your continued use of the Service after any such change constitutes your acceptance of the new Terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                  13. Contact Us
                </h2>
                <div className="text-neutral-700 space-y-4">
                  <p>
                    If you have any questions about these Terms of Use, please contact us:
                  </p>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p><strong>Kallix</strong></p>
                    <p><strong>Email:</strong> <a href="mailto:support@kallix.in" className="text-blue-600 hover:text-blue-800">support@kallix.in</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+918604911124" className="text-blue-600 hover:text-blue-800">+91 8604911124</a></p>
                    <p><strong>Website:</strong> <a href="https://kallix.in/" className="text-blue-600 hover:text-blue-800">https://kallix.in/</a></p>
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