// src/components/sections/home/cta.tsx
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapComponent } from "@/components/sections/home/map-component";
import Image from "next/image";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  service: z.string({
    required_error: "Please select a service.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to our terms and privacy policy.",
  }),
});

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
      consent: false,
    },
  });

  // Form submission handler
  async function onSubmit() {
    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, you would send the data to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });

      // if (!response.ok) throw new Error('Failed to submit form');

      setFormStatus("success");
      form.reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-gradient-to-b from-white to-secondary-50 relative overflow-hidden z-0"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-100/40 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-100/40 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-secondary-100/30 blur-3xl"></div>
      </div>

      <Container className="relative z-1">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
            Ready to <span className="text-primary-600">Transform</span> Your
            Operations?
          </h2>
          <p className="text-lg text-secondary-600">
            Connect with our expert team to discuss how our specialized oil and
            gas services can elevate your business performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full"
          >
            <Card className="shadow-xl border-secondary-100">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-secondary-900">
                  Request a Consultation
                </CardTitle>
                <CardDescription className="text-secondary-600">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Success Message */}
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start"
                  >
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-800 font-medium">
                        Thank you for reaching out!
                      </p>
                      <p className="text-green-700 text-sm mt-1">
                        Your message has been received. A member of our team
                        will contact you shortly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start"
                  >
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-0.5">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-red-800 font-medium">
                        Something went wrong
                      </p>
                      <p className="text-red-700 text-sm mt-1">
                        There was an error submitting your request. Please try
                        again or contact us directly.
                      </p>
                    </div>
                  </motion.div>
                )}

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email & Phone - Two Column */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Company Field */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Service Field */}
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Interested In</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white">
                              <SelectItem value="slickline">
                                Slickline Services
                              </SelectItem>
                              <SelectItem value="hot-oil">
                                Hot Oil/Pumping Operations
                              </SelectItem>
                              <SelectItem value="marine">
                                Marine Services
                              </SelectItem>
                              <SelectItem value="well-testing">
                                Well-testing Services
                              </SelectItem>
                              <SelectItem value="other">
                                Other Services
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message Field */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about your project requirements..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Consent Checkbox */}
                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the terms of service and privacy policy
                            </FormLabel>
                            <FormDescription>
                              By submitting this form, you consent to be
                              contacted regarding our services.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        "Submit Request"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Map & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="w-full flex flex-col gap-8"
          >
            {/* Interactive Map */}
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
              <MapComponent />
            </div>

            {/* Contact Information */}
            <Card className="shadow-xl border-secondary-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-secondary-900">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-secondary-600">
                  Reach out to us directly through any of these channels
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Headquarters */}
                  <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-primary-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-secondary-900">
                          Headquarters
                        </h3>
                        <p className="text-sm text-secondary-600 mt-1">
                          10111 Richmond Ave, Suite 500
                        </p>
                        <p className="text-sm text-secondary-600">
                          Houston, TX 77042, USA
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-primary-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-secondary-900">
                          Phone
                        </h3>
                        <p className="text-sm text-secondary-600 mt-1">
                          Main: +1 (281) 555-1234
                        </p>
                        <p className="text-sm text-primary-600 font-medium">
                          Support: +1 (800) 555-4321
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-lg mr-3 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-primary-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-secondary-900">
                          Email
                        </h3>
                        <p className="text-sm text-secondary-600 mt-1 break-all">
                          info@zukusindustries.com
                        </p>
                        <p className="text-sm text-secondary-600 break-all">
                          support@zukusindustries.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-white p-4 rounded-lg border border-secondary-100 shadow-sm">
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-primary-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-secondary-900">
                          Business Hours
                        </h3>
                        <p className="text-sm text-secondary-600 mt-1">
                          Mon-Fri: 8:00 AM - 6:00 PM CST
                        </p>
                        <p className="text-sm text-primary-600 font-medium">
                          24/7 Emergency Support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Field Operations Image */}
                <div className="relative h-[180px] w-full rounded-lg overflow-hidden mt-4">
                  <Image
                    src="/images/hero/hero-3.webp"
                    alt="Zukus Industries Field Operations"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/70 to-transparent flex items-end">
                    <div className="p-4">
                      <p className="text-white font-medium">
                        On-site expertise you can trust
                      </p>
                      <p className="text-white/80 text-sm">
                        35+ years of industry excellence
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
