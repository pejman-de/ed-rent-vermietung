import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import VehicleCategories from "@/components/VehicleCategories";
import ProcessSection from "@/components/ProcessSection";
import TrustMetrics from "@/components/TrustMetrics";
import ProofBlock from "@/components/ProofBlock";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

// Animation Variants for clean scroll-reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as any }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const vehiclesRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToVehicles = () => {
    const vehiclesElement = document.getElementById("vehicles");
    vehiclesElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectCategory = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    scrollToForm();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <Header onCtaClick={scrollToForm} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onCtaClick={scrollToForm} onExploreClick={scrollToVehicles} />

        {/* Social Proof Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <SocialProofBar />
        </motion.div>

        {/* Vehicle Categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <VehicleCategories onSelectCategory={handleSelectCategory} />
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <ProcessSection />
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <TrustMetrics />
        </motion.div>

        {/* Proof Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <ProofBlock />
        </motion.div>

        {/* Lead Form Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <LeadForm ref={formRef} selectedCategory={selectedCategory} />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <FAQ />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}
