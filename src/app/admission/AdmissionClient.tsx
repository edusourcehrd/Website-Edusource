"use client";

import React from "react";
import Image from "next/image";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ClipboardList, User, GraduationCap, BookOpen, ShieldCheck, Lock, CheckCircle2, AlertCircle } from "lucide-react";

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import StickyBanner from "@/components/sections/sticky-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  dateOfBirth: z.string().min(1, "Date of birth is required."),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select a gender.",
  }),
  guardianName: z.string().min(2, "Parent/Guardian name is required."),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number."),
  whatsappNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit WhatsApp number."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(10, "Please enter your complete address."),
  district: z.string().min(2, "District is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().regex(/^[0-9]{6}$/, "Please enter a valid 6-digit Pincode."),
  qualification: z.string().min(1, "Highest qualification is required."),
  yearOfPassing: z.string().regex(/^[0-9]{4}$/, "Enter a valid year (e.g. 2023)."),
  institutionName: z.string().min(2, "School/College name is required."),
  stream: z.string().min(2, "Stream/Specialization is required."),
  percentage: z.string().min(1, "Percentage/CGPA is required."),
  course: z.string().min(1, "Please select a course."),
  preferredMode: z.enum(["Offline (Campus)", "Online", "Hybrid"], {
    required_error: "Please select a learning mode.",
  }),
  preferredBatch: z.enum(["Morning", "Evening", "Weekend"], {
    required_error: "Please select a preferred batch.",
  }),
  hostelRequired: z.enum(["Yes", "No"], {
    required_error: "Please specify if hostel facility is required.",
  }),
  declaration: z.literal(true, {
    errorMap: () => ({ message: "You must accept the declaration to proceed." }),
  }),
  cfTurnstileResponse: z.string().min(1, "Security check failed. Please complete the verification."),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdmissionClient() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: undefined,
      guardianName: "",
      mobileNumber: "",
      whatsappNumber: "",
      email: "",
      address: "",
      district: "",
      state: "Kerala",
      pincode: "",
      qualification: "",
      yearOfPassing: "",
      institutionName: "",
      stream: "",
      percentage: "",
      course: "",
      preferredMode: undefined,
      preferredBatch: undefined,
      hostelRequired: "No",
      declaration: undefined,
      cfTurnstileResponse: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application.");
      }

      toast.success("Application Submitted Successfully!", {
        description: "Our admissions office will review your details and contact you shortly.",
      });

      setIsSubmitted(true);
    } catch (error: any) {
      toast.error("Submission Error", {
        description: error.message || "Something went wrong. Please try again or contact us directly.",
      });
      if (typeof window !== "undefined" && window.turnstile) {
        window.turnstile.reset();
      }
      form.setValue("cfTurnstileResponse", "");
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    (window as any).onTurnstileSuccess = (token: string) => {
      form.setValue("cfTurnstileResponse", token, { shouldValidate: true });
    };
    (window as any).onTurnstileExpired = () => {
      form.setValue("cfTurnstileResponse", "", { shouldValidate: true });
    };
    (window as any).onTurnstileError = () => {
      form.setValue("cfTurnstileResponse", "", { shouldValidate: true });
    };
  }, [form]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <section className="bg-[#0056E0] text-white py-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
              <ClipboardList className="w-4 h-4 text-emerald-400" /> Official Application Form
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Online Admission Form 2026-27
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Begin your professional journey with Edusource HRD Centre, Kollam. Fill out the application below to register for our government-approved diploma programs.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
          <Card className="border-slate-200/80 shadow-xl rounded-2xl bg-white overflow-hidden">
            {isSubmitted ? (
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Application Received!</h2>
                <p className="text-slate-600 max-w-md mx-auto mb-8">
                  Thank you for applying to Edusource HRD Centre. Your application reference has been logged. Our admission academic coordinator will reach out to you within 24 hours.
                </p>
                <Button onClick={() => { setIsSubmitted(false); form.reset(); }} className="bg-[#0056E0] text-white hover:bg-blue-700 font-bold px-8 py-3 rounded-full">
                  Submit Another Application
                </Button>
              </CardContent>
            ) : (
              <CardContent className="p-6 sm:p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                    
                    {/* Step 1: Personal Details */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-6">
                        <User className="w-6 h-6 text-[#0056E0]" />
                        <h2 className="text-xl font-bold text-slate-900">1. Personal Information</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Full Name (as per certificates) *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Anjali Nair" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Date of Birth *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Gender *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Male">Male</SelectItem>
                                  <SelectItem value="Female">Female</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="guardianName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Parent / Guardian Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. K. R. Nair" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Step 2: Contact Details */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-6">
                        <BookOpen className="w-6 h-6 text-[#0056E0]" />
                        <h2 className="text-xl font-bold text-slate-900">2. Contact Details</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="mobileNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Mobile Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="10-digit number" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="whatsappNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">WhatsApp Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="10-digit WhatsApp number" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="font-semibold text-slate-700">Email Address *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="name@example.com" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="font-semibold text-slate-700">Residential Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="House Name/No., Street, Place" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">District *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Kollam" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Pincode *</FormLabel>
                              <FormControl>
                                <Input placeholder="6-digit Pincode" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Step 3: Academic Qualifications */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-6">
                        <GraduationCap className="w-6 h-6 text-[#0056E0]" />
                        <h2 className="text-xl font-bold text-slate-900">3. Academic Qualification</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="qualification"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Highest Qualification *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select qualification" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="+2 / Higher Secondary">+2 / Higher Secondary</SelectItem>
                                  <SelectItem value="VHSE">VHSE</SelectItem>
                                  <SelectItem value="Diploma">Diploma</SelectItem>
                                  <SelectItem value="Bachelor's Degree">Bachelor's Degree</SelectItem>
                                  <SelectItem value="Master's Degree">Master's Degree</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="stream"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Stream / Specialization *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Science / Commerce / B.Sc" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="institutionName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">School / College Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Institution last attended" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="yearOfPassing"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Year of Passing *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 2024" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="percentage"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="font-semibold text-slate-700">Percentage / Grade *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 82% or Grade A" {...field} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Step 4: Course Choice */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-6">
                        <ClipboardList className="w-6 h-6 text-[#0056E0]" />
                        <h2 className="text-xl font-bold text-slate-900">4. Program Preference</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="course"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="font-semibold text-slate-700">Select Course *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-slate-200 focus-visible:ring-blue-500">
                                    <SelectValue placeholder="Choose your desired diploma program" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Diploma in Hospital Administration">Diploma in Hospital Administration</SelectItem>
                                  <SelectItem value="German Language Training Program">German Language Training Program</SelectItem>
                                  <SelectItem value="Diploma in HR Management & Administration">Diploma in HR Management & Administration</SelectItem>
                                  <SelectItem value="Professional Medical Coding Course">Professional Medical Coding Course</SelectItem>
                                  <SelectItem value="Diploma in Logistics & Shipping Management">Diploma in Logistics & Shipping Management</SelectItem>
                                  <SelectItem value="Diploma in Medical Transcription">Diploma in Medical Transcription</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredMode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Preferred Learning Mode *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select mode" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Offline (Campus)">Offline (Campus)</SelectItem>
                                  <SelectItem value="Online">Online</SelectItem>
                                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredBatch"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-slate-700">Preferred Batch *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-slate-200">
                                    <SelectValue placeholder="Select batch time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Morning">Morning Batch (9:30 AM - 1:00 PM)</SelectItem>
                                  <SelectItem value="Evening">Evening Batch (2:00 PM - 5:00 PM)</SelectItem>
                                  <SelectItem value="Weekend">Weekend Batch (Sat/Sun)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Step 5: Verification & Declaration */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-6">
                        <ShieldCheck className="w-6 h-6 text-[#0056E0]" />
                        <h2 className="text-xl font-bold text-slate-900">5. Declaration & Security</h2>
                      </div>

                      <FormField
                        control={form.control}
                        name="declaration"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border border-slate-100 p-5 bg-slate-50 mb-6">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="mt-0.5"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-semibold text-slate-800">
                                Declaration *
                              </FormLabel>
                              <FormDescription className="text-xs text-slate-500">
                                I hereby declare that all the information provided in this form is true and correct to the best of my knowledge. I understand that admission is subject to verification of documents.
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Cloudflare Turnstile */}
                      <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-6">
                        <div
                          className="cf-turnstile"
                          data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAAxxxxxxxxx"}
                          data-callback="onTurnstileSuccess"
                          data-expired-callback="onTurnstileExpired"
                          data-error-callback="onTurnstileError"
                        />
                        <FormField
                          control={form.control}
                          name="cfTurnstileResponse"
                          render={() => <FormMessage className="mt-2 text-center" />}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0056E0] hover:bg-blue-700 text-white font-bold text-lg py-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all"
                      >
                        {isSubmitting ? "Submitting Application..." : "Submit Application"}
                      </Button>
                      <p className="text-xs text-slate-400 text-center mt-4">
                        Your privacy is protected. By submitting, you agree to our Terms of Service & Privacy Policy.
                      </p>
                    </div>

                  </form>
                </Form>
              </CardContent>
            )}
          </Card>
        </div>
      </main>

      <Footer />
      <StickyBanner />
    </div>
  );
}
