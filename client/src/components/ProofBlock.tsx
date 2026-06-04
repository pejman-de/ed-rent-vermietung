import { MapPin, CheckCircle, Truck } from "lucide-react";

export default function ProofBlock() {
  const cards = [
    {
      icon: MapPin,
      title: "Standort Leichlingen",
      subtitle: "Zentral & gut erreichbar",
      description: "Strategisch günstig im Raum Köln/Düsseldorf. Kurze Wege bedeuten weniger Ausfallzeit bei Abholung und Tausch.",
      details: ["Direkte Autobahnanbindung", "Großes Gelände für Übergaben", "Flexible Abholzeiten"],
    },
    {
      icon: CheckCircle,
      title: "Reibungsloser Prozess",
      subtitle: "Keine B2B-Bürokratie",
      description: "Im Transportwesen zählt jede Stunde. Darum halten wir alles schlank, von der Anfrage bis zur Übergabe.",
      details: ["Digitale Vertragsabwicklung", "Fester B2B-Ansprechpartner", "Schnelle Schadensregulierung"],
    },
    {
      icon: Truck,
      title: "Hohe Kapazität",
      subtitle: "Immer das passende Modell",
      description: "Saisonspitze oder Dauereinsatz, egal. Eigener Bestand und Partnernetzwerk sichern deine Mobilität.",
      details: ["Junge, moderne Fahrzeugflotte", "Spezialaufbauten verfügbar", "Skalierbare Mietkonditionen"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Deine Mobilitätsgarantie vor Ort.
          </h2>
          <p className="mt-4 text-lg text-brand-grey">
            Warum namhafte Logistiker und lokale Betriebe auf ED Rent & Sale setzen.
          </p>
        </div>

        {/* 3-card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="flex flex-col p-8 rounded-2xl border border-brand-grey/15 bg-brand-light shadow-sm hover:shadow-md transition-all"
              >
                {/* Icon Header */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-cyan shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title and Subtitle */}
                <h3 className="mt-6 text-xl font-bold text-brand-navy">
                  {card.title}
                </h3>
                <span className="text-xs font-semibold text-brand-cyan uppercase tracking-wider mt-1">
                  {card.subtitle}
                </span>

                {/* Description */}
                <p className="mt-4 text-sm text-brand-grey leading-relaxed flex-grow">
                  {card.description}
                </p>

                {/* Details Checkmarks */}
                <ul className="mt-6 space-y-2.5 pt-6 border-t border-brand-grey/10">
                  {card.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center text-xs font-medium text-brand-navy">
                      <CheckCircle className="h-4 w-4 text-brand-cyan mr-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
