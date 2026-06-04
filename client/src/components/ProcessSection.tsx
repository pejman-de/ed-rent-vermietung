import { MessageSquare, ClipboardCheck, CalendarRange, KeyRound } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Anfrage senden",
    description: "Formular in unter 2 Minuten ausfüllen oder kurz durchklingeln.",
    icon: MessageSquare,
  },
  {
    number: "2",
    title: "Angebot erhalten",
    description: "Maßgeschneidert und unverbindlich, innerhalb von 24 Stunden.",
    icon: ClipboardCheck,
  },
  {
    number: "3",
    title: "Termin fixieren",
    description: "Angebot passt? Abhol- oder Liefertermin flexibel festlegen.",
    icon: CalendarRange,
  },
  {
    number: "4",
    title: "Fahrzeug übernehmen",
    description: "Schlüssel holen oder liefern lassen. Und schon rollt Ihr Auftrag.",
    icon: KeyRound,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-brand-light border-y border-brand-grey/10">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            In 4 Schritten zum Fahrzeug.
          </h2>
          <p className="mt-4 text-lg text-brand-grey">
            Kein Papierkram-Marathon. Unser Prozess hält Sie kurz auf und Ihr Geschäft am Laufen.
          </p>
        </div>

        {/* Horizontal 4-step layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Decorative Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-brand-grey/10 -translate-y-12 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-start p-6 bg-white rounded-2xl border border-brand-grey/10 shadow-sm z-10 hover:shadow-md transition-shadow"
              >
                {/* Header with Step Number and Icon */}
                <div className="flex w-full items-center justify-between">
                  <span className="text-5xl font-extrabold text-brand-cyan/20 select-none leading-none">
                    0{step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
