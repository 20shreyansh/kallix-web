"use client";

import Image from "next/image";

export default function BenefitsSection() {
  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-black/10 bg-white text-sm font-medium text-black/70 mb-6">
            <Image
              src="/icon/questions.png"
              alt="Features"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            BENEFITS
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-neutral-900 mb-6">
            Agents that work, not just talk
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Kallix builds AI agents that understand, act, and evolve — delivering
            human-like, secure, and on-brand interactions that adapt to context
            and drive real results.
          </p>
        </div>

        {/* Big container card */}
        <div className="bg-[#F6F6F6] rounded-3xl p-4 lg:p-8">
          {/* First row - 2 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 mb-3 lg:mb-6">
            {/* Listing Performance Card */}
            <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-sm flex flex-col">
              <div className="mb-8 relative h-64 flex items-end justify-center gap-3 px-8 flex-grow">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-px"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to right, #E5E7EB 0, #E5E7EB 8px, transparent 8px, transparent 16px)",
                      }}
                    />
                  ))}
                </div>
                
                {/* Bars */}
                <div className="relative flex items-end justify-center gap-2 lg:gap-4 h-full pt-8">
                  {[
                    { height: 52, color: "blue" },
                    { height: 38, color: "gray" },
                    { height: 68, color: "blue" },
                    { height: 42, color: "gray" },
                    { height: 58, color: "blue" },
                    { height: 33, color: "gray" },
                    { height: 72, color: "pink" },
                    { height: 45, color: "gray" },
                    { height: 78, color: "blue" },
                    { height: 36, color: "gray" },
                    { height: 88, color: "pink" },
                    { height: 40, color: "gray" },
                    { height: 65, color: "blue" },
                    { height: 30, color: "gray" },
                    { height: 55, color: "blue" },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className="w-2 lg:w-5 rounded-full transition-all duration-300"
                      style={{
                        height: `${bar.height}%`,
                        background:
                          bar.color === "pink"
                            ? "linear-gradient(180deg, #FF2FD2 0%, #FF6BE5 100%)"
                            : bar.color === "blue"
                              ? "linear-gradient(180deg, #4442F0 0%, #6B5FFF 100%)"
                              : "#F6F6F6",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-2xl text-neutral-900 mb-3">
                  Listing Performance
                </h3>
                <p className="text-gray-600">
                  AI-driven analytics provide insights that enable real estate
                  companies to refine strategies and make data-driven decisions.
                </p>
              </div>
            </div>

            {/* AI Property Assistant Card */}
            <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-sm flex flex-col">
              <div className="mb-8 space-y-6 flex-grow">
                {/* User message */}
                <div className="flex items-start justify-end gap-3">
                  <div className="flex-1 max-w-md">
                    <div className="bg-[#E8E9F3] rounded-2xl px-6 py-4">
                      <p className="text-base text-gray-800 mb-2">
                        I need help finding a property.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">09:12</span>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/industry/home-services/person.jpg"
                    alt="User profile photo"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                </div>

                {/* AI response */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4442F0] to-[#6B5FFF] shrink-0 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="4" fill="white" />
                      <circle cx="12" cy="12" r="8" />
                    </svg>
                  </div>
                  <div className="flex-1 max-w-md">
                    <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4">
                      <p className="text-base text-gray-800 mb-2">
                        I can help with that! What is your desired location and
                        budget?
                      </p>
                      <span className="text-xs text-gray-500">09:12</span>
                    </div>
                  </div>
                </div>

                {/* User message */}
                <div className="flex items-start justify-end gap-3">
                  <div className="flex-1 max-w-md">
                    <div className="bg-[#E8E9F3] rounded-2xl px-6 py-4">
                      <p className="text-base text-gray-800 mb-2">
                        I&apos;m looking for a 3-bedroom house with a large yard,
                        near good schools.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">09:12</span>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                  <Image
                    src="/industry/home-services/person.jpg"
                    alt="User profile photo"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-2xl text-neutral-900 mb-3">
                  AI Property Assistant
                </h3>
                <p className="text-gray-600">
                  Our AI assistant provides advanced tools designed to enhance your
                  property search and management.
                </p>
              </div>
            </div>
          </div>

          {/* Second row - 3 cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
            {/* Easy Integration Card */}
            <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-sm flex flex-col">
              <div className="mb-6 flex justify-center items-center flex-grow">
                <div className="relative">
                  <div className="flex gap-2 md:gap-4 items-center">
                    {/* Google Meets */}
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center p-2">
                      <Image
                        src="/industry/real-estate/google-meets.svg"
                        alt="Google Meets logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* HubSpot */}
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center p-2">
                      <Image
                        src="/industry/real-estate/hubspot.svg"
                        alt="HubSpot logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* WhatsApp - Center and larger */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-50 flex items-center justify-center shadow-lg p-1 md:p-3">
                      <Image
                        src="/industry/real-estate/whatsapp.svg"
                        alt="WhatsApp logo"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Salesforce */}
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center p-2">
                      <Image
                        src="/industry/real-estate/salesforce.svg"
                        alt="Salesforce logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Zoho */}
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-50 flex items-center justify-center p-2">
                      <Image
                        src="/industry/real-estate/zoho.svg"
                        alt="Zoho logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-2xl text-neutral-900 mb-3">
                  Easy Integration
                </h3>
                <p className="text-gray-600">
                  Integrate with existing real estate platforms to streamline
                  property management and booking processes.
                </p>
              </div>
            </div>

            {/* Effortless Bookings Card */}
            <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-sm flex flex-col">
              <div className="mb-6 space-y-4 flex-grow flex items-center">
                <div className="w-full space-y-1">
                  {/* Booking Agent */}
                  <div className="bg-white rounded-lg p-2 mx-4 border border-gray-200 shadow-sm opacity-50">
                    <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-2">
                        <Image
                          src="/industry/real-estate/nova.png"
                          alt="Nova Realty company logo"
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800">
                          Booking Agent
                        </p>
                        <p className="text-xs text-gray-500">Nova Realty</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400">Posted 2 days ago</p>
                    </div>
                  </div>

                  {/* Leasing Consultant - Featured */}
                  <div className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-2">
                          <Image
                            src="/industry/real-estate/zenith.png"
                            alt="Zenith Properties company logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">
                            Leasing Consultant
                          </p>
                          <p className="text-xs text-gray-500">Zenith Properties</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400">Posted 3 min ago</p>
                    </div>
                  </div>

                  {/* Property Manager */}
                  <div className="bg-white rounded-lg p-2 mx-4 border border-gray-200 shadow-sm opacity-50">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-2">
                        <Image
                          src="/industry/real-estate/onyx.png"
                          alt="Onyx Estates company logo"
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Property Manager
                        </p>
                        <p className="text-xs text-gray-500">Onyx Estates</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400">Posted 10 min ago</p>
                  </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-2xl text-neutral-900 mb-3">
                  Effortless Bookings
                </h3>
                <p className="text-gray-600">
                  Our AI assistant simplifies the booking process, helping users
                  schedule property viewings and manage appointments easily.
                </p>
              </div>
            </div>

            {/* Instant Access Card */}
            <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-sm flex flex-col">
              <div className="mb-6 flex justify-center items-center flex-grow">
                <Image
                  src="/industry/real-estate/instant_access.png"
                  alt="Instant access to property information dashboard interface"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="mt-auto">
                <h3 className="text-2xl text-neutral-900 mb-3">
                  Instant Access
                </h3>
                <p className="text-gray-600">
                  Our AI assistant provides instant access to property information,
                  empowering users to make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
