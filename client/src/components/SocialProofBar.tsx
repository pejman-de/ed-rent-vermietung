import { ShieldCheck, Award, ThumbsUp } from "lucide-react";

export default function SocialProofBar() {
  return (
    <section className="bg-brand-light py-16 border-y border-brand-grey/10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
            Fahrzeuge, die nicht streiken.
          </h2>
          <p className="mt-3 text-base text-brand-grey">
            Top gewartet, ehrlich geprüft, sauber übergeben. Genau die Zuverlässigkeit, auf die Ihr Zeitplan baut.
          </p>
        </div>

        {/* 3-Column Grid for real images (Hof, Werkstatt, Übergabe) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Hof / Flotte */}
          <div className="group overflow-hidden rounded-xl bg-white border border-brand-grey/10 shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/MSs49dKTPCBrBa2mMEGFXR/hero-trucks-o63nWYNkcFAJ4M2Z6GtHV7.webp"
                alt="Fahrzeughof in Leichlingen"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width="735"
                height="459"
              />
              <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-brand-cyan" />
                <span>Unser Fuhrpark</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-brand-navy">Großer Fuhrpark vor Ort</h3>
              <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                Viele Fahrzeugklassen an einem zentralen Standort in Leichlingen. Wahrscheinlich steht das passende schon bereit.
              </p>
            </div>
          </div>

          {/* Card 2: Werkstatt */}
          <div className="group overflow-hidden rounded-xl bg-white border border-brand-grey/10 shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/MSs49dKTPCBrBa2mMEGFXR/workshop-8RJprvZRnAsjf5wqqiQyRa.webp"
                alt="Professionelle LKW Werkstatt"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width="735"
                height="459"
              />
              <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-cyan" />
                <span>Meisterwerkstatt</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-brand-navy">Geprüfte Qualität</h3>
              <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                Jedes Fahrzeug läuft vor der Übergabe durch unsere Werkstatt. Pannen überlassen wir lieber der Konkurrenz.
              </p>
            </div>
          </div>

          {/* Card 3: Übergabe */}
          <div className="group overflow-hidden rounded-xl bg-white border border-brand-grey/10 shadow-sm hover:shadow-md transition-all">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281979359/MSs49dKTPCBrBa2mMEGFXR/handover-UFeNb2qdxiVJQknhkTnyDf.webp"
                alt="Fahrzeugübergabe an Kunden"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width="735"
                height="459"
              />
              <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ThumbsUp className="h-3.5 w-3.5 text-brand-cyan" />
                <span>Persönlicher Service</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-brand-navy">Zuverlässige Übergabe</h3>
              <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                Persönliche Einweisung, alles erklärt, auf Wunsch direkt zu Ihrer Baustelle geliefert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
