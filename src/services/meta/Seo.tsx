import { Helmet } from "react-helmet-async"


interface CeoProps {
  mastername? : string;
  title? : string;  //[Maximum 70 characters.]
  description? : string; //[Maximum 200 characters.]
  keywords?: string;
  url?: string;
  type? : string;
  name? : string;
  image? : string;  // 600×315 pixels, but 1200×630 d (up to 5MB). Stay close to a 1.91:1 
  author? : string;
  locale? : string;
  site_name? : string; // [Maximum 60 characters.]
}

const defaultCeoProps : Partial<CeoProps> = {
  mastername : " | Concept Real Estate",
  title: "Concept Real Estate | Nekretnine",
  description: "Ekskluzivne nekretnine, izuzetna usluga. Vaša investicija u siguran životni koncept",
  keywords: "Nekretnine, Stan, Kuće, Prodaja, Izdavanje, Investicije, Srbija",
  url: "https://www.jblconcept.rs",
  type: "website",
  name: "Concept Real Estate",
  image: "https://jblconcept.rs/jbl_circle_w.svg",
  author: "Aleksandar Jovanovac | Ajsa Soft",
  locale: "rs_RS",
  site_name: "Concept Real Estate",
};

function Seo(props:CeoProps) {
  const mergedProps: CeoProps = { ...defaultCeoProps, ...props };
  return (
    <Helmet prioritizeSeoTags>
      { /* Standard metadata tags */ }
      <title>{mergedProps.title}{mergedProps.mastername}</title>
      <meta name='description' content={mergedProps.description} />
      <meta name="keywords" content={mergedProps.keywords} />
      <meta name="author" content={mergedProps.author}/>
      { /* End standard metadata tags */ }
      { /* Facebook tags */ }
      <meta property="og:type" content={mergedProps.type} />
      <meta property="og:url" content={mergedProps.url} />
      <meta property="og:title" content={mergedProps.title} />
      <meta property="og:description" content={mergedProps.description} />
      <meta property="og:image" content={mergedProps.image} />
      { /* End Facebook tags */ }
      { /* Twitter tags */ }
      {/* <meta name="twitter:creator" content={mergedProps.name} />
      <meta name="twitter:card" content={mergedProps.type} />
      
      <meta name="twitter:title" content={mergedProps.title} />
      <meta name="twitter:description" content={mergedProps.description} /> */}

      {/* <meta property="twitter:card" content="summary_large_image" /> */}
      <meta property="twitter:url" content={mergedProps.url} />
      <meta property="twitter:title" content={mergedProps.title} />
      <meta property="twitter:description" content={mergedProps.description} />
      <meta property="twitter:image" content={mergedProps.image} />

        { /* End Twitter tags */ }
    </Helmet>
  )
}

export default Seo