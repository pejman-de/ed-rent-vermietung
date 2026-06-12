import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Shield, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Zod validation schema
const formSchema = z.object({
  // Schritt 1
  fahrzeugtyp: z.string().min(1, "Bitte wählen Sie einen Fahrzeugtyp."),
  tonnage: z.string().min(1, "Bitte wählen Sie die gewünschte Tonnage."),
  mietdauer: z.string().min(1, "Bitte wählen Sie die Mietdauer."),
  starttermin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Bitte geben Sie ein gültiges Startdatum an.",
  }),
  plz: z.string().min(3, "Bitte geben Sie eine gültige PLZ oder Region ein."),
  bereitstellung: z.string().min(1, "Bitte wählen Sie eine Option."),
  nachricht: z.string().optional(),
  versicherung: z.boolean(),

  // Schritt 2
  vorname: z.string().min(2, "Bitte geben Sie Ihren Vornamen an."),
  nachname: z.string().min(2, "Bitte geben Sie Ihren Nachnamen an."),
  unternehmen: z.string().min(2, "Bitte geben Sie Ihr Unternehmen an."),
  email: z.string().min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.").email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  telefon: z.string().optional(),

  // Hidden fields
  offer_type: z.string(),
  lead_path: z.string(),
  page_variant: z.string(),
});

interface FormData {
  fahrzeugtyp: string;
  tonnage: string;
  mietdauer: string;
  starttermin: string;
  plz: string;
  bereitstellung: string;
  nachricht?: string;
  versicherung: boolean;
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon?: string;
  offer_type: string;
  lead_path: string;
  page_variant: string;
}

// Lead Scoring Algorithm Utility
function calculateLeadScore(data: FormData): { score: "Category A (Hot)" | "Category B (Warm)" | "Category C (Cold)"; points: number } {
  const today = new Date();
  const start = new Date(data.starttermin);
  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Parse Mietdauer for scoring
  const isLongTerm = data.mietdauer === "30plus" || data.mietdauer === "90plus";

  // Category A (Hot) conditions:
  // - Starttermin < 7 days from today
  // - OR Mietdauer > 30 days
  if (diffDays < 7 || isLongTerm) {
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
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      fahrzeugtyp: "",
      tonnage: "",
      mietdauer: "",
      starttermin: "",
      plz: "",
      bereitstellung: "",
      nachricht: "",
      versicherung: false,
      vorname: "",
      nachname: "",
      unternehmen: "",
      email: "",
      telefon: "",
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
      setStep(1); // Immer auf Schritt 1 starten bei Kachel-Klick
    }
  }, [selectedCategory, setValue]);

  const handleNextStep = async () => {
    // Validieren Sie AUSSCHLIESSLICH die Felder von Schritt 1
    const valid = await trigger([
      "fahrzeugtyp",
      "tonnage",
      "mietdauer",
      "starttermin",
      "plz",
      "bereitstellung",
    ]);
    if (valid) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Calculate Lead Score
      const leadScore = calculateLeadScore(data);
      
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
      setStep(1); // Zurück auf Schritt 1 nach erfolgreichem Reset
    } catch (error) {
      toast.error("Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" ref={ref} className="py-12 md:py-20 bg-brand-light scroll-mt-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
            Ihr Mietangebot in 24h.
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-brand-grey max-w-xl mx-auto">
            Kostenlos, unverbindlich und ohne Verkaufsgespräch. Formular ausfüllen, Angebot abwarten, fertig.
          </p>
        </div>

        {/* Form Container with Shadow */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-brand-grey/15 p-4 sm:p-6 md:p-10 shadow-xl relative overflow-hidden">
          
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
                onClick={() => {
                  setIsSuccess(false);
                  setStep(1);
                }}
                className="bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold px-6"
              >
                Weitere Anfrage senden
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Fortschrittsanzeige */}
              <div className="relative flex items-center justify-between max-w-md mx-auto mb-10">
              {/* Verbindungslinie */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-brand-grey/20 -z-0">
                <div 
                  className="h-full bg-brand-cyan transition-all duration-300"
                  style={{ width: step === 2 ? "100%" : "0%" }}
                />
              </div>

              {/* Schritt 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div 
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    step === 2 
                      ? "bg-brand-cyan text-brand-navy" 
                      : "bg-brand-cyan text-brand-navy ring-4 ring-brand-cyan/20"
                  }`}
                >
                  {step === 2 ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : "1"}
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-brand-navy mt-1.5">Fahrzeugdetails</span>
              </div>

              {/* Schritt 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div 
                  className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    step === 2 
                      ? "bg-brand-cyan text-brand-navy ring-4 ring-brand-cyan/20" 
                      : "bg-brand-cyan/20 text-brand-navy"
                  }`}
                >
                  2
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-brand-navy mt-1.5">Ihre Kontaktdaten</span>
              </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* SCHRITT 1: Fahrzeugdetails */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="space-y-4 sm:space-y-6"
                    >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
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
                            <span>{errors.fahrzeugtyp.message as string}</span>
                          </p>
                        )}
                      </div>

                      {/* Gewünschte Tonnage */}
                      <div className="space-y-2">
                        <Label htmlFor="tonnage" className="font-semibold text-brand-navy">Gewünschte Tonnage *</Label>
                        <Select
                          value={watch("tonnage")}
                          onValueChange={(val) => setValue("tonnage", val, { shouldValidate: true })}
                        >
                          <SelectTrigger className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white">
                            <SelectValue placeholder="Bitte wählen..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2_6t">2,6 t</SelectItem>
                            <SelectItem value="3_5t">3,5 t</SelectItem>
                            <SelectItem value="5_5t">5,5 t</SelectItem>
                            <SelectItem value="7_5t">7,5 t</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.tonnage && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.tonnage.message as string}</span>
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
                            <span>{errors.mietdauer.message as string}</span>
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
                            <span>{errors.starttermin.message as string}</span>
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
                            <span>{errors.plz.message as string}</span>
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
                            <span>{errors.bereitstellung.message as string}</span>
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Ihre Nachricht / Sonderwünsche */}
                    <div className="space-y-1.5">
                      <Label htmlFor="nachricht" className="font-semibold text-brand-navy text-sm sm:text-base">Ihre Nachricht / Sonderwünsche (optional)</Label>
                      <Textarea
                        id="nachricht"
                        placeholder="Spezielle Anforderungen wie Ladebordwand, AHK, etc."
                        {...register("nachricht")}
                        className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan bg-white min-h-[80px] text-sm sm:text-base p-2.5"
                      />
                    </div>

                    {/* Add-on Versicherungspaket */}
                    <div className="p-3 sm:p-4 rounded-xl bg-brand-light border border-brand-grey/10 flex items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-brand-cyan shrink-0 mt-0.5" />
                        <div>
                          <Label htmlFor="versicherung" className="font-bold text-brand-navy text-xs sm:text-sm cursor-pointer">
                            Add-on Versicherungspaket hinzufügen
                          </Label>
                          <p className="text-[10px] sm:text-xs text-brand-grey mt-0.5 leading-tight">
                            Vollkaskoversicherung mit reduzierter Selbstbeteiligung für maximale Sorgenfreiheit.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center shrink-0">
                        <Checkbox
                          id="versicherung"
                          checked={watch("versicherung")}
                          onCheckedChange={(checked) => setValue("versicherung", !!checked)}
                          className="h-5 w-5 sm:h-6 sm:w-6 border-brand-grey text-brand-cyan focus:ring-brand-cyan"
                        />
                      </div>
                    </div>

                      {/* Button Schritt 1 */}
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-sm sm:text-base py-4 sm:py-6 shadow-lg shadow-brand-cyan/10 hover:shadow-brand-cyan/20 transition-all active:scale-98 flex items-center justify-center gap-2"
                      >
                        <span>Weiter zu Schritt 2</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </motion.div>
                  )}

                  {/* SCHRITT 2: Kontaktdaten */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="space-y-4 sm:space-y-6"
                    >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                      {/* Vorname */}
                      <div className="space-y-2">
                        <Label htmlFor="vorname" className="font-semibold text-brand-navy">Vorname *</Label>
                        <Input
                          type="text"
                          id="vorname"
                          placeholder="z.B. Max"
                          {...register("vorname")}
                          className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white"
                        />
                        {errors.vorname && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.vorname.message as string}</span>
                          </p>
                        )}
                      </div>

                      {/* Nachname */}
                      <div className="space-y-2">
                        <Label htmlFor="nachname" className="font-semibold text-brand-navy">Nachname *</Label>
                        <Input
                          type="text"
                          id="nachname"
                          placeholder="z.B. Mustermann"
                          {...register("nachname")}
                          className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white"
                        />
                        {errors.nachname && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.nachname.message as string}</span>
                          </p>
                        )}
                      </div>

                      {/* Unternehmen */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="unternehmen" className="font-semibold text-brand-navy">Unternehmen *</Label>
                        <Input
                          type="text"
                          id="unternehmen"
                          placeholder="z.B. Logistik GmbH"
                          {...register("unternehmen")}
                          className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white"
                        />
                        {errors.unternehmen && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.unternehmen.message as string}</span>
                          </p>
                        )}
                      </div>

                      {/* E-Mail */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="font-semibold text-brand-navy">E-Mail-Adresse *</Label>
                        <Input
                          type="email"
                          id="email"
                          placeholder="z.B. info@firma.de"
                          {...register("email")}
                          className="border-brand-grey/30 focus:border-brand-cyan focus:ring-brand-cyan h-11 bg-white"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>{errors.email.message as string}</span>
                          </p>
                        )}
                      </div>

                      {/* Telefon */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="telefon" className="font-semibold text-brand-navy">Telefonnummer (optional)</Label>
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
                            <span>{errors.telefon.message as string}</span>
                          </p>
                        )}

                      </div>
                    </div>

                      {/* Buttons Schritt 2 */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          variant="outline"
                          className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold py-4 sm:py-6 flex-1 flex items-center justify-center gap-2 text-sm sm:text-base order-2 sm:order-1"
                        >
                          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span>Zurück</span>
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-sm sm:text-base py-4 sm:py-6 shadow-lg shadow-brand-cyan/10 hover:shadow-brand-cyan/20 transition-all active:scale-98 flex-1 order-1 sm:order-2"
                        >
                          {isSubmitting ? "Anfrage wird gesendet..." : "Mietangebot anfordern"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hidden Fields */}
                <input type="hidden" {...register("offer_type")} />
                <input type="hidden" {...register("lead_path")} />
                <input type="hidden" {...register("page_variant")} />
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

LeadForm.displayName = "LeadForm";
export default LeadForm;
