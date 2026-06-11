import { Truck, ShoppingBag, Layers, Construction, Compass, Navigation, ArrowRight } from "lucide-react";

interface Category {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  specs: string[];
  description: string;
}

const categories: Category[] = [
  {
    id: "sprinter",
    title: "Sprinter",
    icon: ShoppingBag,
    specs: ["Zul. Gesamtgewicht: 3,5t", "Ladevolumen: bis 14 m³", "Führerscheinklasse: B"],
    description: "Der Wendige für Stadt, Kurier und kleinere Touren. Passt in jede Lücke.",
  },
  {
    id: "transporter",
    title: "Transporter",
    icon: Truck,
    specs: ["Zul. Gesamtgewicht: 3,5t - 7,5t", "Kofferaufbau mit Hebebühne"],
    description: "Der Allrounder mit Ladebordwand für Verteilerverkehr und Umzüge.",
  },
  {
    id: "wechselbruecke",
    title: "Wechselbrücke",
    icon: Layers,
    specs: ["System: BDF", "Fahrgestell: 2- oder 3-Achs", "Hubhöhe: Standard & Low"],
    description: "Maximale Flexibilität für kombinierten Ladungsverkehr und Systemlogistik.",
  },
  {
    id: "kipper",
    title: "Kipper",
    icon: Construction,
    specs: ["3-Seiten-Kipper", "Allradantrieb optional"],
    description: "Robust und geländegängig. Für Baustelle, Schüttgut und alles, was Dreck macht.",
  },
  {
    id: "sattelzug",
    title: "Sattelzug",
    icon: Compass,
    specs: ["Sattelzugmaschine 4x2 / 6x2", "Euro 6 Abgasnorm", "Mietauflieger verfügbar"],
    description: "Für den schweren Fernverkehr und volle Ladekapazität auf Langstrecke.",
  },
  {
    id: "gliederzug",
    title: "Gliederzug",
    icon: Navigation,
    specs: ["Motorwagen + Anhänger", "Durchladezug-Option", "Volumen: bis 120 m³"],
    description: "Maximales Volumen, flexibles Handling. Wenn es richtig viel werden soll.",
  },
];

interface VehicleCategoriesProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export default function VehicleCategories({ onSelectCategory }: VehicleCategoriesProps) {
  return (
    <section id="vehicles" className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Welches Fahrzeug brauchen Sie?
          </h2>
          <p className="mt-4 text-lg text-brand-grey">
            Wählen Sie Ihre Klasse. Alle gepflegt, alle sofort startklar, keine Überraschungen.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative flex flex-col justify-between p-8 rounded-2xl border border-brand-grey/15 bg-white shadow-sm hover:shadow-xl hover:border-brand-cyan/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy group-hover:bg-brand-cyan/15 group-hover:text-brand-cyan transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-xl font-bold text-brand-navy">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm text-brand-grey leading-relaxed">
                    {category.description}
                  </p>

                  {/* Technical Specs Sheet */}
                  <div className="mt-6 pt-6 border-t border-brand-grey/10">
                    <ul className="space-y-2">
                      {category.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-center text-xs text-brand-grey">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan mr-2 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Text Link with Hover Animation */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectCategory(category.title)}
                    className="inline-flex items-center text-sm font-bold text-brand-navy group-hover:text-brand-cyan transition-colors"
                  >
                    <span>zum Formular</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
