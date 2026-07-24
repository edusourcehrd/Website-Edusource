"use client";

import React from "react";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, ShieldCheck, Languages, Lock, CheckCircle2, AlertCircle, ClipboardList } from "lucide-react";

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
    onTurnstileSuccess?: (token: string) => void;
    onTurnstileExpired?: () => void;
    onTurnstileError?: () => void;
  }
}

const germanAdmissionSchema = z.object({
  fullName: z.string().min(1, "പൂർണ്ണനാമം ആവശ്യമാണ് / Full name is required"),
  dateOfBirth: z.string().min(1, "ജനനത്തീയതി ആവശ്യമാണ് / Date of birth is required"),
  gender: z.enum(["സ്ത്രീ / Female", "പുരുഷൻ / Male", "മറ്റുളളവ / Other"], {
    message: "ലിംഗഭേദം തിരഞ്ഞെടുക്കുക / Please select gender",
  }),
  email: z.string().email("അസാധുവായ ഇമെയിൽ / Invalid email address"),
  mobile: z.string().regex(/^[6789]\d{9}$/, "അസാധുവായ മൊബൈൽ നമ്പർ (10 അക്കങ്ങൾ വേണം) / Invalid mobile number (10 digits starting with 6-9)"),
  address: z.string().min(1, "മേൽവിലാസം ആവശ്യമാണ് / Current address is required"),
  educationalQualification: z.string().min(1, "വിദ്യാഭ്യാസ യോഗ്യത ആവശ്യമാണ് / Educational qualification is required"),
  guardianName: z.string().min(1, "രക്ഷിതാവിന്റെ പേര് ആവശ്യമാണ് / Parent or Guardian's name is required"),
  guardianMobile: z.string().regex(/^[6789]\d{9}$/, "അസാധുവായ മൊബൈൽ നമ്പർ / Invalid parent mobile number"),
  germanLevel: z.string().min(1, "ജർമ്മൻ ലെവൽ തിരഞ്ഞെടുക്കുക / Please select German level"),
  preferredMode: z.string().min(1, "പഠന രീതി തിരഞ്ഞെടുക്കുക / Please select preferred mode"),
  referralSource: z.string().min(1, "റഫറൽ ഉറവിടം ആവശ്യമാണ് / Referral source is required"),
  acceptedTerms: z.boolean().refine(Boolean, {
    message: "നിങ്ങൾ നിബന്ധനകൾ അംഗീകരിക്കണം / You must accept the terms and conditions",
  }),
  acceptedDeclaration: z.boolean().refine(Boolean, {
    message: "നിങ്ങൾ സത്യപ്രസ്താവന അംഗീകരിക്കണം / You must accept the declaration",
  }),
  website: z.string().optional(), // Honeypot
});

type GermanAdmissionFormValues = z.infer<typeof germanAdmissionSchema>;

export default function GermanAdmissionForm() {
  const [formStartTime] = React.useState(Date.now());
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null);

  const form = useForm<GermanAdmissionFormValues>({
    resolver: zodResolver(germanAdmissionSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: undefined,
      email: "",
      mobile: "",
      address: "",
      educationalQualification: "",
      guardianName: "",
      guardianMobile: "",
      germanLevel: "",
      preferredMode: "",
      referralSource: "",
      acceptedTerms: false,
      acceptedDeclaration: false,
      website: "",
    },
  });

  const onSubmit = async (data: GermanAdmissionFormValues) => {
    if (data.website) {
      toast.error("Spam detected.");
      return;
    }

    if (Date.now() - formStartTime < 6000) {
      toast.error("Please review the form before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/admission-german", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          phoneNumber: data.mobile,
          currentAddress: data.address,
          educationalBackground: data.educationalQualification,
          parentGuardianName: data.guardianName,
          parentGuardianPhone: data.guardianMobile,
          heardFrom: data.referralSource,
          termsAccepted: data.acceptedTerms,
          declarationAccepted: data.acceptedDeclaration,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("German Language Program Application submitted successfully. Edusource HRD Centre will contact you soon.");
        form.reset();
        setTurnstileToken(null);
        if (typeof window !== "undefined" && window.turnstile) {
          window.turnstile.reset();
        }
      } else {
        toast.error(result.message || "Something went wrong while submitting. Please try again or contact Edusource HRD Centre.");
      }
    } catch (error) {
      console.error("German admission submission error:", error);
      toast.error("Something went wrong while submitting. Please try again or contact Edusource HRD Centre.");
    }
  };

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  React.useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };
    window.onTurnstileExpired = () => {
      setTurnstileToken(null);
    };
    window.onTurnstileError = () => {
      setTurnstileToken(null);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff]">
      <Navbar />
      <main className="flex-grow pt-36 md:pt-44 pb-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
              <Lock size={12} className="text-emerald-500" />
              German Language Training Admission
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-950 mb-3 tracking-tight">
              ജർമ്മൻ ഭാഷാ പഠന അപേക്ഷ <span className="text-emerald-600 block sm:inline">/ German Admission Form</span>
            </h1>
            
            <div className="space-y-2 mt-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 leading-tight">
                Edusource HRD Centre, Kollam
              </h2>
              <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs md:text-sm">
                Professional German Language Training Program (A1 - B2)
              </p>
            </div>
          </div>

          {/* Secure Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: ShieldCheck, text: "Secure Admission Portal" },
              { icon: Lock, text: "Data Used Only for Admission" },
              { icon: CheckCircle2, text: "Government Recognized Institution" }
            ].map((badge, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <badge.icon className="size-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{badge.text}</span>
              </div>
            ))}
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
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <User className="size-6 text-emerald-100" />
                    വ്യക്തിഗത വിവരങ്ങൾ / Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">പൂർണ്ണനാമം / Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
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
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ജനനത്തീയതി / Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
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
                            className="flex flex-wrap gap-6 pt-2"
                          >
                            <div className="flex items-center space-x-2 group cursor-pointer">
                              <RadioGroupItem value="സ്ത്രീ / Female" id="g-female" className="size-5 border-2 border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                              <Label htmlFor="g-female" className="font-bold text-slate-600 group-hover:text-emerald-600 cursor-pointer transition-colors text-sm">സ്ത്രീ (Female)</Label>
                            </div>
                            <div className="flex items-center space-x-2 group cursor-pointer">
                              <RadioGroupItem value="പുരുഷൻ / Male" id="g-male" className="size-5 border-2 border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                              <Label htmlFor="g-male" className="font-bold text-slate-600 group-hover:text-emerald-600 cursor-pointer transition-colors text-sm">പുരുഷൻ (Male)</Label>
                            </div>
                            <div className="flex items-center space-x-2 group cursor-pointer">
                              <RadioGroupItem value="മറ്റുളളവ / Other" id="g-other" className="size-5 border-2 border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                              <Label htmlFor="g-other" className="font-bold text-slate-600 group-hover:text-emerald-600 cursor-pointer transition-colors text-sm">മറ്റുളളവ (Other)</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ഇമെയിൽ / Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
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
                        <FormLabel className="text-slate-700 font-bold mb-2 block">മൊബൈൽ നമ്പർ / Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="10 digit mobile number" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
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
                        <FormLabel className="text-slate-700 font-bold mb-2 block">മേൽവിലാസം / Current Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your current address with pincode" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="educationalQualification"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">വിദ്യാഭ്യാസ യോഗ്യത / Educational Background *</FormLabel>
                        <FormControl>
                          <Input placeholder="Highest qualification (e.g. Plus Two, General Nursing, BSc Nursing, Graduation)" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Parent & Guardian Info */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <ShieldCheck className="size-6 text-emerald-100" />
                    രക്ഷിതാവിന്റെ വിവരങ്ങൾ / Parent & Guardian Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">രക്ഷിതാവിന്റെ പേര് / Parent Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Parent / Guardian name" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
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
                        <FormLabel className="text-slate-700 font-bold mb-2 block">രക്ഷിതാവിന്റെ ഫോൺ നമ്പർ / Parent Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="10 digit parent mobile number" {...field} className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Course & Mode Info */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <Languages className="size-6 text-emerald-100" />
                    ഭാഷാ കോഴ്സ് വിവരങ്ങൾ / German Course & Mode Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="germanLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-bold mb-2 block">ജർമ്മൻ ലെവൽ / German Level *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl">
                              <SelectValue placeholder="Select German Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                            <SelectItem value="Beginner / A1">A1 Level (Beginner)</SelectItem>
                            <SelectItem value="Elementary / A2">A2 Level (Elementary)</SelectItem>
                            <SelectItem value="Intermediate / B1">B1 Level (Intermediate)</SelectItem>
                            <SelectItem value="Upper Intermediate / B2">B2 Level (Upper Intermediate)</SelectItem>
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
                        <FormLabel className="text-slate-700 font-bold mb-2 block">പഠന രീതി / Preferred Mode *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl">
                              <SelectValue placeholder="Select Preferred Mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                            <SelectItem value="Offline (Classroom Batch)">Offline (Classroom Batch)</SelectItem>
                            <SelectItem value="Online (Live Interactive)">Online (Live Interactive)</SelectItem>
                            <SelectItem value="Hybrid (Offline + Online)">Hybrid (Offline + Online)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-slate-700 font-bold mb-2 block">എങ്ങനെ അറിഞ്ഞു? / Referral Source *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all rounded-xl">
                              <SelectValue placeholder="Select how you heard about Edusource HRD" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-2xl border-slate-100 shadow-xl">
                            <SelectItem value="Social Media (Instagram / Facebook / YouTube)">Social Media (Instagram / Facebook / YouTube)</SelectItem>
                            <SelectItem value="Friend or Relative">Friend or Relative</SelectItem>
                            <SelectItem value="Newspaper / Poster / Banner">Newspaper / Poster / Banner</SelectItem>
                            <SelectItem value="Academic Coordinator">Academic Coordinator</SelectItem>
                            <SelectItem value="Official Website Search">Official Website Search</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <Card className="border border-slate-100 shadow-xl shadow-blue-50/50 rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-6">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <ClipboardList className="size-6 text-emerald-100" />
                    നിബന്ധനകളും സത്യപ്രസ്താവനയും / Terms & Declaration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* TERMS inside scrollable card */}
                  <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/80 text-sm space-y-4 max-h-56 overflow-y-auto shadow-inner scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                    <h4 className="font-black text-lg text-emerald-700 flex items-center gap-2 sticky top-0 bg-slate-50/90 py-1 backdrop-blur-sm z-10">
                      <AlertCircle size={20} /> Terms & Conditions:
                    </h4>
                    <ol className="list-decimal pl-5 space-y-3 text-slate-700 font-medium leading-relaxed">
                      <li>All fees paid towards the German Language Training program are non-refundable under any circumstances.</li>
                      <li>Students are expected to maintain discipline and decorum during the course.</li>
                      <li>Misbehavior, harassment or misconduct may lead to suspension or termination without refund.</li>
                      <li>This programme is strictly for educational purposes.</li>
                      <li>The institution does not guarantee job placements, internships or employment opportunities after completion.</li>
                    </ol>
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptedTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-[20px] border border-slate-100 p-6 bg-emerald-50/30 hover:bg-emerald-50 transition-colors cursor-pointer group">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="size-6 rounded-lg border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 transition-all"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">
                            I Agree
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* DECLARATION inside scrollable card */}
                  <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200/80 text-[13px] leading-relaxed text-slate-700 font-medium max-h-40 overflow-y-auto shadow-inner scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                    <h4 className="font-black text-base text-emerald-700 mb-2 flex items-center gap-2 sticky top-0 bg-slate-50/90 py-1 backdrop-blur-sm z-10">
                      <ShieldCheck size={18} /> DECLARATION:
                    </h4>
                    <p className="leading-relaxed font-semibold text-slate-700">
                      I have read and understood the Terms and Conditions and agree to follow the rules and regulations of the institution.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptedDeclaration"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-[20px] border border-slate-100 p-6 bg-emerald-50/30 hover:bg-emerald-50 transition-colors cursor-pointer group">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="size-6 rounded-lg border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 transition-all"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">
                            I Agree
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
                      data-callback="onTurnstileSuccess"
                      data-expired-callback="onTurnstileExpired"
                      data-error-callback="onTurnstileError"
                      data-theme="light"
                    ></div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest px-8">
                  Your information is used only for German language training admission processing. Please submit correct details.
                </p>
                <Button
                  type="submit"
                  className="w-full py-8 text-xl font-black rounded-3xl shadow-2xl shadow-emerald-200 hover:scale-[1.02] active:scale-95 transition-all bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-3 group"
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
                      Submit German Admission Application
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
