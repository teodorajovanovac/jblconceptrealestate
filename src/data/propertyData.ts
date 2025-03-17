import type { PropertyData } from "../types/property"
import property1 from "../assets/probne slike za sajt/1.jpg"
import property2 from "../assets/probne slike za sajt/2.jpg"
import property3 from "../assets/probne slike za sajt/3.jpg"
import property4 from "../assets/probne slike za sajt/4.jpg"
import property5 from "../assets/probne slike za sajt/5.jpg"
import property6 from "../assets/probne slike za sajt/6.jpg"

const baseProperty: Partial<PropertyData> = {
  listingInfo: {
    agent: {
      name: "Jasna Bajić-Ljubičić",
      company: "JBL Real Estate Concept",
      title: "DIREKTOR",
      email: "jasnabajiclg@gmail.com",
      phone: "+381 61 2299988",
      image: "/assets/images/agent1.jpg"
    },
    mlsId: "25-112",
    listedDate: "10. Januar 2025.",
    updatedDate: "20. Februar 2025.",
  },
  disclaimer: "Informacije predstavljene na ovom sajtu namenjene su isključivo za Vašu ličnu, nekomercijalnu upotrebu i ne mogu se koristiti u druge svrhe osim za identifikaciju potencijalnih nekretnina koje Vas interesuju. Podaci o nekretninama dostupnim za prodaju na ovom sajtu dolaze iz JBL Real Estate Concept ekskluzivne baze podataka. Sve informacije se smatraju pouzdanim, ali nisu garantovane. Sve nekretnine podležu prethodnoj prodaji, promeni ili povlačenju iz ponude. JBL Real Estate Concept zadržava pravo izmene ili povlačenja bilo koje ponude bez prethodne najave.",
  lastUpdated: "Poslednje ažuriranje podataka: 10:14 UTC, 20.02.2025.",
  images: [property1, property2, property3, property4, property5, property6],
  schoolInfo: {
    highSchool: "N/A",
    elementarySchool: "N/A"
  },
  otherDetails: {
    areaName: "Centar",
    daysOnMarket: 0,
    garage: "Da",
    parking: "Da",
    view: "Da",
    viewDescription: "Panoramski pogled na grad",
    county: "Beograd",
    waterSource: "Gradski vodovod",
    pool: "Ne",
    utilities: "Sve",
    zoning: "Stambena zona"
  }
}

export const properties: PropertyData[] = [
  // Properties for sale
  {
    ...baseProperty,
    id: "1",
    transactionType: "buy",
    address: {
      street: "Bulevar kralja Aleksandra 28",
      city: "Beograd",
      state: "Srbija",
      zip: "11000",
      fullAddress: "Bulevar kralja Aleksandra 28, Beograd",
    },
    price: {
      amount: 250000,
      perSqft: 2500,
    },
    status: "Active",
    features: {
      beds: 3,
      baths: 2,
      sqft: 100,
      propertyType: "Stan",
      yearBuilt: 2020,
    },
    description: "Luksuzan stan u novogradnji na Bulevaru kralja Aleksandra",
    interiorFeatures: {
      totalStories: 6,
      bedrooms: 3,
      totalBathrooms: 2,
      fullBathrooms: 2,
      halfBathrooms: 0,
      appliances: "Ugradna kuhinja, Mašina za sudove, Klima uređaj",
      laundry: "Vešeraj",
      flooring: "Parket",
      fireplace: false,
      fireplaceDescription: "",
      cooling: true,
      coolingDescription: "Centralna klimatizacija",
      heating: true,
      heatingDescription: "Centralno grejanje",
    },
    exteriorFeatures: {
      lotSize: "N/A",
      exteriorAmenities: "Lift, Video nadzor, Interfon",
      lotFeatures: "Urbano područje",
      architecturalStyle: "Moderna",
      roof: "Ravan krov",
      sewer: "Gradska kanalizacija",
      patioAndPorch: "Terasa",
      security: "24/7 obezbeđenje",
    },
    mapLocation: {
      lat: 44.786568,
      lng: 20.419649,
    },
  } as PropertyData,
  {
    ...baseProperty,
    id: "2",
    transactionType: "buy",
    address: {
      street: "Dedinje, Užička 19",
      city: "Beograd",
      state: "Srbija",
      zip: "11000",
      fullAddress: "Užička 19, Dedinje, Beograd",
    },
    price: {
      amount: 850000,
      perSqft: 3400,
    },
    status: "Active",
    features: {
      beds: 5,
      baths: 4,
      sqft: 250,
      propertyType: "Kuća",
      yearBuilt: 2018,
    },
    description: "Luksuzna vila na Dedinju sa bazenom i panoramskim pogledom",
    interiorFeatures: {
      totalStories: 3,
      bedrooms: 5,
      totalBathrooms: 4,
      fullBathrooms: 4,
      halfBathrooms: 0,
      appliances: "Kompletno opremljena, Smart home sistem",
      laundry: "Posebna prostorija",
      flooring: "Mermer, Parket",
      fireplace: true,
      fireplaceDescription: "Dnevna soba",
      cooling: true,
      coolingDescription: "Centralna klimatizacija",
      heating: true,
      heatingDescription: "Podno grejanje",
    },
    exteriorFeatures: {
      lotSize: "15 ari",
      exteriorAmenities: "Bazen, Letnja kuhinja, Garaža",
      lotFeatures: "Uređeno dvorište",
      architecturalStyle: "Moderna vila",
      roof: "Mediteran crep",
      sewer: "Gradska kanalizacija",
      patioAndPorch: "Terasa, Balkon",
      security: "Video nadzor, Alarm",
    },
    mapLocation: {
      lat: 44.786568,
      lng: 20.419649,
    },
  } as PropertyData,
  // Properties for rent
  {
    ...baseProperty,
    id: "3",
    transactionType: "rent",
    address: {
      street: "Vračar, Njegoševa 15",
      city: "Beograd",
      state: "Srbija",
      zip: "11000",
      fullAddress: "Njegoševa 15, Vračar, Beograd",
    },
    price: {
      amount: 800,
      perSqft: 10,
    },
    status: "Active",
    features: {
      beds: 2,
      baths: 1,
      sqft: 65,
      propertyType: "Stan",
      yearBuilt: 2015,
    },
    description: "Moderan stan u srcu Vračara, kompletno namešten",
    interiorFeatures: {
      totalStories: 4,
      bedrooms: 2,
      totalBathrooms: 1,
      fullBathrooms: 1,
      halfBathrooms: 0,
      appliances: "Kompletno opremljena kuhinja, Veš mašina",
      laundry: "U kupatilu",
      flooring: "Parket",
      fireplace: false,
      fireplaceDescription: "",
      cooling: true,
      coolingDescription: "Klima",
      heating: true,
      heatingDescription: "Centralno grejanje",
    },
    exteriorFeatures: {
      lotSize: "N/A",
      exteriorAmenities: "Lift",
      lotFeatures: "Urbano područje",
      architecturalStyle: "Moderna zgrada",
      roof: "Ravan krov",
      sewer: "Gradska kanalizacija",
      patioAndPorch: "Francuski balkon",
      security: "Interfon",
    },
    mapLocation: {
      lat: 44.786568,
      lng: 20.419649,
    },
  } as PropertyData,
  {
    ...baseProperty,
    id: "4",
    transactionType: "rent",
    address: {
      street: "Novi Beograd, Jurija Gagarina 87",
      city: "Beograd",
      state: "Srbija",
      zip: "11070",
      fullAddress: "Jurija Gagarina 87, Novi Beograd",
    },
    price: {
      amount: 1200,
      perSqft: 12,
    },
    status: "Active",
    features: {
      beds: 3,
      baths: 2,
      sqft: 95,
      propertyType: "Stan",
      yearBuilt: 2022,
    },
    description: "Luksuzni trosoban stan u novogradnji na Novom Beogradu",
    interiorFeatures: {
      totalStories: 12,
      bedrooms: 3,
      totalBathrooms: 2,
      fullBathrooms: 2,
      halfBathrooms: 0,
      appliances: "Kompletno opremljena kuhinja, Mašina za sudove",
      laundry: "Vešeraj",
      flooring: "Parket",
      fireplace: false,
      fireplaceDescription: "",
      cooling: true,
      coolingDescription: "Centralna klimatizacija",
      heating: true,
      heatingDescription: "Centralno grejanje",
    },
    exteriorFeatures: {
      lotSize: "N/A",
      exteriorAmenities: "Lift, Parking, Video nadzor",
      lotFeatures: "Urbano područje",
      architecturalStyle: "Savremena",
      roof: "Ravan krov",
      sewer: "Gradska kanalizacija",
      patioAndPorch: "Terasa",
      security: "24/7 obezbeđenje",
    },
    mapLocation: {
      lat: 44.786568,
      lng: 20.419649,
    },
  } as PropertyData,
]

// Export single property for backward compatibility
export const propertyData = properties[0]

