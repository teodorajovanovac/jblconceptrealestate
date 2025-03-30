import { useState, useEffect } from 'react';
import { FileText, Scale, Users, Shield, Briefcase, ClipboardCheck } from 'lucide-react';
import Header from '../components/header/Header';
import FooterTW from '../components/footer/Footer';
import Seo from '../services/meta/Seo';
import { Link } from 'react-router-dom';
import { useCmsData } from "../services/CmsProvider";

const TermsPage = () => {
  const { currentLanguage } = useCmsData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Seo title={currentLanguage === 'sr' ? 'Opšti uslovi poslovanja' : 'Terms & Conditions'} />
      <Header />
      <main id="top" className="w-full min-w-full px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {currentLanguage === 'sr' ? 'Opšti uslovi poslovanja' : 'Terms & Conditions'}
        </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {currentLanguage === 'sr'
                  ? 'Opšti uslovi poslovanja u sektoru posredovanja i pružanja konsultantskih usluga vezanih za promet i zakup nepokretnosti na teritoriji Republike Srbije'
                  : 'General terms and conditions of business operations of brokers in real estate transactions'}
              </p>
            </div>

            {/* Opšte odredbe */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Scale className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {currentLanguage === 'sr' ? 'I OPŠTE ODREDBE' : 'I GENERAL PROVISIONS'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base leading-relaxed">
                  {currentLanguage === 'sr' 
                    ? 'Opštim uslovima poslovanja privrednog društva "Concept Real Estate doo Beograd" matični broj: 22047825, PIB: 114618627, koje je upisano u Registar posrednika u prometu i zakupu nepokretnosti pod br. 1910 Rešenjem Ministarstva unutrašnje i spoljne trgovine br. 002871127 2024 (u daljem tekstu: Posrednik) uređuju se međusobni odnosi Posrednika u prometu nepokretnosti i fizičkog ili pravnog lica, koji sa Posrednikom zaključuje Ugovor o posredovanju u cilju zaključenja određenog pravnog posla koji se tiče prometa ili zakupa nepokretnosti (u daljem tekstu: Nalogodavac).'
                    : 'The General Terms and Conditions regulate the business relationship between a real estate broker and a principal (natural or legal person). By concluding a brokerage agreement, i.e. by accepting these conditions, the principal confirms that it is familiar with and agrees with the provisions of the General Terms and Conditions in real estate trade.'}
                </p>
              </div>
            </div>

            {/* Ponuda nepokretnosti */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {currentLanguage === 'sr' ? 'II PONUDA NEPOKRETNOSTI' : 'II REAL ESTATE OFFER'}
                  </h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-base leading-relaxed">
                  {currentLanguage === 'sr'
                    ? '2.1 Ponuda nepokretnosti Posrednika zasniva se na podacima koje je Posrednik dobio od Nalogodavca ili neposrednim opažanjem prilikom pregleda nepokretnosti.'
                    : '2.1 The Broker\'s real estate offer is based on data received from the Principal or direct observation during property inspection.'}
                </p>
                <p className="text-base leading-relaxed">
                  {currentLanguage === 'sr'
                    ? '2.2 Nalogodavac pod punom krivičnom i materijalnom odgovornošću potpisom na ugovoru o posredovanju u prometu ili zakupu nepokretnosti garantuje da su podaci koje je dao Posredniku, a koji se odnose na predmetnu nepokretnost i stvarna prava na istoj, u potpunosti istiniti.'
                    : '2.2 The Principal, under full criminal and material liability, guarantees by signing the brokerage agreement that all data provided to the Broker regarding the property and real rights thereon are completely truthful.'}
                </p>
              </div>
            </div>

            {/* Ugovor o posredovanju */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {currentLanguage === 'sr' ? 'III UGOVOR O POSREDOVANJU' : 'III BROKERAGE AGREEMENT'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base leading-relaxed">
                  {currentLanguage === 'sr'
                    ? '3.1 Posredovanje se vrši na osnovu Ugovora o posredovanju u prodaji, odnosno zakupu nepokretnosti (u daljem tekstu: Ugovor o posredovanju), zaključenog u pisanoj formi između Nalogodavca i Posrednika kojim ugovorom se uređuju njihova međusobna prava i obaveze.'
                    : '3.1 Brokerage is performed based on a Brokerage Agreement in sale or lease of real estate (hereinafter: Brokerage Agreement), concluded in written form between the Principal and the Broker, which regulates their mutual rights and obligations.'}
                </p>
              </div>
            </div>

            {/* Obaveze posrednika */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {currentLanguage === 'sr' ? 'IV OBAVEZE POSREDNIKA' : 'IV BROKER OBLIGATIONS'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-base leading-relaxed">
                    {currentLanguage === 'sr'
                      ? '4.1 POSREDNIK, kao Preduzeće specijalizovano za posredovanje u zakupu i prometu nepokretnosti, se obavezuje da sa pažnjom dobrog privrednika preduzeti sve potrebne radnje u cilju što efikasnijeg zakupa nepokretnosti koja je u vlasništvu NALOGODAVCA, pod uslovima koje je on postavio.'
                      : '4.1 The BROKER, as a Company specialized in real estate brokerage, commits to undertake all necessary actions with due diligence to efficiently lease the property owned by the PRINCIPAL, under the conditions set by them.'}
                  </p>
                  <p className="text-base leading-relaxed font-medium">
                    {currentLanguage === 'sr' ? '4.2 POSREDNIK se posebno obavezuje da u ime NALOGODAVCA:' : '4.2 The BROKER specifically commits to, on behalf of the PRINCIPAL:'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base leading-relaxed">
                    {currentLanguage === 'sr' ? (
                      <>
                <li>nastojati da nađe i dovede u vezu s NALOGODAVCEM lice radi zaključivanja posla koji je predmet ugovora o posredovanju i zakazuje prezentaciju predmetne nepokretnosti</li>
                <li>dati nalogodavcu objektivno mišljenje o ceni nepokretnosti ili iznosu zakupnine nepokretnosti u skladu sa njenim karakteristikama, prilikama na tržištu, kao i drugim relevantnim okolnostima</li>
                <li>učestvuje u pregovorima u ime NALOGODAVCA uz nastojanje da dođe do zaključenja posla</li>
                <li>redovno obaveštava NALOGODAVCA o svim preduzetim aktivnostima koje su predmet ovog ugovora i u vezi su sa preuzetim obavezama koje iz njega proizilaze</li>
                        <li>kao poslovnu tajnu čuva sve podatke koji su mu povereni</li>
                <li>svu dokumentaciju koju je preuzeo od NALOGODAVCA čuva do završetka posla</li>
                <li>pruža punu pravnu sigurnost u realizaciji Ugovora o zakupu</li>
                      </>
                    ) : (
                      <>
                        <li>endeavor to find and connect with the PRINCIPAL a person for concluding the business that is the subject of the brokerage agreement and schedule property presentations</li>
                        <li>provide the principal with an objective opinion on the property price or rental amount in accordance with its characteristics, market conditions, and other relevant circumstances</li>
                        <li>participate in negotiations on behalf of the PRINCIPAL with the aim of concluding the business</li>
                        <li>regularly inform the PRINCIPAL about all undertaken activities</li>
                        <li>keep all entrusted data as a business secret</li>
                        <li>keep all documentation received from the PRINCIPAL until the completion of business</li>
                        <li>provide full legal security in the realization of the Lease Agreement</li>
                      </>
                    )}
              </ul>
                </div>
              </div>
            </div>

            {/* Obaveze nalogodavca */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {currentLanguage === 'sr' ? 'V OBAVEZE NALOGODAVCA' : 'V PRINCIPAL OBLIGATIONS'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-base leading-relaxed">
                    {currentLanguage === 'sr'
                      ? '5.1 NALOGODAVAC zaključenjem ovog Posredničkog ugovora poverava izdavanje svoje nepokretnosti POSREDNIKU i preuzima sledeće obaveze:'
                      : '5.1 By concluding this Brokerage Agreement, the PRINCIPAL entrusts the leasing of their property to the BROKER and assumes the following obligations:'}
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base leading-relaxed">
                    {currentLanguage === 'sr' ? (
                      <>
                        <li>da POSREDNIKU prezentuje svu dokumentaciju kojom dokazuje svoje vlasništvo na predmetnoj nepokretnosti</li>
                <li>da jasno i nedvosmisleno saopšti POSREDNIKU svoje uslove izdavanja/prodaje nepokretnosti</li>
                        <li>da omogući POSREDNIKU da u prisustvu NALOGODAVCA ili sa njegove strane ovlašćenog lica, licima zainteresovanim za eventualni zakup, predmetnu nepokretnost pokaže</li>
                        <li>obavestiti posrednika o svim promenama u vezi sa posredovanim poslom</li>
                        <li>da ne menja uslove zakupa, ako su uslovi već predočeni potencijalnom zakupcu</li>
                      </>
                    ) : (
                      <>
                        <li>present to the BROKER all documentation proving ownership of the property</li>
                        <li>clearly and unambiguously communicate to the BROKER their conditions for leasing/selling the property</li>
                        <li>enable the BROKER to show the property to interested parties in the presence of the PRINCIPAL or their authorized representative</li>
                        <li>inform the broker about all changes related to the brokered business</li>
                        <li>not change the lease conditions if they have already been presented to a potential tenant</li>
                      </>
                    )}
              </ul>
                </div>
              </div>
            </div>

            {/* Završne odredbe */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {currentLanguage === 'sr' ? 'VI ZAVRŠNE ODREDBE' : 'VI FINAL PROVISIONS'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base leading-relaxed">
                  {currentLanguage === 'sr'
                    ? 'Na odnose Posrednika i Nalogodavca koji nisu regulisani Opštim uslovima poslovanja, drugim opštim aktom Preduzeća Posrednika ili Ugovorom o posredovanju, primenjivaće se odredbe Zakona o posredovanju u prometu i zakupu nepokretnosti, Zakona o prometu nepokretnosti, Zakona o obligacionim odnosima, kao i drugih propisa Republike Srbije.'
                    : 'For relations between the Broker and the Principal not regulated by these General Terms and Conditions, other general acts of the Broker\'s Company, or the Brokerage Agreement, the provisions of the Law on Real Estate Brokerage, Law on Real Estate Trade, Law on Obligations, and other regulations of the Republic of Serbia shall apply.'}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 rounded-lg p-8 text-center mt-12">
              <h2 className="text-2xl font-semibold mb-3">
                {currentLanguage === 'sr' ? 'Potrebno vam je više informacija?' : 'Need more information?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {currentLanguage === 'sr'
                  ? 'Kontaktirajte naš tim za detaljne informacije o uslovima poslovanja.'
                  : 'Contact our team for detailed information about our terms of service.'}
              </p>
              <Link
                to="/contact"
                className="cta-button rounded-full"
              >
                <span>{currentLanguage === 'sr' ? 'Kontaktirajte nas' : 'Contact Us'}</span>
              </Link>
            </div>
          </div>
          </div>
      </main>
      <FooterTW />
    </div>
  );
};

export default TermsPage; 