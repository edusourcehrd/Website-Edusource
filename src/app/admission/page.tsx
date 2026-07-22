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

const admissionSchema = z.object({
  fullName: z.string().min(1, "പൂർണ്ണനാമം ആവശ്യമാണ് / Full name is required"),
  address: z.string().min(1, "മേൽവിലാസം ആവശ്യമാണ് / Address is required"),
  mobile: z.string().regex(/^[6789]\d{9}$/, "അസാധുവായ മൊബൈൽ നമ്പർ (10 അക്കങ്ങൾ വേണം) / Invalid mobile number (10 digits starting with 6-9)"),
  aadhaar: z.string().refine((val) => val === "" || /^\d{12}$/.test(val), {
    message: "ആധാർ നമ്പർ 12 അക്കങ്ങൾ ആയിരിക്കണം / Aadhaar number must be 12 digits",
  }).optional(),
  email: z.string().email("അസാധുവായ ഇമെയിൽ / Invalid email address"),
  guardianName: z.string().min(1, "രക്ഷാകർത്താവിന്റെ പേര് ആവശ്യമാണ് / Guardian's name is required"),
  relationship: z.string().min(1, "ബന്ധം ആവശ്യമാണ് / Relationship is required"),
  guardianMobile: z.string().regex(/^[6789]\d{9}$/, "അസാധുവായ മൊബൈൽ നമ്പർ / Invalid mobile number"),
  dateOfBirth: z.string().min(1, "ജനനത്തീയതി ആവശ്യമാണ് / Date of birth is required"),
  age: z.string().min(1, "പ്രായം ആവശ്യമാണ് / Age is required"),
  gender: z.enum(["സ്ത്രീ", "പുരുഷൻ"], {
    message: "ലിംഗഭേദം തിരഞ്ഞെടുക്കുക / Please select gender",
  }),
  caste: z.string().min(1, "ജാതി ആവശ്യമാണ് / Caste is required"),
  religion: z.string().min(1, "മതം ആവശ്യമാണ് / Religion is required"),
  hasReservation: z.enum(["ഉണ്ട്", "ഇല്ല"], {
    message: "സംവരണം ഉണ്ടോ എന്ന് തിരഞ്ഞെടുക്കുക / Please select reservation status",
  }),
  reservationCategory: z.string().optional(),
  educationalQualification: z.string().min(1, "വിദ്യാഭ്യാസ യോഗ്യത ആവശ്യമാണ് / Educational qualification is required"),
  district: z.string().min(1, "ജില്ല ആവശ്യമാണ് / District is required"),
  trainingCollegeName: z.string().min(1, "പരിശീലന കോളേജിന്റെ പേര് ആവശ്യമാണ് / College name is required"),
  trainingCollegeCode: z.string().min(1, "കോളേജ് കോഡ് ആവശ്യമാണ് / College code is required"),
  courseName: z.string().min(1, "കോഴ്സിന്റെ പേര് ആവശ്യമാണ് / Course name is required"),
  duration: z.string().min(1, "കാലയളവ് ആവശ്യമാണ് / Duration is required"),
  referredBy: z.string().min(1, "റഫർ ചെയ്ത ആൾ / കോർഡിനേറ്റർ ആവശ്യമാണ് / Referred by is required"),
  principalName: z.string().min(1, "പ്രിൻസിപ്പലിന്റെ പേര് ആവശ്യമാണ് / Principal name is required"),
  acceptedTerms: z.boolean().refine(Boolean, {
    message: "നിങ്ങൾ നിബന്ധനകൾ അംഗീകരിക്കണം / You must accept the terms and conditions",
  }),
  acceptedDeclaration: z.boolean().refine(Boolean, {
    message: "നിങ്ങൾ സത്യപ്രസ്താവന അംഗീകരിക്കണം / You must accept the declaration",
  }),
  website: z.string().optional(), // Honeypot
  status: z.string().optional(),
}).refine((data) => {
  if (data.hasReservation === "ഉണ്ട്" && !data.reservationCategory) {
    return false;
  }
  return true;
}, {
  message: "സംവരണ വിഭാഗം തിരഞ്ഞെടുക്കുക / Please select reservation category",
  path: ["reservationCategory"],
});

type AdmissionFormValues = z.infer<typeof admissionSchema>;

export default function AdmissionPage() {
  const [formStartTime] = React.useState(Date.now());
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null);
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      fullName: "",
      address: "",
      mobile: "",
      aadhaar: "",
      email: "",
      guardianName: "",
      relationship: "",
      guardianMobile: "",
      dateOfBirth: "",
      age: "",
      gender: undefined,
      caste: "",
      religion: "",
      hasReservation: undefined,
      reservationCategory: "",
      educationalQualification: "",
      district: "",
      trainingCollegeName: "",
      trainingCollegeCode: "",
      courseName: "",
      duration: "",
      referredBy: "",
      principalName: "",
      acceptedTerms: false,
      acceptedDeclaration: false,
      website: "",
      status: "New",
    },
  });

  const onSubmit = async (data: AdmissionFormValues) => {
    // Honeypot check
    if (data.website) {
      toast.error("Spam detected.");
      return;
    }

    // Minimum time check (6 seconds)
    if (Date.now() - formStartTime < 6000) {
      toast.error("Please review the form before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Application submitted successfully. Edusource HRD Centre will contact you soon.");
        form.reset();
        setTurnstileToken(null);
        // Reset turnstile widget if it exists
        if (window.turnstile) {
          window.turnstile.reset();
        }
      } else {
        toast.error(result.message || "Something went wrong while submitting. Please try again or contact Edusource HRD Centre.");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting. Please try again or contact Edusource HRD Centre.");
    }
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff]">
      <Navbar />
      <main className="flex-grow pt-36 md:pt-44 pb-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
              <Lock size={12} className="text-blue-500" />
              Secure Admission Portal
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-950 mb-3 tracking-tight">
              അപേക്ഷാ ഫോം <span className="text-blue-600 block sm:inline">/ Admission Form</span>
            </h1>
            
            <div className="space-y-2 mt-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-tight">
                Youth Employability Skill Training Educational Co-operative Society Limited
              </h2>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm">
                National Youth Programme Project
              </p>
            </div>
          </div>

          {/* Secure Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: ShieldCheck, text: "Secure admission form" },
              { icon: Lock, text: "Data used only for admission" },
              { icon: CheckCircle2, text: "Edusource HRD Centre, Kollam" }
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <badge.icon className="size-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Promotional Image Card */}
          <div className="mx-auto mb-12 max-w-4xl rounded-[32px] bg-white p-3 shadow-2xl shadow-blue-100/30 border border-slate-100 overflow-hidden">
            <Image
              src="/youth-skill-training.png"
              alt="Youth Employability Skill Training Educational Co-operative Society"
              width={1000}
              height={250}
              className="w-full h-auto rounded-[24px] object-cover hover:scale-[1.01] transition-transform duration-500"
              priority
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              {/* Honeypot field */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input {...field} tabIndex={-1} autoComplete="off" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Personal Information */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <User className="size-6 text-blue-100" />
                    വ്യക്തിഗത വിവരങ്ങൾ / Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">പൂർണ്ണനാമം (SSLC സർട്ടിഫിക്കറ്റ് പ്രകാരം) / Full name as per SSLC certificate *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">മേൽവിലാസം (പിൻകോഡ് സഹിതം) / Address with pincode *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full address with pincode" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">മൊബൈൽ നമ്പർ / Mobile number *</FormLabel>
                        <FormControl>
                          <Input placeholder="10 digit mobile number" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aadhaar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ആധാർ നമ്പർ / Aadhaar number</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="12 digit Aadhaar number" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormDescription className="text-[10px] text-slate-400">Your Aadhaar number is encrypted and secure.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ഇമെയിൽ / Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
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
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ജനനത്തീയതി / Date of birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">പ്രായം / Age *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter your age" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ലിംഗഭേദം / Gender *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-8 pt-2"
                          >
                            <div className="flex items-center space-x-3 group cursor-pointer">
                              <RadioGroupItem value="സ്ത്രീ" id="female" className="size-5 border-2 border-slate-300 text-blue-600 focus:ring-blue-500" />
                              <Label htmlFor="female" className="font-bold text-slate-600 group-hover:text-blue-600 cursor-pointer transition-colors">സ്ത്രീ (Female)</Label>
                            </div>
                            <div className="flex items-center space-x-3 group cursor-pointer">
                              <RadioGroupItem value="പുരുഷൻ" id="male" className="size-5 border-2 border-slate-300 text-blue-600 focus:ring-blue-500" />
                              <Label htmlFor="male" className="font-bold text-slate-600 group-hover:text-blue-600 cursor-pointer transition-colors">പുരുഷൻ (Male)</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="caste"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-bold mb-2 block">ജാതി / Caste *</FormLabel>
                          <FormControl>
                            <Input placeholder="Caste" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="religion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-bold mb-2 block">മതം / Religion *</FormLabel>
                          <FormControl>
                            <Input placeholder="Religion" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="hasReservation"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">സംവരണം അർഹതയുള്ളവരാണോ? / Any Reservation? *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-8 pt-2"
                          >
                            <div className="flex items-center space-x-3 group cursor-pointer">
                              <RadioGroupItem value="ഉണ്ട്" id="res-yes" className="size-5 border-2 border-slate-300 text-blue-600 focus:ring-blue-500" />
                              <Label htmlFor="res-yes" className="font-bold text-slate-600 group-hover:text-blue-600 cursor-pointer transition-colors">ഉണ്ട് (Yes)</Label>
                            </div>
                            <div className="flex items-center space-x-3 group cursor-pointer">
                              <RadioGroupItem value="ഇല്ല" id="res-no" className="size-5 border-2 border-slate-300 text-blue-600 focus:ring-blue-500" />
                              <Label htmlFor="res-no" className="font-bold text-slate-600 group-hover:text-blue-600 cursor-pointer transition-colors">ഇല്ല (No)</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasReservation") === "ഉണ്ട്" && (
                    <FormField
                      control={form.control}
                      name="reservationCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-bold mb-2 block">സംവരണ വിഭാഗം / Reservation Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                              <SelectItem value="SC">SC</SelectItem>
                              <SelectItem value="ST">ST</SelectItem>
                              <SelectItem value="OBC">OBC</SelectItem>
                              <SelectItem value="WOMEN">WOMEN</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Guardian Information */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <ShieldCheck className="size-6 text-blue-100" />
                    രക്ഷാകർത്താവിന്റെ വിവരങ്ങൾ / Guardian Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">പിതാവിന്റെയോ / രക്ഷാകർത്താവിന്റെയോ പേര് / Father’s / Guardian’s name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter guardian's name" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">അപേക്ഷകനുമായുള്ള ബന്ധം / Relationship with applicant *</FormLabel>
                        <FormControl>
                          <Input placeholder="Relationship" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianMobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">രക്ഷാകർത്താവിന്റെ മൊബൈൽ നമ്പർ / Guardian mobile number *</FormLabel>
                        <FormControl>
                          <Input placeholder="10 digit mobile number" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Educational & College Information */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <GraduationCap className="size-6 text-blue-100" />
                    വിദ്യാഭ്യാസവും കോളേജ് വിവരങ്ങളും / Educational & College Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="educationalQualification"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">വിദ്യാഭ്യാസ യോഗ്യത / Educational qualification *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your highest qualification" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
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
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ജില്ല / District *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your district" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trainingCollegeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">പരിശീലന കോളേജിന്റെ പേര് / Training college name *</FormLabel>
                        <FormControl>
                          <Input placeholder="College name" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trainingCollegeCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">കോളേജ് കോഡ് / Training college code *</FormLabel>
                        <FormControl>
                          <Input placeholder="College code" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Course Information */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <BookOpen className="size-6 text-blue-100" />
                    കോഴ്സ് വിവരങ്ങൾ / Course Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="courseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">കോഴ്സിന്റെ പേര് / Course name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Course name" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">കാലയളവ് / Duration *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 6 Months, 1 Year" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referredBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">റഫർ ചെയ്ത ആൾ / കോർഡിനേറ്റർ / Referred by / Coordinator *</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of coordinator" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="principalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">പ്രിൻസിപ്പലിന്റെ പേര് / Principal name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Principal name" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <ClipboardList className="size-6 text-blue-100" />
                    നിബന്ധനകളും സത്യപ്രസ്താവനയും / Terms & Declaration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm space-y-4">
                    <h4 className="font-black text-lg text-blue-700 flex items-center gap-2">
                      <AlertCircle size={20} /> Terms & Conditions:
                    </h4>
                    <ol className="list-decimal pl-5 space-y-3 text-slate-600 font-medium">
                      <li>The fee once paid shall not be refunded under any circumstances.</li>
                      <li>The management reserves the right to refuse the admission of the candidate if he/she does not submit the required documents or complete all the admission formalities.</li>
                      <li>There is no placement/ Job offer guarantee.</li>
                    </ol>
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptedTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-[20px] border border-slate-100 p-6 bg-blue-50/30 hover:bg-blue-50 transition-colors cursor-pointer group">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="size-6 rounded-lg border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-all"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                            I have read the above terms and conditions; I accept all of them.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-[13px] leading-relaxed text-slate-600 font-medium">
                    <p>
                      മുകളിൽ പറഞ്ഞിട്ടുള്ള എല്ലാ കാര്യങ്ങളും സത്യമാണെന്നും യൂത്ത് എംപ്ലോയബിലിറ്റി സ്കിൽ ട്രെയിനിങ് കോ ഓപ്പറേറ്റീവ് എഡ്യൂക്കേഷണൽ സൊസൈറ്റി ലിമിറ്റഡിന്റെ എല്ലാ നിയമങ്ങളും അനുസരിച്ച് പൂർണ്ണ സമ്മതത്തോടുകൂടി പ്രവേശനം നേടുന്നതിനും സൊസൈറ്റിയുടെ മേൽനോട്ടത്തിൽ നടത്തപ്പെടുന്ന പരീക്ഷ എഴുതുന്നതിനും പൂർണ്ണ സമ്മതമാണെന്നും അച്ചടക്ക ലംഘന പ്രവർത്തനങ്ങളിൽ ഏർപ്പെടുകയില്ലെന്നും അങ്ങനെ ഏർപ്പെടുന്നതായി അധികാരികൾക്ക് ബോധ്യപ്പെട്ടാൽ മുന്നറിയിപ്പ് കൂടാതെ പിരിച്ചുവിടുന്നതിനും ഞാൻ പൂർണ്ണമായും സമ്മതിച്ചിരിക്കുന്നു
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptedDeclaration"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-[20px] border border-slate-100 p-6 bg-blue-50/30 hover:bg-blue-50 transition-colors cursor-pointer group">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="size-6 rounded-lg border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-all"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                            I Agreed
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Cloudflare Turnstile */}
              <div className="max-w-md mx-auto">
                {turnstileSiteKey && (
                  <div className="flex justify-center">
                    <div 
                      className="cf-turnstile" 
                      data-sitekey={turnstileSiteKey}
                      data-callback={(token: string) => setTurnstileToken(token)}
                      data-theme="light"
                    ></div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest px-8">
                  Your information is used only for admission processing. Please submit correct details as per your certificate.
                </p>
                <Button
                  type="submit"
                  className="w-full py-8 text-xl font-black rounded-3xl shadow-2xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 group"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-6 group-hover:scale-110 transition-transform" />
                      Submit Admission Application
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
      <StickyBanner />
      
      {/* Cloudflare Turnstile Script */}
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}
    </div>
  );
}
