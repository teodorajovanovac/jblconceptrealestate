import { Helmet } from "react-helmet-async"


interface CeoProps {
  mastername? : string;
  title? : string;
  description? : string;
  keywords?: string;
  url?: string;
  type? : string;
  name? : string;
  image? : string;
  author? : string;
  locale? : string;
}

const defaultCeoProps : Partial<CeoProps> = {
  mastername : " | JBL Concept",
  title: "JBL Concept Real Estate | Nekretnine",
  description: "Ekskluzivne nekretnine, izuzetna usluga. Vaša investicija u siguran životni koncept",
  keywords: "Nekretnine",
  url: "https://www.jblconcept.rs",
  type: "website",
  name: "JBL Concept Real Estate",
  image: "https://jbl.svg",
  author: "Aleksandar Jovanovac | Ajsa Soft",
  locale: "rs_RS"
};

function Seo(props:CeoProps) {
  const mergedProps: CeoProps = { ...defaultCeoProps, ...props };
  return (
    <Helmet>
      { /* Standard metadata tags */ }
    <title>{mergedProps.title}{mergedProps.mastername}</title>
    <meta name='description' content={mergedProps.description} />
    <meta name="keywords" content={mergedProps.keywords} />
    <meta name="author" content={mergedProps.author}/>
      { /* End standard metadata tags */ }
      { /* Facebook tags */ }
    <meta property="og:type" content={mergedProps.type} />
    <meta property="og:title" content={mergedProps.title} />
    <meta property="og:description" content={mergedProps.description} />
      { /* End Facebook tags */ }
      { /* Twitter tags */ }
      <meta name="twitter:creator" content={mergedProps.name} />
      <meta name="twitter:card" content={mergedProps.type} />
      <meta name="twitter:title" content={mergedProps.title} />
      <meta name="twitter:description" content={mergedProps.description} />
        { /* End Twitter tags */ }
    </Helmet>
  )
}

export default Seo