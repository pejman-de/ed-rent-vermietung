import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wie schnell erhalte ich mein Mietangebot?",
    answer: "In der Regel innerhalb von 24 Stunden an Werktagen. Oft schneller, wenn das passende Fahrzeug bereitsteht.",
  },
  {
    question: "Welche Versicherungen sind im Mietpreis enthalten?",
    answer: "Eine Grunddeckung ist enthalten. Auf Wunsch buchen Sie ein Vollkasko-Paket dazu, damit Sie ruhig schlafen können.",
  },
  {
    question: "Kann ich den Mietvertrag flexibel verlängern?",
    answer: "Ja. Sagen Sie uns rechtzeitig Bescheid und wir verlängern unkompliziert, solange das Fahrzeug verfügbar ist.",
  },
  {
    question: "Bieten Sie auch eine Lieferung der Fahrzeuge an?",
    answer: "Ja, auf Wunsch liefern wir direkt zu Ihrer Einsatzstelle. Sie entscheiden, ob Sie abholen oder wir kommen.",
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
            Schnelle Antworten, bevor Sie fragen. Falls etwas fehlt, melden Sie sich einfach.
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
