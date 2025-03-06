import { useState, useEffect } from 'react';
import { Calculator, Clipboard, Home, LineChart, ShoppingBag, Users } from 'lucide-react';
import Header from '../components/header/Header';
import FooterTW from '../components/footer/FooterTW';
import Seo from '../services/meta/Seo';

const PricingPage = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');

  useEffect(() => {
    // Function to handle language changes
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'sr');
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleLanguageChange);
    
    // Create a custom event listener for language changes
    window.addEventListener('languageChange', handleLanguageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Seo title={language === 'sr' ? 'Cenovnik' : 'Price List'} />
      <Header />
      <main className="w-full min-w-full px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {language === 'sr' ? 'Cenovnik' : 'Price List'}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {language === 'sr'
                  ? 'Vrste usluga koje agencija "Concept Real Estate doo Beograd" obavlja po nalogu klijenata (u daljem tekstu NALOGODAVCA):'
                  : 'Types of services provided by Agency CONCEPT Real Estate doo Beograd on the client\'s order (hereinafter the PRINCIPAL)'}
              </p>
            </div>

            {/* Services Overview */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {language === 'sr' ? 'Naše Usluge' : 'Our Services'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ol className="list-decimal pl-6 space-y-2 text-base">
                  {language === 'sr' ? (
                    <>
                      <li>Posredovanje u poslovima zakupa nepokretnosti</li>
                      <li>Posredovanje u poslovima kupoprodaje nepokretnosti</li>
                      <li>Procena tržišne vrednosti nepokretnosti</li>
                      <li>Menadžment nepokretnosti</li>
                      <li>Savetovanje u cilju što boljeg plasmana nepokretnosti na tržištu nekretnina</li>
                      <li>Savetovanje u cilju što bolje kupovine nepokretnosti na tržištu nekretnine</li>
                    </>
                  ) : (
                    <>
                      <li>Brokerage in real estate leasing</li>
                      <li>Brokerage in real estate purchase</li>
                      <li>Estimation of the market value of real estate</li>
                      <li>Real estate management</li>
                      <li>Consulting with a view to placing real estate on the real estate market in the best possible manner</li>
                      <li>Consulting with a view to better real estate purchase on the market</li>
                    </>
                  )}
                </ol>
              </div>
            </div>

            {/* Lease Brokerage */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Home className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {language === 'sr' 
                      ? 'Posredovanje u poslovima zakupa nepokretnosti' 
                      : 'Lease Brokerage in real estate leasing'}
                  </h2>
                </div>
                <p className="text-base mt-2 text-muted-foreground">
                  {language === 'sr'
                    ? 'Cenovnik za izvršene usluge posredovanja u zakupu nepokretnosti'
                    : 'Price list for brokering services in real estate leasing'}
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4 text-base leading-relaxed">
                  <p>
                    {language === 'sr'
                      ? 'Iznos posredničke nadoknade se naplaćuje po realizaciji posla/sklapanju Ugovora o zakupu i zavisi od:'
                      : 'The amount of the broker\'s fee is charged upon the completion of the transaction/execution of the Lease Agreement and depends on:'}
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      {language === 'sr'
                        ? 'Iznosa mesečne zakupnine nekretnine i ugovorenog trajanja zakupa'
                        : 'The amount of the monthly rent of the real estate'}
                    </li>
                    <li>
                      {language === 'sr'
                        ? 'Ugovorenog roka trajanja zakupa'
                        : 'The agreed duration of the lease'}
                    </li>
                  </ul>

                  <h3 className="font-semibold text-lg mt-6 mb-3">
                    {language === 'sr' ? 'Posredovanje u poslovima zakupa nepokretnosti' : 'Brokerage in real estate leasing'}
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-gray-500">
                            {language === 'sr' ? 'Iznos mesečne zakupnine' : 'Monthly Rent Range'}
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-500">
                            {language === 'sr' ? 'Iznos posredničke nadoknade' : 'Broker\'s Fee'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-2">
                            {language === 'sr' ? 'od 550 do 1200 eur-a' : 'from € 550 to € 1200'}
                          </td>
                          <td className="px-4 py-2">
                            {language === 'sr' ? '50% od iznosa mesečnog zakupa' : '50% of the monthly rent'}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">
                            {language === 'sr' ? 'od 1250 eur-a i više' : 'from € 1250 and more'}
                          </td>
                          <td className="px-4 py-2">
                            {language === 'sr' ? '100% od iznosa mesečnog zakupa' : '100% of the monthly rent'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 italic">
                    {language === 'sr' 
                      ? '* Iznos nadoknade zavisi od perioda zakupa nekretine'
                      : '* The amount of the fee depends on the period of lease of the real estate'}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-gray-500">
                            {language === 'sr' ? 'Period zakupa' : 'Lease Period'}
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-500">
                            {language === 'sr' ? 'Posrednička nadoknada' : 'Broker\'s Fee'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-2">
                            {language === 'sr' ? 'od 13 do 20 meseci' : 'from 13 to 20 months'}
                          </td>
                          <td className="px-4 py-2">70%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">
                            {language === 'sr' ? '23 meseca i duže' : '23 months and longer'}
                          </td>
                          <td className="px-4 py-2">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4">
                    {language === 'sr'
                      ? 'Posrednička nadoknada može biti i drugačije ugovorena, a u skladu sa Zakonom o posredovanju u prometu i zakupu nepokretnosti što direktno znači da može biti dogovorena u konkretnom iznosu nadoknade za obim posla/posredovanja ili drugom odgovarajućem procentu koji obe strane ugovore i o tome međusobno zaključe Ugovor o posredovanju u kojem će iznos nadoknade ili procenat posredničke naknade biti tačno naveden.'
                      : 'The broker\'s fee may be agreed otherwise, and in accordance with the Law on Real Estate Sale and Lease Brokerage, which directly means that it can be agreed in a specific amount of compensation for the scope of brokering operations/brokerage or other appropriate percentage that both parties agree upon and execute a Brokerage Agreement under which the amount of the compensation or the percentage for the broker\'s fee will be precisely quoted.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Purchase Brokerage */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {language === 'sr' 
                      ? 'Posredovanje u poslovima kupoprodaje nepokretnosti'
                      : 'Purchase Brokerage in real estate purchase and sale'}
                  </h2>
                </div>
                <p className="text-base mt-2 text-muted-foreground">
                  {language === 'sr'
                    ? 'Cenovnik za izvršene usluge posredovanja u kupoprodaji nepokretnosti'
                    : 'Price list for brokering services in real estate purchase and sale'}
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4 text-base leading-relaxed">
                  <p>
                    {language === 'sr'
                      ? 'Minimalna posrednička nadoknada za poslove posredovanja prilikom kupoprodaje nepokretnosti iznosi 750 eura u dinarskoj protivvrednosti, obračunato po srednjem kursu NBS-a na dan plaćanja usluge posredovanja.'
                      : 'The minimum broker\'s fee for brokerage activities when buying and selling real estate is EUR 750 in dinar equivalent, calculated at the middle exchange rate of the NBS on the day of payment for the brokerage service.'}
                  </p>
                  <p>
                    {language === 'sr'
                      ? 'U skladu sa Zakonom o posredovanju procenat za naplaćeni posrednički posao prilikom kupoprodaje nepokretnosti je varijabilan i iznosi od 1 do 99% od ugovorene kupoprodajne cene.'
                      : 'In accordance with the Law on Brokerage, the percentage for the brokerage service for the real estate transaction is variable and amounts to 1 to 99% of the agreed purchase price.'}
                  </p>
                  <p>
                    {language === 'sr'
                      ? 'Posrednička nadoknada može biti i drugačije ugovorena, a u skladu sa Zakonom o posredovanju u prometu i zakupu nepokretnosti što direktno znači da može biti dogovorena u konkretnom iznosu nadoknade za obim posla/posredovanja ili drugom odgovarajućem procentu koji obe strane ugovore i o tome međusobno zaključe Ugovor o posredovanju u kojem će iznos nadoknade ili procenat posredničke naknade biti tačno naveden.'
                      : 'The broker\'s fee may be agreed otherwise, and in accordance with the Law on Real Estate Sale and Lease Brokerage, which directly means that it can be agreed in a specific amount of compensation for the scope of brokering operations/brokerage or other appropriate percentage that both parties agree upon and execute a Brokerage Agreement under which the amount of the compensation or the percentage for the broker\'s fee will be precisely quoted.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Estimation */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {language === 'sr'
                      ? 'Procena tržišne vrednosti nepokretnosti u zakupu'
                      : 'Estimation of the market value of the leased real estate'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                          {language === 'sr' ? 'Tip nepokretnosti' : 'Property Type'}
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                          {language === 'sr' ? 'Cena (u din. protivvrednosti)' : 'Price (in RSD equivalent)'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-2">
                          {language === 'sr' ? 'Stan, kuća od 20 do 110 m²' : 'Apartment, house from 20 to 110 m²'}
                        </td>
                        <td className="px-4 py-2">€ 150</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">
                          {language === 'sr' ? 'Stan, kuća više od 110 m²' : 'Apartment, house more than 110 m²'}
                        </td>
                        <td className="px-4 py-2">€ 250</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">
                          {language === 'sr' ? 'Poslovni prostor - po upitu' : 'Business space - upon request'}
                        </td>
                        <td className="px-4 py-2">
                          {language === 'sr' ? 'od € 250 do € 1000' : 'from € 250 to € 1000'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Real Estate Management */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <LineChart className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {language === 'sr' ? 'Menadžment nepokretnosti' : 'Real estate management'}
                  </h2>
                </div>
                <p className="text-base mt-2 text-muted-foreground">
                  {language === 'sr' ? 'Cena usluge mesečno' : 'Price of service monthly'}
                </p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                          {language === 'sr' ? 'Tip nepokretnosti' : 'Property Type'}
                        </th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">
                          {language === 'sr' ? 'Cena' : 'Price'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-2">
                          {language === 'sr'
                            ? 'Stan, kuća, poslovni prostor od 200 m² do 1500 m²'
                            : 'Apartment, house, office space from 200 to 1500 m²'}
                        </td>
                        <td className="px-4 py-2">
                          {language === 'sr'
                            ? '12% mesečne zakupnine (u din. protivvrednosti)'
                            : '12% of the monthly rent (in RSD equivalent)'}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">
                          {language === 'sr'
                            ? 'Stan, kuća, poslovni prostor preko 1500 m²'
                            : 'Apartment, house, office space over 1500 m²'}
                        </td>
                        <td className="px-4 py-2">
                          {language === 'sr'
                            ? '€ 200 do € 300 (u din. protivvrednosti)'
                            : '€ 200 to € 300 (in RSD equivalent)'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Consulting */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {language === 'sr'
                      ? 'Savetovanje u cilju što boljeg plasmana nepokretnosti'
                      : 'Consulting related to real estate placement'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base">
                  {language === 'sr'
                    ? 'Cena radnog sata savetovanja iznosi 12.000,00 dinara.'
                    : 'The price for a working hour of consulting is RSD 12,000.00'}
                </p>
              </div>
            </div>

            {/* Contract Preparation */}
            <div className="border-0 shadow-lg rounded-lg bg-white">
              <div className="bg-primary/5 border-b p-6">
                <div className="flex items-center gap-3">
                  <Clipboard className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {language === 'sr'
                      ? 'Priprema predugovora i ugovora o zakupu i prodaji nepokretnosti'
                      : 'Preparation of preliminary contracts and contracts for lease and sale of real estate'}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  <p className="text-base">
                    {language === 'sr'
                      ? 'U zavisnosti od vrste postupka koji se odnosi na tačnu nepokretnost.'
                      : 'Depending on the type of procedure related to the exact real estate.'}
                  </p>
                  <p className="text-base">
                    {language === 'sr'
                      ? 'Cena od € 250 po Ugovoru do € 1000 (u din. protivvrednosti)'
                      : 'Price starting € 250 per Contract up to € 1000 (in RSD equivalent)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-50 rounded-lg p-8 text-center mt-12">
              <h2 className="text-2xl font-semibold mb-3">
                {language === 'sr' ? 'Potrebno vam je više informacija?' : 'Need more information?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'sr'
                  ? 'Kontaktirajte naš tim za detaljne informacije o cenama i uslugama.'
                  : 'Contact our team for detailed pricing and service information.'}
              </p>
              <a
                href="/contact"
                className="bg-black text-white px-6 py-2 rounded-md font-medium inline-block hover:bg-gray-800 transition-colors"
              >
                {language === 'sr' ? 'Kontaktirajte nas' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>
      </main>
      <FooterTW />
    </div>
  );
};

export default PricingPage; 