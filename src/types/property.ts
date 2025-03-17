export interface PropertyData {
  id: string
  transactionType: 'buy' | 'rent'
  address: {
    street: string
    city: string
    state: string
    zip: string
    fullAddress: string
  }
  price: {
    amount: number
    perSqft: number
  }
  status: string
  features: {
    beds: number
    baths: number
    sqft: number
    propertyType: string
    yearBuilt: number
  }
  description: string
  listingInfo: {
    agent: {
      name: string
      company: string
      title: string
      email: string
      phone: string
      image: string
    }
    mlsId: string
    listedDate: string
    updatedDate: string
  }
  interiorFeatures: {
    totalStories: number
    bedrooms: number
    totalBathrooms: number
    fullBathrooms: number
    halfBathrooms: number
    appliances: string
    laundry: string
    flooring: string
    fireplace: boolean
    fireplaceDescription: string
    cooling: boolean
    coolingDescription: string
    heating: boolean
    heatingDescription: string
  }
  exteriorFeatures: {
    lotSize: string
    exteriorAmenities: string
    lotFeatures: string
    architecturalStyle: string
    roof: string
    sewer: string
    patioAndPorch: string
    security: string
  }
  schoolInfo: {
    highSchool: string
    elementarySchool: string
  }
  otherDetails: {
    areaName: string
    daysOnMarket: number
    garage: string
    parking: string
    view: string
    viewDescription: string
    county: string
    waterSource: string
    pool: string
    utilities: string
    zoning: string
  }
  images: string[]
  mapLocation: {
    lat: number
    lng: number
  }
  disclaimer: string
  lastUpdated: string
}

