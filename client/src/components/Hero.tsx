import { CheckCircle2, ArrowRight, ShieldCheck, Warehouse, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onCtaClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onCtaClick, onExploreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-light to-white py-16 md:py-24 lg:py-32">
      {/* Background Decorative Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6e7c950a_1px,transparent_1px),linear-gradient(to_bottom,#6e7c950a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col space-y-8 lg:col-span-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-semibold text-brand-navy md:text-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
              Nutzfahrzeugvermietung Leichlingen
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl md:text-6xl lg:leading-[1.1]">
              Heute angefragt.
              <span className="block text-brand-cyan mt-1">Morgen unterwegs.</span>
            </h1>
            
            <p className="max-w-xl text-lg text-brand-grey leading-relaxed md:text-xl">
              Vom Sprinter bis zum Sattelzug. Geprüfte Fahrzeuge, fairer Preis, Versicherung auf Wunsch. Damit Ihr Auftrag rollt, auch wenn Ihr Fuhrpark gerade nicht mitspielt.
            </p>
            
            <p className="text-xs text-brand-grey/80 italic">
              * Gilt für gewerbliche Kunden. Bonitätsprüfung vorbehalten.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onCtaClick}
              size="lg"
              className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold text-base px-8 py-6 shadow-lg shadow-brand-cyan/10 hover:shadow-brand-cyan/20 transition-all active:scale-97"
            >
              Mietangebot in 24h
            </Button>
            <Button
              onClick={onExploreClick}
              variant="outline"
              size="lg"
              className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white font-semibold text-base px-8 py-6 transition-all active:scale-97" style={{height: '48px'}}
            >
              Fahrzeuge ansehen
            </Button>
          </div>

          {/* Value Checkmarks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-grey/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan">
                <Zap className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-navy">Angebot in 24h</span>
                <span className="text-xs text-brand-grey">garantiert schnell</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan">
                <Warehouse className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-navy">Bestand vor Ort</span>
                <span className="text-xs text-brand-grey">in Leichlingen</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-navy">Versicherung optional</span>
                <span className="text-xs text-brand-grey">rundum geschützt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Hero with Glassmorphism overlay */}
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-brand-grey/10">
            {/* Real high-quality generated image */}
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/MSs49dKTPCBrBa2mMEGFXR/hero-trucks-o63nWYNkcFAJ4M2Z6GtHV7.webp"
              alt="ED Rent & Sale Nutzfahrzeug Flotte"
              className="h-full w-full object-cover"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width="880"
              height="495"
            />
            
            {/* Subtle Glassmorphism Overlay */}
            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-brand-navy/65 p-6 text-white backdrop-blur-md md:p-8">
              <div className="flex flex-col space-y-2">
                <div className="text-xs font-bold tracking-widest text-brand-cyan uppercase">
                  Sofort einsatzbereit
                </div>
                <div className="text-lg font-bold md:text-xl">
                  Premium-Mietfuhrpark für Logistik & Bau
                </div>
                <p className="text-xs text-white/80 leading-relaxed md:text-sm">
                  Alle Fahrzeuge sind technisch geprüft und vollgetankt startklar. Holen Sie Ihr Fahrzeug direkt bei uns ab oder lassen Sie es liefern. Den Rest erledigen Sie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
