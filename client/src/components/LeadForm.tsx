import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Zod validation schema
const formSchema = z.object({
  fahrzeugtyp: z.string().min(1, "Bitte wählen Sie einen Fahrzeugtyp."),
  mietdauer: z.string().min(1, "Bitte wählen Sie die Mietdauer."),
  starttermin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Bitte geben Sie ein gültiges Startdatum an.",
  }),
  plz: z.string().min(3, "Bitte geben Sie eine gültige PLZ oder Region ein."),
  bereitstellung: z.string().min(1, "Bitte wählen Sie eine Option."),
  ueber75t: z.enum(["ja", "nein"]),
  firmaName: z.string().min(3, "Bitte geben Sie Ihren Firmennamen und Namen an."),
  telefon: z.string().min(5, "Bitte geben Sie eine gültige Telefonnummer an."),
  nachricht: z.string().optional(),
  versicherung: z.boolean().default(false),
  // Hidden fields
  offer_type: z.string().default("vermietung"),
  lead_path: z.string().default("direct"),
  page_variant: z.string().default("lp-vermietung"),
});

type FormData = z.infer<typeof formSchema>;

// Lead Scoring Algorithm Utility
function calculateLeadScore(data: FormData): { score: "Category A (Hot)" | "Category B (Warm)" | "Category C (Cold)"; points: number } {
  const today = new Date();
  const start = new Date(data.starttermin);
  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isOver75t = data.ueber75t === "ja";
  
  // Parse Mietdauer for scoring
  const isLongTerm = data.mietdauer === "30plus" || data.mietdauer === "90plus";

  // Category A (Hot) conditions:
  // - Starttermin < 7 days from today
  // - OR Fahrzeugklasse > 7,5t == Yes
  // - OR Mietdauer > 30 days
  if (diffDays < 7 || isOver75t || isLongTerm) {
    return { score: "Category A (Hot)", points: 100 };
  }

  // Category B (Warm) conditions:
  // - Starttermin is between 7 and 21 days from today
  if (diffDays >= 7 && diffDays <= 21) {
    return { score: "Category B (Warm)", points: 50 };
  }

  // Category C (Cold) conditions:
  // - default fallback / incomplete or far in future
  return { score: "Category C (Cold)", points: 10 };
}

interface LeadFormProps {
  selectedCategory?: string;
}

const LeadForm = forwardRef<HTMLDivElement, LeadFormProps>(({ selectedCategory }, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fahrzeugtyp: "",
      mietdauer: "",
      starttermin: "",
      plz: "",
      bereitstellung: "",
      ueber75t: "nein",
      firmaName: "",
      telefon: "",
      nachricht: "",
      versicherung: false,
      offer_type: "vermietung",
      lead_path: "direct",
      page_variant: "lp-vermietung",
    },
  });

  // Update selected vehicle type if user clicks on a vehicle category card
  useEffect(() => {
    if (selectedCategory) {
      const lowerCategory = selectedCategory.toLowerCase();
      setValue("fahrzeugtyp", lowerCategory);
    }
  }, [selectedCategory, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Calculate Lead Score
      const leadScore = calculateLeadScore(data as FormData);
      
      // Log the payload and score to console as required by spec
      console.group("📥 ED Rent & Sale - Lead Form Submission");
      console.log("Payload:", data);
      console.log("Lead Score Result:", leadScore);
      console.groupEnd();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast.success("Anfrage erfolgreich gesendet! Wir melden uns in Kürze.");
      reset();
    } catch (error) {
      toast.error("Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" ref={ref} className="py-20 bg-brand-light scroll-mt-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Ihr Mietangebot in 24h.
          </h2>
          <p className="mt-3 text-lg text-brand-grey">
            Kostenlos, unverbindlich und ohne Verkaufsgespräch. Formular ausfüllen, Angebot abwarten, fertig.
          </p>
        </div>

        {/* Form Container with Shadow */}
        <div className="bg-white rounded-2xl border border-brand-grey/15 p-6 md:p-10 shadow-xl relative overflow-hidden">
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-cyan animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-brand-navy">Vielen Dank für Ihre Anfrage!</h3>
                <p className="text-brand-grey max-w-md mx-auto">
                  Ihre Daten wurden erfolgreich übermittelt. Unser B2B-Team prüft Ihre Anfrage und sendet Ihnen innerhalb von 24 Stunden Ihr individuelles Mietangebot zu.
                </p>
              </div>
              <Button 
                onClick={() => setIsSuccess(false)}
                className="bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold px-6"
              >
                Weitere Anfrage senden
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Vehicle Specs */}
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-4 pb-2 border-b border-brand-grey/10 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-navy text-xs font-bold">1</span>
                  Fahrzeugdetails
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fahrzeugtyp */}
                  <div className="space-y-2">
                    <Label htmlFor="fahrzeugtyp" className="font-semibold text-brand-navy">Fahrzeugtyp *</Label>
                    <Select
                      value={watch("fahrzeugtyp")}
                      onValueChange={(val) => setValue("fahrzeugtyp", val, { shouldValidate: true })}
                    >
                      <SelectTrigger className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white">
                        <SelectValue placeholder="Bitte wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sprinter">Sprinter (bis 3,5t)</SelectItem>
                        <SelectItem value="transporter">Transporter (3,5t - 7,5t)</SelectItem>
                        <SelectItem value="wechselbruecke">Wechselbrücke (BDF System)</SelectItem>
                        <SelectItem value="kipper">Kipper (Bau & Schüttgut)</SelectItem>
                        <SelectItem value="sattelzug">Sattelzug (Schwerer Fernverkehr)</SelectItem>
                        <SelectItem value="gliederzug">Gliederzug (Großvolumen)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fahrzeugtyp && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.fahrzeugtyp.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Mietdauer */}
                  <div className="space-y-2">
                    <Label htmlFor="mietdauer" className="font-semibold text-brand-navy">Mietdauer *</Label>
                    <Select
                      value={watch("mietdauer")}
                      onValueChange={(val) => setValue("mietdauer", val, { shouldValidate: true })}
                    >
                      <SelectTrigger className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white">
                        <SelectValue placeholder="Bitte wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-7">Tagesmiete (1 - 7 Tage)</SelectItem>
                        <SelectItem value="8-30">Wochenmiete (8 - 30 Tage)</SelectItem>
                        <SelectItem value="30plus">Monatsmiete (1 - 3 Monate)</SelectItem>
                        <SelectItem value="90plus">Langzeitmiete (&gt; 3 Monate)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.mietdauer && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.mietdauer.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Starttermin */}
                  <div className="space-y-2">
                    <Label htmlFor="starttermin" className="font-semibold text-brand-navy">Gewünschter Starttermin *</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        id="starttermin"
                        {...register("starttermin")}
                        className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white pl-10"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-grey" />
                    </div>
                    {errors.starttermin && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.starttermin.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Einsatzregion / PLZ */}
                  <div className="space-y-2">
                    <Label htmlFor="plz" className="font-semibold text-brand-navy">Einsatzregion / PLZ *</Label>
                    <Input
                      type="text"
                      id="plz"
                      placeholder="z.B. 42799 oder Leichlingen"
                      {...register("plz")}
                      className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white"
                    />
                    {errors.plz && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.plz.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Abholung oder Lieferung */}
                  <div className="space-y-2">
                    <Label htmlFor="bereitstellung" className="font-semibold text-brand-navy">Bereitstellung *</Label>
                    <Select
                      value={watch("bereitstellung")}
                      onValueChange={(val) => setValue("bereitstellung", val, { shouldValidate: true })}
                    >
                      <SelectTrigger className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white">
                        <SelectValue placeholder="Bitte wählen..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abholung">Selbstabholung in Leichlingen</SelectItem>
                        <SelectItem value="lieferung">Lieferung an Einsatzort</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.bereitstellung && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.bereitstellung.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Fahrzeugklasse über 7,5t */}
                  <div className="space-y-3">
                    <Label className="font-semibold text-brand-navy block">Fahrzeugklasse über 7,5t? *</Label>
                    <RadioGroup
                      value={watch("ueber75t")}
                      onValueChange={(val) => setValue("ueber75t", val as "ja" | "nein")}
                      className="flex gap-6 pt-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ja" id="over-75-yes" className="border-brand-grey text-brand-cyan focus:ring-brand-cyan" />
                        <Label htmlFor="over-75-yes" className="font-medium text-brand-navy cursor-pointer">Ja</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nein" id="over-75-no" className="border-brand-grey text-brand-cyan focus:ring-brand-cyan" />
                        <Label htmlFor="over-75-no" className="font-medium text-brand-navy cursor-pointer">Nein</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Step 2: Contact Details */}
              <div>
                <h3 className="text-lg font-bold text-brand-navy mb-4 pb-2 border-b border-brand-grey/10 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/20 text-brand-navy text-xs font-bold">2</span>
                  Kontaktdaten & Absender
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Firma & Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firmaName" className="font-semibold text-brand-navy">Firma & Name *</Label>
                    <Input
                      type="text"
                      id="firmaName"
                      placeholder="z.B. Logistik GmbH, Herr Schmidt"
                      {...register("firmaName")}
                      className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white"
                    />
                    {errors.firmaName && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.firmaName.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Telefon */}
                  <div className="space-y-2">
                    <Label htmlFor="telefon" className="font-semibold text-brand-navy">Telefonnummer *</Label>
                    <Input
                      type="tel"
                      id="telefon"
                      placeholder="z.B. +49 170 1234567"
                      {...register("telefon")}
                      className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white"
                    />
                    {errors.telefon && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{errors.telefon.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Nachricht (Optional) */}
                <div className="mt-6 space-y-2">
                  <Label htmlFor="nachricht" className="font-semibold text-brand-navy">Ihre Nachricht / Sonderwünsche (optional)</Label>
                  <Textarea
                    id="nachricht"
                    placeholder="Spezielle Anforderungen wie Ladebordwand, AHK, etc."
                    {...register("nachricht")}
                    className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan bg-white min-h-[100px]"
                  />
                </div>
              </div>

              {/* Step 3: Add-on Options */}
              <div className="p-4 rounded-xl bg-brand-light border border-brand-grey/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
                  <div>
                    <Label htmlFor="versicherung" className="font-bold text-brand-navy cursor-pointer">
                      Add-on Versicherungspaket hinzufügen
                    </Label>
                    <p className="text-xs text-brand-grey mt-0.5">
                      Vollkaskoversicherung mit reduzierter Selbstbeteiligung für maximale Sorgenfreiheit im Einsatz.
                    </p>
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <Checkbox
                    id="versicherung"
                    checked={watch("versicherung")}
                    onCheckedChange={(checked) => setValue("versicherung", !!checked)}
                    className="h-6 w-6 border-brand-grey text-brand-cyan focus:ring-brand-cyan"
                  />
                </div>
              </div>

              {/* Hidden Fields */}
              <input type="hidden" {...register("offer_type")} />
              <input type="hidden" {...register("lead_path")} />
              <input type="hidden" {...register("page_variant")} />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-base py-6 shadow-lg shadow-brand-cyan/10 hover:shadow-brand-cyan/20 transition-all active:scale-98"
              >
                {isSubmitting ? "Anfrage wird gesendet..." : "Mietangebot anfordern"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
});

LeadForm.displayName = "LeadForm";
export default LeadForm;
