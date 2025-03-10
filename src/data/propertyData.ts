import type { PropertyData } from "../types/property"
import property1 from "../assets/probne slike za sajt/1.jpg"
import property2 from "../assets/probne slike za sajt/2.jpg"
import property3 from "../assets/probne slike za sajt/3.jpg"
import property4 from "../assets/probne slike za sajt/4.jpg"
import property5 from "../assets/probne slike za sajt/5.jpg"
import property6 from "../assets/probne slike za sajt/6.jpg"

export const propertyData: PropertyData = {
  id: "6507311236260808970",
  address: {
    street: "1084 Golf Road",
    city: "MONTECITO",
    state: "CA",
    zip: "93108",
    fullAddress: "1084 Golf Road, MONTECITO CA, 93108",
  },
  price: {
    amount: 33500000,
    perSqft: 3826.38,
  },
  status: "Active",
  features: {
    beds: 8,
    baths: 10,
    sqft: 8755,
    propertyType: "Residential",
    yearBuilt: 1923,
  },
  description:
    "At Villa Cascina lies an exquisite piece of Montecito's history. Resting on a private lane in a prestigious Montecito neighborhood, this magnificent 1920s estate underwent an extensive renovation in 2016, ensuring the preservation of its timeless charm while embracing contemporary comforts. Nestled in the iconic Lower Village, this gated property boasts breathtaking views of the surrounding mountains and ocean, while sitting in close proximity to Coast Village Road's famed restaurants and boutiques. As you enter through the gated main drive, you'll be greeted by 3 acres of lush gardens and mature landscaping, setting the tone for the grandeur that awaits. The 7,299-square-foot main residence features 6 bedrooms, an office, and 6 full bathrooms (plus an additional two half-bathrooms), all exquisitely appointed with fine finishes. The main level is welcoming with a bright and open floor plan, highlighted by a grand foyer, beamed ceilings, and hardwood floors. Elegant Moroccan-style archways and steel doors and windows lead to a central courtyard adorned with antique tiles and a grand outdoor fireplace. Enjoy a fully equipped gourmet kitchen, formal dining and living rooms, and a dedicated media room. The generously sized primary suite finishes out the ground floor and is equipped with a luxurious bathroom and grand walk-in closet. Upstairs, four spacious and private ensuite bedrooms await. The lower level houses a sizable wine cellar perfect for the wine aficionado.\n\nAmenities abound outside, including a swimmer's pool and cabana, sauna, and a North/South championship tennis court. Multiple additional structures on the 3-acre parcel form intentional spaces for all of life's necessities: a separate two-bedroom, one-bath guest house offers privacy and comfort for visitors, a large gym space provides wellness, and spacious four-car garages provide ample parking.\n\nImpeccably landscaped grounds, formal gardens, and romantic courtyards coalesce in an idyllic setting for this exceptional estate that is rooted in Montecito's history yet encompasses all the modern luxuries. Whether you're seeking a private sanctuary or an entertainer's paradise, this historic Montecito estate offers a rare opportunity to live in grandeur while also enjoying the allure of the Lower Village.",
  listingInfo: {
    mlsId: "25-112",
    listedDate: "January 10, 2025",
    updatedDate: "February 20, 2025",
    agent: {
      name: "Eric Haskell",
      company: "Berkshire Hathaway Calcagno & Hamilton",
      email: "info@homesinsantabarbara.com",
      phone: "805-565-4000",
    },
  },
  interiorFeatures: {
    totalStories: 2,
    bedrooms: 8,
    totalBathrooms: 10,
    fullBathrooms: 8,
    halfBathrooms: 2,
    appliances:
      "Refrigerator, Dishwasher, Disposal, Double Oven, Dryer, Gas Stove, Rev Osmosis, Washer, Wtr Softener/Owned",
    laundry: "Gas Hookup, Laundry Room",
    flooring: "Hardwood, Stone",
    fireplace: true,
    fireplaceDescription: "Living Room, Primary Bedroom, Other, Patio",
    cooling: true,
    coolingDescription: "Central Air",
    heating: true,
    heatingDescription: "Forced Air, Radiant",
  },
  exteriorFeatures: {
    lotSize: "3.16 Acres",
    exteriorAmenities:
      "Tennis Court(s), Pool, Pool House, Patio Open, Patio Covered, SPA-Outside, Hot Tub, Sauna, Lawn, Fruit Trees, Fenced: ALL",
    lotFeatures: "Level, Cul-De-Sac, Sloped Down",
    architecturalStyle: "Medit, Spanish",
    roof: "Tile",
    sewer: "Sewer Hookup",
    patioAndPorch: "Enclosed",
    security: "Monitored, Gate:Elec, Security Camera, Security System, Smoke Detector(s)",
  },
  schoolInfo: {
    highSchool: "S.B. Sr.",
    elementarySchool: "Cold Spring",
  },
  otherDetails: {
    areaName: "10 - MONTECITO",
    daysOnMarket: 1,
    garage: "Yes",
    parking: "Gar 4, Detached",
    view: "Yes",
    viewDescription: "Ocean, Setting, Partial/Filtered",
    county: "Santa Barbara",
    waterSource: "Mont Wtr",
    pool: "Yes",
    utilities: "Underground Util",
    zoning: "Other",
  },
  images: [
    property1,
    property2,
    property3,
    property4,
    property5,
    property6,
    property1,
    property2
  ],
  mapLocation: {
    lat: 34.4208,
    lng: -119.6982,
  },
  disclaimer:
    "This information is being provided for your personal, non-commercial use and may not be used for any purpose other than to identify prospective properties that you may be interested in purchasing. Data relating to real estate for sale on this Website comes from the Internet Data Exchange Program of the Santa Barbara Multiple Listing Service. All information is deemed reliable, but not guaranteed. All properties are subject to prior sale, change or withdrawal. Neither the Santa Barbara Multiple Listing Service, the listing broker(s), the owner of this site, nor Luxury Presence shall be responsible for any typographical errors, misinformation, or misprints.",
  lastUpdated: "Data last updated 10:14 AM UTC, 2/20/2025",
}

