import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCtaClick: () => void;
}

export default function Header({ onCtaClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-grey/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-20 items-center justify-between">
        {/* Image Logo */}
        <div className="flex items-center py-1">
          <img 
            src="/manus-storage/ED_Rent_Logo_Cropped_1427a237.webp" 
            alt="ED Rent & Sale Logo" 
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>

        {/* Right side contact & CTA */}
        <div className="flex items-center gap-4 md:gap-8">
          <a
            href="tel:+4921758845535"
            className="hidden items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-cyan transition-colors sm:flex md:text-base"
          >
            <Phone className="h-4 w-4 text-brand-cyan" />
            <span>+49 217 58845535</span>
          </a>
          
          <Button
            onClick={onCtaClick}
            className="bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 font-bold px-4 py-2 text-xs md:text-sm md:px-6 md:py-3 shadow-md hover:shadow-brand-cyan/20 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Mietangebot anfordern</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
