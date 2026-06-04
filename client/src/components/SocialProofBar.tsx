import { ShieldCheck, Award, ThumbsUp } from "lucide-react";

export default function SocialProofBar() {
  return (
    <section className="bg-brand-light py-16 border-y border-brand-grey/10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
            Erfahrung mit Fahrzeugen führender Hersteller.
          </h2>
          <p className="mt-3 text-base text-brand-grey">
            Wir garantieren höchste Qualität durch erstklassig gewartete Fahrzeuge und professionelle Abwicklung.
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
              />
              <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-brand-cyan" />
                <span>Unser Fuhrpark</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-brand-navy">Großer Fuhrpark vor Ort</h3>
              <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                Direkter Zugriff auf eine Vielzahl von Fahrzeugklassen an unserem zentralen Standort in Leichlingen.
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
              />
              <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-cyan" />
                <span>Meisterwerkstatt</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-brand-navy">Geprüfte Qualität</h3>
              <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                Jedes Fahrzeug durchläuft vor der Übergabe einen strengen Sicherheitscheck in unserer modernen Werkstatt.
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
              />
              <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ThumbsUp className="h-3.5 w-3.5 text-brand-cyan" />
                <span>Persönlicher Service</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-brand-navy">Zuverlässige Übergabe</h3>
              <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                Persönliche Einweisung und flexible Bereitstellung – auf Wunsch liefern wir auch direkt zu Ihrer Einsatzstelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
