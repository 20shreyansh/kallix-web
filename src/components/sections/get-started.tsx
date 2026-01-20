"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDownRight, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { submitToHubSpotLegacy } from "@/lib/hubspot";

export default function GetStartedSection() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    automate: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  function validate(v = values) {
    const e: Record<string, string> = {};
    if (!v.name.trim()) e.name = "Name is required";
    else if (v.name.trim().length < 2) e.name = "Enter at least 2 characters";
    else if (v.name.length > 60) e.name = "Max 60 characters";

    if (!v.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.[A-Za-z]{2,}$/.test(v.email))
      e.email = "Enter a valid email";
    else if (v.email.length > 100) e.email = "Max 100 characters";

    if (!v.phone.trim()) e.phone = "Phone is required";
    else {
      const digits = v.phone.replace(/\D/g, "");
      if (digits.length < 7) e.phone = "Enter at least 7 digits";
      else if (digits.length > 15) e.phone = "Max 15 digits";
    }

    if (!v.website.trim()) e.website = "Website is required";
    else if (v.website.length > 120) e.website = "Max 120 characters";
    else if (
      !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i.test(
        v.website
      )
    ) {
      e.website = "Enter a valid URL";
    }

    if (!v.automate) e.automate = "Please select an option";
    return e;
  }

  // Check if form is valid (all required fields filled and no errors)
  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'phone', 'website', 'automate'];
    const allFieldsFilled = requiredFields.every(field => values[field as keyof typeof values].trim() !== '');
    const noErrors = Object.keys(validate()).length === 0;
    return allFieldsFilled && noErrors;
  };

  function setField<K extends keyof typeof values>(
    key: K,
    val: (typeof values)[K]
  ) {
    const next = { ...values, [key]: val };
    setValues(next);
    if (touched[key as string]) setErrors(validate(next));
  }

  // only allow digits and common phone punctuation when typing/pasting
  function sanitizePhone(input: string) {
    return input.replace(/[^0-9+()\-\s]/g, "");
  }

  function onBlurField(key: keyof typeof values) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      website: true,
      automate: true,
    });
    const errs = validate();
    setErrors(errs);
    
    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      setSubmitMessage('');
      
      try {
        await submitToHubSpotLegacy({
          name: values.name,
          email: values.email,
          phone: values.phone,
          website: values.website,
          automate: values.automate,
        });
        
        setSubmitStatus('success');
        setSubmitMessage('Thank you! We\'ll reach out within 24 hours to schedule your strategy call.');
        
        // Reset form after successful submission
        setValues({
          name: "",
          email: "",
          phone: "",
          website: "",
          automate: "",
        });
        setTouched({});
        setErrors({});
        
      } catch (error) {
        console.error('HubSpot submission error:', error);
        setSubmitStatus('error');
        setSubmitMessage('Something went wrong. Please try again or contact us directly.');
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <section id="get-started" className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Intro + headline */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[360px_1fr] xl:grid-cols-[460px_1fr] gap-8 md:gap-20 items-start">
          <div className="text-lg text-neutral-600 mt-5 leading-8">
            From first contact to final purchase, our experts from{" "}
            <span className="font-semibold">Kallix</span> build an AI agent that
            delights your customers at every single step of their journey,
            ensuring a world-class experience.
            <div className="mt-12">
              <a
                className="inline-flex w-full items-center justify-center rounded-full bg-btn-gradient px-5 py-2.5 text-white shadow transition-all duration-300 hover:opacity-95 hover:scale-105 hover:shadow-lg"
                href="#phone-mock"
              >
                Get Started <span className="ml-2">↗</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-medium leading-12 md:leading-[5rem] tracking-wider text-neutral-900 md:text-6xl">
              Launch your powerful, custom-built AI agent with our
              <span className="ml-3 lg:ml-1 xl:ml-1 2xl:ml-0 inline-block rounded-2xl bg-purple-100 px-2 py-1 underline decoration-transparent">
                3 simple steps.
              </span>
              <span className="xl:ml-6 mt-4 md:mt-0 inline-flex items-end">
                <span className="relative inline-block h-12 w-24 align-middle">
                  {/* main pill */}
                  <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-full border border-neutral-800 bg-white text-neutral-900 shadow-sm">
                    <ArrowDownRight className="size-12" />
                    {/* right-only echo arcs drawn above using clipping */}
                    <span
                      className="pointer-events-none absolute top-1/2 h-12 w-15 -translate-y-1/2 rounded-full border border-neutral-800 right-[-12px]"
                      style={{ clipPath: "inset(0 0 0 50%)" }}
                    />
                    <span
                      className="pointer-events-none absolute top-1/2 h-12 w-16 -translate-y-1/2 rounded-full border border-neutral-800 right-[-24px]"
                      style={{ clipPath: "inset(0 0 0 50%)" }}
                    />
                  </span>
                </span>
              </span>
            </h2>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-24 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StepCard
            step="STEP 1"
            title="Discovery Call"
            text="We begin by understanding your specific business goals, core challenges, and the ideal customer interaction you want."
          />
          <StepCard
            step="STEP 2"
            title="Custom Build & Training"
            text="Our experts will build and train your bespoke agent, tailoring its unique voice and workflow to your brand."
          />
          <StepCard
            step="STEP 3"
            title="Launch & Convert"
            text="We deploy your fully-managed AI agent. You sit back and watch as it engages customers and converts leads, 24/7."
          />
        </div>

        {/* Form card */}
        <div id="strategy-form" className="mt-8 overflow-hidden rounded-[36px] bg-[#F1EBFE] p-6 shadow-sm md:p-10">
          <h3 className="text-3xl mb-6 font-semibold tracking-tight text-neutral-900 md:text-6xl">
            Book Your Strategy Call
          </h3>
          <p className="text-neutral-600">
            Tell us a bit about your business, and one of our AI specialists
            <br />
            will reach out to explore your automation goals.
          </p>
          <form
            onSubmit={onSubmit}
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {/* Name */}
            <label className="block">
              <div className="text-sm font-semibold text-neutral-800">
                Your Name *
              </div>
              <div className="mt-2">
                <Input
                  placeholder="e.g., john doe"
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  onBlur={() => onBlurField("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                  maxLength={60}
                  required
                />
                {touched.name && errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>
            </label>

            {/* Email */}
            <label className="block">
              <div className="text-sm font-semibold text-neutral-800">
                Your Email *
              </div>
              <div className="mt-2">
                <Input
                  type="email"
                  placeholder="e.g., john.doe@company.com"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => onBlurField("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  maxLength={100}
                  required
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
            </label>

            {/* Phone */}
            <label className="block">
              <div className="text-sm font-semibold text-neutral-800">
                Your Phone Number *
              </div>
              <div className="mt-2">
                <Input
                  placeholder="e.g., +91 98765 43210"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) =>
                    setField("phone", sanitizePhone(e.target.value))
                  }
                  onBlur={() => onBlurField("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby="phone-error"
                  maxLength={15}
                  pattern="[0-9()+\-\s]*"
                  required
                />
                {touched.phone && errors.phone && (
                  <p id="phone-error" className="mt-1 text-xs text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>
            </label>

            {/* Website */}
            <label className="block">
              <div className="text-sm font-semibold text-neutral-800">
                Company Website *
              </div>
              <div className="mt-2">
                <Input
                  placeholder="e.g., www.yourcompany.com"
                  value={values.website}
                  onChange={(e) => setField("website", e.target.value)}
                  onBlur={() => onBlurField("website")}
                  aria-invalid={!!errors.website}
                  aria-describedby="website-error"
                  maxLength={120}
                  required
                />
                {touched.website && errors.website && (
                  <p id="website-error" className="mt-1 text-xs text-red-600">
                    {errors.website}
                  </p>
                )}
              </div>
            </label>

            {/* Select */}
            <div className="md:col-span-2">
              <div className="text-sm font-semibold text-neutral-800">
                I Want To Automate *
              </div>
              <div className="mt-2">
                <Select
                  value={values.automate}
                  onValueChange={(v) => setField("automate", v)}
                >
                  <SelectTrigger
                    size="lg"
                    aria-invalid={!!errors.automate}
                    className="w-full rounded-md bg-white text-neutral-900"
                  >
                    <SelectValue placeholder="select an automation" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-neutral-900">
                    <SelectItem value="appointment">
                      Appointment & Service Booking
                    </SelectItem>
                    <SelectItem value="hospitality">
                      Hotel & Hospitality Automation
                    </SelectItem>
                    <SelectItem value="real-estate">
                      Real Estate Lead Qualification
                    </SelectItem>
                    <SelectItem value="ecommerce">
                      E-commerce Automation
                    </SelectItem>
                    <SelectItem value="support">
                      Inbound Customer Support
                    </SelectItem>
                    <SelectItem value="service-sales">
                      Service & Sales Enquiries
                    </SelectItem>
                    <SelectItem value="other">
                      Other / Custom Requirement
                    </SelectItem>
                  </SelectContent>
                </Select>
                {touched.automate && errors.automate && (
                  <p className="mt-1 text-xs text-red-600">{errors.automate}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-6">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-800">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{submitMessage}</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-800">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{submitMessage}</p>
                </div>
              )}

              <div className="flex w-full items-center justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isFormValid()}
                  className="h-12 md:w-1/2 w-full rounded-lg bg-btn-gradient px-6 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg enabled:hover:opacity-95"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Request A Personalized Demo'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  title,
  text,
  highlight = false,
}: {
  step: string;
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        highlight
          ? "bg-black/10"
          : "bg-white border border-black/10"
      }`}
    >
      <div className="mb-8 flex items-center justify-between text-xs text-neutral-500">
        <span className="font-semibold text-lg tracking-widest">{step}</span>
        <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#368CFF] to-[#D89FF2]">
          <Image
            src={`/icon/${title.toLowerCase().replace(/\s+/g, "_")}.png`}
            alt={`${title} icon`}
            width={20}
            height={20}
            className="object-contain"
          />
        </span>
      </div>
      <div className="font-semibold text-2xl text-neutral-900">
        {title}
      </div>
      <p className="mt-2 text-lg text-neutral-600">{text}</p>
    </div>
  );
}
