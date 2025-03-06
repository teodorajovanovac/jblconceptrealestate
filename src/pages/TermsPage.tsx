import { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import FooterTW from '../components/footer/FooterTW';
import Seo from '../services/meta/Seo';

const TermsPage = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'sr');
    };

    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo title={language === 'sr' ? 'Opšti uslovi poslovanja' : 'Terms & Conditions'} />
      <Header />
      <main className="main px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <h1 className="gradient-text font-bold">
          {language === 'sr' ? 'Opšti uslovi poslovanja' : 'Terms & Conditions'}
        </h1>
        
        {language === 'sr' ? (
          // Serbian content
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Opšti uslovi poslovanja u sektoru posredovanja i pružanja konsultantskih usluga vezanih za promet i zakup nepokretnosti na teritoriji Republike Srbije</h2>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">I OPŠTE ODREDBE</h2>
              <p className="mb-4">1.1 Opštim uslovima poslovanja privrednog društva "Concept Real Estate doo Beograd" matični broj: 22047825, PIB: 114618627, koje je upisano u Registar posrednika u prometu i zakupu nepokretnosti pod br. 1910 Rešenjem Ministarstva unutrašnje i spoljne trgovine br. 002871127 2024 (u daljem tekstu: Posrednik) uređuju se međusobni odnosi Posrednika u prometu nepokretnosti i fizičkog ili pravnog lica, koji sa Posrednikom zaključuje Ugovor o posredovanju u cilju zaključenja određenog pravnog posla koji se tiče prometa ili zakupa nepokretnosti (u daljem tekstu: Nalogodavac).</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">II PONUDA NEPOKRETNOSTI</h2>
              <p className="mb-4">2.1 Ponuda nepokretnosti Posrednika zasniva se na podacima koje je Posrednik dobio od Nalogodavca ili neposrednim opažanjem prilikom pregleda nepokretnosti.</p>
              <p className="mb-4">2.2 Nalogodavac pod punom krivičnom i materijalnom odgovornošću potpisom na ugovoru o posredovanju u prometu ili zakupu nepokretnosti garantuje da su podaci koje je dao Posredniku, a koji se odnose na predmetnu nepokretnost i stvarna prava na istoj, u potpunosti istiniti.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">III UGOVOR O POSREDOVANJU</h2>
              <p className="mb-4">3.1 Posredovanje se vrši na osnovu Ugovora o posredovanju u prodaji, odnosno zakupu nepokretnosti (u daljem tekstu: Ugovor o posredovanju), zaključenog u pisanoj formi između Nalogodavca i Posrednika kojim ugovorom se uređuju njihova međusobna prava i obaveze.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">IV OBAVEZE POSREDNIKA</h2>
              <p className="mb-4">4.1 POSREDNIK, kao Preduzeće specijalizovano za posredovanje u zakupu i prometu nepokretnosti, se obavezuje da sa pažnjom dobrog privrednika preduzeti sve potrebne radnje u cilju što efikasnijeg zakupa nepokretnosti koja je u vlasništvu NALOGODAVCA, pod uslovima koje je on postavio.</p>
              <p className="mb-4">4.2. POSREDNIK se posebno obavezuje da u ime NALOGODAVCA:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>nastojati da nađe i dovede u vezu s NALOGODAVCEM lice radi zaključivanja posla koji je predmet ugovora o posredovanju i zakazuje prezentaciju predmetne nepokretnosti</li>
                <li>dati nalogodavcu objektivno mišljenje o ceni nepokretnosti ili iznosu zakupnine nepokretnosti u skladu sa njenim karakteristikama, prilikama na tržištu, kao i drugim relevantnim okolnostima</li>
                <li>učestvuje u pregovorima u ime NALOGODAVCA uz nastojanje da dođe do zaključenja posla</li>
                <li>redovno obaveštava NALOGODAVCA o svim preduzetim aktivnostima koje su predmet ovog ugovora i u vezi su sa preuzetim obavezama koje iz njega proizilaze</li>
                <li>kao poslovnu tajnu čuva sve podatke koji su mu povereni uz obavezu da trećim licima ne saopštava podatke koji su mu povereni, izuzev podataka potrebnih za obavljanje posredničkog posla, kao i u slučaju da bilo koji državni organ po službenom nalogu zatraži podatak od Posrednika</li>
                <li>svu dokumentaciju koju je preuzeo od NALOGODAVCA čuva do završetka posla</li>
                <li>pruža punu pravnu sigurnost u realizaciji Ugovora o zakupu</li>
                <li>ima obavezu vođenja tačne i precizne evidencije zakupaca kojima prezentuje predmetnu nekretninu</li>
                <li>nedvosmisleno utvrdi identitet potencijalnih zakupaca (kojima u cilju davanja pod zakup pokazuje predmetnu nepokretnost) i to uvidom u lične isprave (lična karta, putna isprava i drugo) te da od pomenutih dobije svojeručno potpisanu izjavu o gledanju nepokretnosti na za to unapred pripremljenom evidencionom dokumentu</li>
                <li>obezbeđuje potpunu diskreciju vodeći računa o maksimalnoj zaštiti NALOGODAVCA</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">V OBAVEZE NALOGODAVCA</h2>
              <p className="mb-4">5.1. NALOGODAVAC zaključenjem ovog Posredničkog ugovora poverava izdavanje svoje nepokretnosti POSREDNIKU i preuzima sledeće obaveze:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>da POSREDNIKU prezentuje svu dokumentaciju kojom dokazuje svoje vlasništvo na predmetnoj nepokretnosti (projektna, tehnička, urbanistička, građevinska, pravna) kao i da fotokopije istih preda POSREDNIKU</li>
                <li>da jasno i nedvosmisleno saopšti POSREDNIKU svoje uslove izdavanja/prodaje nepokretnosti</li>
                <li>da omogući POSREDNIKU da u prisustvu NALOGODAVCA ili sa njegove strane ovlašćenog lica, licima zainteresovanim za eventualni zakup, predmetnu nepokretnost pokaže, kao i da sarađuje sa POSREDNIKOM na svakom drugom planu, a sve u cilju uspešne realizacije Ugovora o zakupu</li>
                <li>obavestiti posrednika o svim promenama u vezi sa posredovanim poslom, a posebno o promenama u vezi sa pravima na nepokretnosti, rokovima i cenom, a sve u roku od tri dana od dana nastale promene</li>
                <li>da ne menja uslove zakupa, (posebno ne cenu i rokove) ako su uslovi već predočeni potencijalnom zakupcu</li>
                <li>NALOGODAVAC je saglasan da se predmetna nepokretnost fotografiše, a fotografije objave na posrednikovom sajtu i ostalim portalima za oglašavanje sa kojima NALOGODAVAC ima saradnju.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">VI MOGUĆNOST PRIJEMA KAPARE</h2>
              <p className="mb-4">6.1. Kada posreduje u davanju u zakup nepokretnosti, ukoliko Posredniku Nalogodavac tako izričito naloži, Posrednik može da u ime i za račun Nalogodavca primi kaparu od strane zainteresovanog zakupca kojom se predmetna nekretnina kapariše. Izričit nalog za prijem kapare Nalogodavac daje u telefonskom razgovoru koji se snima u skladu sa Zakonom o zaštiti podataka o ličnosti ili putem elektronske pošte ili saglasnost može biti data putem elektronske pošte. Prilikom uzimanja kapare Posrednik je dužan da u ime Nalogodavca –potpiše odgovarajući zapisnik o postignutom dogovoru o zakupu nepokretnosti sa zakupcem uz navođenje detalja dogovora sa kojima se Nalogodavac složio putem telefonskog razgovora ili putem elekterosnke pošte.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">VII EKSKLUZIVNO POSREDOVANJE</h2>
              <p className="mb-4">7.1 Nalogodavac se može obavezati izričitim ugovaranjem klauzule o ekskluzivnom posredovanju, da u ugovorenom roku neće angažovati drugog posrednika za posredovanje u vezi sa predmetnom nepokretnosti.</p>
              <p className="mb-4">7.2 Ako za vreme važenja klauzule o ekskluzivnom posredovanju Nalogodavac zaključi pravni posao u vezi sa nepokretnošću iz člana 7.1., za koji je posredovao drugi posrednik, dužan je da Posredniku sa kojim je ugovorio ekskluzivno posredovanje na ime naknade štete plati iznos ugovorene posredničke naknade.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">VIII PRAVO NA POSREDNIČKU NAKNADU</h2>
              <p className="mb-4">8.1 Posrednik stiče pravo na posredničku naknadu kada Nalogodavac zaključi Ugovor o zakupu ili zaključi Predugovor, odn. Ugovor (kada prethodno nije zaključen Predugovor) o prodaji predmetne nepokretnosti sa zakupcem ili kupcem sa kojim ga je Posrednik doveo u vezu.</p>
              <p className="mb-4">8.2 Visina posredničkih provizija za obavljeno posredovanje prilikom kupoprodaje ili zakupa nepokretnosti naplaćuje se u skladu s Cenovnikom posredničkih provizija i dodatnih usluga koji je sastavni deo ovih Opštih uslova.</p>
              <p className="mb-4">8.3 U slučaju da nakon isteka/raskida predmetnog Ugovora NALOGODAVAC zaključi ugovor sa licem koje je obezbedio i vezu sa istim ga doveo POSREDNIK tokom važenja predmetnog ugovora, POSREDNIK će imati pravo na posredničku proviziju u roku od tri meseca od dana prestanka ovog Ugovora.</p>
              <p className="mb-4">8.4 U slučaju da NALOGODAVAC bez prisustva predstavnika POSREDNIKA i njegovog znanja, zaključi Ugovor sa licem koje mu je POSREDNIK doveo kao potencijalnog zakupca ili licima koja su bila sa njim na razgledanju, dužan je nadoknaditi POSREDNIKU posredničku proviziju u celosti. U skladu sa pomenutim, NALOGODAVAC preuzima na sebe obavezu da ukoliko zaključi predugovor ili ugovor o zakupu nepokretnosti kojaje predmet zakupa i ugovora o posredovanju mimo znanja i učešća POSREDNIKA o tome obavesti istog, te da mu u tom smislu u najkraćem roku ima dostaviti kopiju dokumenta o predmetnom pravnom poslu.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">IX UGOVOR O POTPOSREDOVANJU</h2>
              <p className="mb-4">9.1 Posrednik može Ugovorom o potposredovanju preneti svoja prava i obaveze iz Ugovora o posredovanju, u celini ili delimično, na drugog posrednika, ako se Nalogodavac sa ovim izričito saglasio u osnovnom Ugovoru o posredovanju.</p>
              <p className="mb-4">9.2 Ugovor o potposredovanju sadrži način i uslove prenosa prava i obaveza iz prethodnog stava, te isplate posredničke naknade i otkaza ugovora.</p>
              <p className="mb-4">9.3 Posrednik je dužan da kopiju ugovora o potposredovanju preda Nalogodavcu u roku od tri dana od dana zaključenja tog ugovora.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">X POVERLJIVOST I AUTORSKA PRAVA</h2>
              <p className="mb-4">10.1 Svi podaci i informacije iz Ugovora o posredovanju, kao i drugi podaci i informacije koji se tiču načina i uspešnosti izvršavanja ugovora, predstavljaju poslovnu tajnu.</p>
              <p className="mb-4">10.2 Sve fotografije, video, 3D snimak tehnički crtež i tekstualni opis nepokretnosti, a koje sačini posrednik, isključiva su intelektualna svojina Posrednika, te Nalogodavac ili bilo koja treća lica nemaju prava da iste objavljuju, koristite, umnožavaju i stavljaju u promet bez prethodne pisane saglasnosti posrednika.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">XI CENOVNIK POSREDNIČKIH PROVIZIJA I DODATNIH USLUGA</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>11.1 Posrednička provizija kod ugovora o posredovanju u prodaji nepokretnosti …………………………………………………………………………. minimalnih 2%, a od ugovorene cene nepokretnosti</li>
                <li>11.2 Posrednička provizija kod posredovanja u zakupu nepokretnosti………………………………………………… minimalno 50-100%, a od ugovorene cene nepokretnosti</li>
                <li>11.3 Savetovanje i konslutacije u cilju što boljeg plasmana nepokretnosti na tržištu nekretnina ………………………….……12.000,00 dinara po radnom satu</li>
                <li>11.4 U skladu sa Zakonom o posredovanju Posrednik može ugovoriti sa Nalogodavcem tačan iznos posredničke nadoknade za konkretan posao posredovanja ili ugovoriti popust na posredničku nadokandu i o tome sačiniti poseban Ugovor o posredovanju koji se zaključuje između Nalogodavca i Posrednika. Izmeniti uskladu sa nasim vazecim cenovnikom</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">XII ZAVRŠNE ODREDBE</h2>
              <p className="mb-4">13.1 Na odnose Posrednika i Nalogodavca koji nisu regulisani Opštim uslovima poslovanja, drugim opštim aktom Preduzeća Posrednika ili Ugovorom o posredovanju, primenjivaće se odredbe Zakona o posredovanju u prometu i zakupu nepokretnosti, Zakona o prometu nepokretnosti, Zakona o obligacionim odnosima, Zakona o sprečavanju pranja novca i finansiranja terorizma, kao i drugih propisa Republike Srbije.</p>
            </section>
          </div>
        ) : (
          // English content
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">General terms and conditions of business operations of brokers in real estate transactions</h2>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">I GENERAL PROVISIONS</h2>
              <p className="mb-4">The General Terms and Conditions regulate the business relationship between a real estate broker and a principal (natural or legal person). By concluding a brokerage agreement, i.e. by accepting these conditions, the principal confirms that it is familiar with and agrees with the provisions of the General Terms and Conditions in real estate trade.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">II DESCRIPTION OF THE ACTIVITIES THE BROKER IS OBLIGATED TO PERFORM</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Execute a brokerage agreement with the principal in writing;</li>
                <li>Endavour to find and bring into contact with the principal a person for the purpose of executing a brokered transaction;</li>
                <li>Give the principal an objective opinion on the price of the real estate or the amount of the real estate lease in accordance with its characteristics, market conditions, as well as other relevant circumstances;</li>
                <li>Inspect the documents proving the right of ownership or other real right to real estate whose trade or lease is subject to brokering process and to warn the principal especially of possible risks related to the entry of the real estate in the real estate registers, registered rights or encumbrances on the real estate, the existence of the right of pre-emption and the restriction of real trade in accordance with special regulations;</li>
                <li>Perform the necessary actions to present the real estate in the market, advertise the sale and/or lease of the real estate by appropriate means and perform all other actions provided for in the brokerage agreement that go beyond the usual presentation, in respect of which the broker shall be entitled to charge separate expenses quoted in advance;</li>
                <li>Keep data on the identity of the principal, and upon a written order of the principal keep as a business secret data on the real estate, in connection with whose sale, i.e. lease the broker is hired, or in connection with that real estate, or about the business for which the broker is engaged;</li>
                <li>Inform the principal of all circumstances relevant for the transaction concerned that are known to the broker;</li>
                <li>Broker in negotiations and strive to execute a contract;</li>
                <li>Be present at the execution of the brokered transaction (Preliminary Agreement and Agreement);</li>
                <li>Attend the handover of real estate;</li>
              </ul>
              <p className="mt-4">It is considered that the broker has enabled a connection with another person (natural or legal) to negotiate for the execution of a brokered transaction, if the principal is able to contact another person with whom the broker negotiated for the execution of a brokered transaction, especially if the broker:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>directly took, or sent the principal, or a third party to view the respective real estate;</li>
                <li>organized a meeting between the principal and a third party to negotiate the execution of a brokered transaction;</li>
                <li>informed the principal of the name, telephone number, fax number, or e-mail address of a third party interested in executing a brokered transaction, or if the broker informed the principal of the exact location of the requested real estate.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Obligations of the principal</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>inform the broker about all circumstances that are important for the brokerage process,</li>
                <li>provide the broker with original documents proving their right to immovable property, subject to the transaction, i.e. warn the broker of all registered and unregistered encumbrances that exist on the immovable property;</li>
                <li>provide the broker and the person interested in executing the brokered transaction with a tour of the real estate, in the agreed manner and at the agreed time;</li>
                <li>inform the broker about all relevant data on the real estate, which in particular includes accurate data on price, location, structure, etc.;</li>
                <li>pay the broker the agreed brokerage fee, and if it is specifically agreed, to reimburse the broker for other costs incurred during the brokerage engagement,</li>
                <li>inform the broker in writing about all changes related to the brokered transaction, and especially about the changes related to real estate rights, deadlines and price, all within three days of the change;</li>
                <li>immediately inform the broker that the person who viewed the real estate through the broker has shown interest in executing an agreement/preliminary agreement on real estate purchase, lease of real estate, or perform some other legal business as a result of the broker's work.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">III EXERCISE OF THE RIGHT TO BROKER FEE</h2>
              <p className="mb-4">The broker acquires the right to broker fee at the moment of executing the agreement for which the broker has been engaged, unless the broker and the principal have agreed that the right to brokerage fee is acquired at the moment of executing the preliminary agreement for which the broker has performed brokering activities.</p>
              <p className="mb-4">The broker may not demand partial payment of the brokerage fee in advance, i.e. before the execution of the preliminary agreement, i.e. the agreement for which brokerage has been performed, in accordance with the previous paragraph.</p>
              <p className="mb-4">The amount of the broker fee, i.e. the manner of determining the amount of the broker fee, as well as the type and amount of costs for additional broker services, are determined by the Price List of Broker Services which is an integral part of these General Terms and Conditions.</p>
              <p className="mb-4">The broker may contract the right to reimbursement of additional costs necessary for the execution of the order, regardless of the success of the brokerage, and request payment in advance for certain expenses, if this is explicitly stated in the brokerage agreement.</p>
              <p className="mb-4">The broker has the right to broker fee if the spouse, i.e. extramarital partner, descendant, or parent of the person with whom the broker brought the client into contact, executes the brokered transaction.</p>
              <p className="mb-4">If, after the end of the brokerage agreement through termination by the principal, but in any case within not more than on month of the date of end of the agreement, the principal executes a transaction as a direct result of brokering by the broker before the end of the brokerage agreement, the principal shall pay the full amount of the agreed broker's fee to the broker, unless stipulated otherwise in the brokerage agreement.</p>
              <p className="mb-4">If, subject to the condition and within the period set out in previous paragraph, the principal executes a transaction that is substantially a result of brokering by the broker before the end of the brokerage agreement, the principal shall pay the broker a proportional share of the broker's fee, unless stipulated otherwise in the brokerage agreement.</p>
              <p className="mb-4">The broker or the sub-broker shall not be entitled to the broker's fee if it executes the brokered agreement with the principal on its on behalf, as a party, or if such agreement with the principal is executed by a person who performs broker operations in the employ of the broker or the sub-broker.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">IV EXERCISE OF THE RIGHT TO BROKER FEE</h2>
              <p className="mb-4">The provisions of the Law regulating this area and the Law governing contract and torts shall apply to the relations between the principal and the broker which are not regulated by these General Terms and Conditions.</p>
            </section>
          </div>
        )}
      </main>
      <FooterTW />
    </>
  );
};

export default TermsPage; 