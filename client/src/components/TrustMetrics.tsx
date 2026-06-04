export default function TrustMetrics() {
  const metrics = [
    {
      value: "24h",
      label: "Reaktionszeit",
      description: "Garantiertes Mietangebot innerhalb eines Werktages vorliegen.",
    },
    {
      value: "100%",
      label: "Geprüfte Qualität",
      description: "Jedes Fahrzeug durchläuft vor Übergabe unseren Meister-Check.",
    },
    {
      value: "Optional",
      label: "Versicherungspaket",
      description: "Vollkasko-Schutz flexibel für jedes Mietfahrzeug zubuchbar.",
    },
    {
      value: "+ Aufbau",
      label: "Sonderausstattung",
      description: "Ladebordwand, Koffer- oder Kipperaufbau nach Bedarf.",
    },
  ];

  return (
    <section className="bg-brand-navy text-white py-20 relative overflow-hidden">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
            >
              {/* Stat Value in Cyan */}
              <span className="text-4xl font-extrabold text-brand-cyan md:text-5xl tracking-tight">
                {metric.value}
              </span>
              
              {/* Stat Label */}
              <span className="mt-4 text-lg font-bold text-white tracking-wide">
                {metric.label}
              </span>
              
              {/* Stat Description */}
              <p className="mt-2 text-sm text-brand-grey leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
