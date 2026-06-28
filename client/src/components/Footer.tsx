import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";
import { Link } from "wouter";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 relative overflow-hidden border-t border-white/5">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center">
              <img 
                src="/manus-storage/ED_Rent_Logo_Cropped_1427a237.webp" 
                alt="ED Rent & Sale Logo" 
                className="h-16 md:h-20 w-auto object-contain brightness-0 invert"
                width="177"
                height="98"
              />
            </div>
            <p className="text-sm text-brand-grey max-w-sm leading-relaxed">
              Ihr zuverlässiger B2B-Partner für hochwertige Nutzfahrzeuge im Raum Leichlingen, Köln und Düsseldorf. Flexibel, schnell und sauber gewartet.
            </p>
            <div className="flex items-center gap-3 text-xs text-brand-grey">
              <Clock className="h-4 w-4 text-brand-cyan shrink-0" />
              <span>B2B-Servicezeiten: Mo. - Fr. 08:00 - 17:00 Uhr</span>
            </div>
          </div>

          {/* Column 2: Address & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-cyan">
              Kontakt & Standort
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-brand-grey">
                <MapPin className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
                <span>
                  ED Rent and Sale<br />
                  Bremsen 13 A<br />
                  42799 Leichlingen (Rheinland)
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-grey">
                <Phone className="h-5 w-5 text-brand-cyan shrink-0" />
                <a href="tel:+4921758845535" className="hover:text-brand-cyan transition-colors">
                  +49 217 58845535
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-brand-grey">
                <Mail className="h-5 w-5 text-brand-cyan shrink-0" />
                <a href="mailto:info@ed-rent.com" className="hover:text-brand-cyan transition-colors">
                  info@ed-rent.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Links & Back to Top */}
          <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-cyan mb-4">
                Rechtliches
              </h4>
              <ul className="space-y-2.5 text-sm text-brand-grey">
                <li>
                  <Link href="/impressum" className="hover:text-brand-cyan transition-colors">Impressum</Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="hover:text-brand-cyan transition-colors">Datenschutzerklärung</Link>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-cyan transition-colors">AGB (Mietbedingungen)</a>
                </li>
              </ul>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={onScrollToTop}
              className="mt-6 self-start lg:self-end flex items-center gap-2 text-xs font-bold text-brand-cyan hover:text-white transition-colors uppercase tracking-wider"
            >
              <span>Nach oben</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-brand-cyan hover:bg-brand-cyan hover:text-brand-navy transition-all">
                <ArrowUp className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-grey">
          <span>
            &copy; {currentYear} ED Rent & Sale. Alle Rechte vorbehalten.
          </span>
          <span>
            Entwickelt für maximale B2B-Conversion & Zuverlässigkeit.
          </span>
        </div>
      </div>
    </footer>
  );
}
