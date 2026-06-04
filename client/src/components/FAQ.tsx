import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wie schnell erhalte ich mein Mietangebot?",
    answer: "Unser B2B-Serviceversprechen garantiert Ihnen ein maßgeschneidertes und unverbindliches Mietangebot innerhalb von 24 Stunden (an Werktagen). Oftmals liegt Ihnen das Angebot sogar schon nach wenigen Stunden vor.",
  },
  {
    question: "Welche Versicherungen sind im Mietpreis enthalten?",
    answer: "Standardmäßig sind unsere Fahrzeuge haftpflichtversichert. Sie haben jedoch die Möglichkeit, ein umfassendes Vollkasko-Versicherungspaket mit reduzierter Selbstbeteiligung direkt im Buchungsprozess optional hinzuzufügen. Das sorgt für maximale Sicherheit während des gesamten Mietzeitraums.",
  },
  {
    question: "Kann ich den Mietvertrag flexibel verlängern?",
    answer: "Ja, absolut. Wir wissen, dass sich Pläne im Logistik- und Baubereich schnell ändern können. Eine Verlängerung ist nach Absprache mit Ihrem persönlichen B2B-Ansprechpartner in der Regel unkompliziert möglich, sofern das Fahrzeug nicht bereits fest für einen Folgetermin verplant ist.",
  },
  {
    question: "Bieten Sie auch eine Lieferung der Fahrzeuge an?",
    answer: "Ja, neben der bequemen Selbstabholung an unserem verkehrsgünstig gelegenen Standort in Leichlingen bieten wir auch eine zuverlässige Lieferung direkt an Ihre gewünschte Einsatzstelle oder Ihr Betriebsgelände an. Die Konditionen hierfür berechnen wir individuell basierend auf der Entfernung.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white border-t border-brand-grey/10">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Häufig gestellte Fragen.
          </h2>
          <p className="mt-4 text-lg text-brand-grey">
            Schnelle Antworten auf die wichtigsten Fragen rund um unsere Nutzfahrzeugvermietung.
          </p>
        </div>

        {/* Accordion Component */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-brand-grey/15 rounded-xl px-6 py-2 bg-brand-light/50 hover:bg-brand-light transition-colors data-[state=open]:bg-brand-light data-[state=open]:border-brand-cyan/30"
            >
              <AccordionTrigger className="text-base font-bold text-brand-navy hover:text-brand-cyan hover:no-underline transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-brand-grey leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
