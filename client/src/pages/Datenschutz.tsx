import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ShieldCheck, Eye, Lock, Globe } from "lucide-react";
import { Link } from "wouter";

export default function Datenschutz() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      <Header onCtaClick={() => {
        const contactForm = document.getElementById("contact-form");
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#contact-form";
        }
      }} />

      <main className="flex-grow py-16 md:py-24">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-bold text-brand-navy hover:text-brand-cyan transition-colors gap-2 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 md:p-12 shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full -mr-16 -mt-16" />
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
                <ShieldCheck className="h-6 w-6 text-brand-cyan" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-navy">
                Datenschutzerklärung
              </h1>
            </div>
            <p className="text-brand-grey text-lg leading-relaxed max-w-2xl">
              Informationen über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten bei der Nutzung unserer Landingpage.
            </p>
          </div>

          {/* Privacy Content */}
          <div className="bg-white rounded-2xl border border-brand-grey/15 p-8 md:p-12 shadow-sm space-y-10 text-brand-grey leading-relaxed">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Globe className="h-5 w-5 text-brand-cyan" />
                1. Einleitung und Kontaktdaten des Verantwortlichen
              </h2>
              <p>
                1.1 Wir freuen uns, dass Sie unsere Website besuchen und bedanken uns für Ihr Interesse. Im Folgenden informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten bei der Nutzung unserer Website. Personenbezogene Daten sind hierbei alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <p>
                1.2 Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
              </p>
              <div className="bg-brand-light p-4 rounded-xl border border-brand-grey/10 text-brand-navy text-sm font-medium space-y-1">
                <p className="font-bold">ED Rent and Sale</p>
                <p>Bremsen 13 A</p>
                <p>42799 Leichlingen (Rheinland)</p>
                <p>Deutschland</p>
                <p className="pt-2">Tel.: 021758845535</p>
                <p>E-Mail: info@ed-sale.de</p>
              </div>
              <p className="text-sm">
                Der für die Verarbeitung von personenbezogenen Daten Verantwortliche ist diejenige natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Eye className="h-5 w-5 text-brand-cyan" />
                2. Datenerfassung beim Besuch unserer Website
              </h2>
              <p>
                2.1 Bei der bloß informatorischen Nutzung unserer Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur solche Daten, die Ihr Browser an den Seitenserver übermittelt (sog. „Server-Logfiles“). Wenn Sie unsere Website aufrufen, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen die Website anzuzeigen:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
                <li>Unsere besuchte Website</li>
                <li>Datum und Uhrzeit zum Zeitpunkt des Zugriffes</li>
                <li>Menge der gesendeten Daten in Byte</li>
                <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
                <li>Verwendeter Browser</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Verwendete IP-Adresse (ggf. in anonymisierter Form)</li>
              </ul>
              <p>
                Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website. Eine Weitergabe oder anderweitige Verwendung der Daten findet nicht statt. Wir behalten uns allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
              </p>
              <p>
                2.2 Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten und anderer vertraulicher Inhalte (z.B. Bestellungen oder Anfragen an den Verantwortlichen) eine SSL- bzw. TLS-Verschlüsselung. Sie können eine verschlüsselte Verbindung an der Zeichenfolge „https://“ und dem Schloss-Symbol in Ihrer Browserzeile erkennen.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy flex items-center gap-2 border-b border-brand-grey/10 pb-2">
                <Lock className="h-5 w-5 text-brand-cyan" />
                3. Hosting & Content-Delivery-Network
              </h2>
              <p>
                Für das Hosting unserer Website und die Darstellung der Seiteninhalte nutzen wir einen Anbieter, der seine Leistungen selbst oder durch ausgewählte Sub-Unternehmer ausschließlich auf Servern innerhalb der Europäischen Union erbringt. Sämtliche auf unserer Website erhobenen Daten werden auf diesen Servern verarbeitet.
              </p>
              <p>
                Wir haben mit dem Anbieter einen Auftragsverarbeitungsvertrag geschlossen, der den Schutz der Daten unserer Seitenbesucher sicherstellt und eine unberechtigte Weitergabe an Dritte untersagt.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                4. Cookies
              </h2>
              <p>
                Um den Besuch unserer Website attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir Cookies, also kleine Textdateien, die auf Ihrem Endgerät abgelegt werden. Teilweise werden diese Cookies nach Schließen des Browsers automatisch wieder gelöscht (sog. „Session-Cookies“), teilweise verbleiben diese Cookies länger auf Ihrem Endgerät und ermöglichen das Speichern von Seiteneinstellungen (sog. „persistente Cookies“).
              </p>
              <p>
                Sofern durch einzelne von uns eingesetzte Cookies auch personenbezogene Daten verarbeitet werden, erfolgt die Verarbeitung gemäß Art. 6 Abs. 1 lit. b DSGVO entweder zur Durchführung des Vertrages, gemäß Art. 6 Abs. 1 lit. a DSGVO im Falle einer erteilten Einwilligung oder gemäß Art. 6 Abs. 1 lit. f DSGVO zur Wahrung unserer berechtigten Interessen an der bestmöglichen Funktionalität der Website sowie einer kundenfreundlichen und effektiven Ausgestaltung des Seitenbesuchs.
              </p>
              <p>
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und einzeln über deren Annahme entscheiden oder die Annahme von Cookies für bestimmte Fälle oder generell ausschließen können. Bitte beachten Sie, dass bei Nichtannahme von Cookies die Funktionalität unserer Website eingeschränkt sein kann.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                5. Kontaktaufnahme
              </h2>
              <p>
                Im Rahmen der Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) werden personenbezogene Daten erhoben. Welche Daten im Falle der Nutzung eines Kontaktformulars erhoben werden, ist aus dem jeweiligen Kontaktformular ersichtlich. Diese Daten werden ausschließlich zum Zweck der Beantwortung Ihres Anliegens bzw. für die Kontaktaufnahme und die damit verbundene technische Administration gespeichert und verwendet.
              </p>
              <p>
                Rechtsgrundlage für die Verarbeitung dieser Daten ist unser berechtigtes Interesse an der Beantwortung Ihres Anliegens gemäß Art. 6 Abs. 1 lit. f DSGVO. Zielt Ihre Kontaktierung auf den Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO.
              </p>
              <p>
                Ihre Daten werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht. Dies ist der Fall, wenn sich aus den Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist und sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-brand-navy border-b border-brand-grey/10 pb-2">
                6. Seitenfunktionalitäten (Google Maps)
              </h2>
              <p>
                Diese Webseite nutzt einen Online-Kartendienst des folgenden Anbieters: Google Maps (API) von Google Ireland Limited, Gordon House, 4 Barrow St, Dublin, D04 E5W5, Irland (“Google”).
              </p>
              <p>
                Google Maps ist ein Webdienst zur Darstellung von interaktiven (Land-)Karten, um geographische Informationen visuell darzustellen. Über die Nutzung dieses Dienstes wird Ihnen unser Standort angezeigt und eine etwaige Anfahrt erleichtert.
              </p>
              <p>
                Bereits beim Aufrufen derjenigen Unterseiten, in die die Karte von Google Maps eingebunden ist, werden Informationen über Ihre Nutzung unserer Website (wie z.B. Ihre IP-Adresse) an Server von Google übertragen und dort gespeichert, hierbei kann es auch zu einer Übermittlung an die Server der Google LLC. in den USA kommen. Dies erfolgt unabhängig davon, ob Google ein Nutzerkonto bereitstellt, über das Sie eingeloggt sind oder ob ein Nutzerkonto besteht. Wenn Sie bei Google eingeloggt sind, werden Ihre Daten direkt Ihrem Konto zugeordnet.
              </p>
              <p>
                Die Verarbeitung Ihrer Daten im Rahmen der Nutzung von Google Maps erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft über die Cookie-Einstellungen auf unserer Website widerrufen.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
    </div>
  );
}
