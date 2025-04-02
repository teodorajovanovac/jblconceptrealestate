export interface PhotoDto {
    name: string;
    title: string;
    priority: number;
    timeStamp: string;
}

export interface AgentDto {
    name: string | 0;
    surname: string | 0;
    company: string | 0;
    licence: string | 0;
    email: string | 0;
    phone: string | 0;
    mobile: string | 0;
    image: string | 0;
}

export interface VideoDto {
    name: string;
    link: string;
}


export interface RealEstateDto {
    id: number;
    price: number | 0;
    priceM2: number | 0;
    //code: string | null;
    area: number | null;
    roomsNo: number | null;
    bathroomNo: number| null;
    movingIn: string | null;
    gmapSync: number| null;
    approximateLocation: number | null;
    inserted: string | null;
    edited: string | null;
    lux: number| null;
    tags: string | null;
    locationCountryName: string | null;
    locationCountyName: string | null;
    locationCityName: string | null;
    locationArea: string | null;
    floorNoString: string | null;
    description: string | null;
    realEstateDescription: string | null;
    actionName: string | null;
    actionShortName: string | null;
    spaces: string | null;
    spacesValue: string | null;
    spacesNumber: string | null;
    statusName: string | null;
    portalName: string | null;
    typeName: string | null;
    typePlural: string | null;
    subTypeName: string | null;
    subTypeShortName: string | null;
    typeShortName: string | null;
    currency: string | null;
    priceSupplement: string | null;
    roomsSupplement: string | null;
    ceilingHeight: number | null;
    actualAge: number | null;
    transportationId: number | null;
    newBuilding: number | null;
    bedroomNo: number | null;
    energyEfficiencyClass: string | null;
    equipment: string | null;
    orientation: string | null;
    heating: string | null;
    transportation: string | null;
    propertyConditionName: string | null;
    yearAdapted: number | null;
    statusId: number | null;
    infrastructure: string | null;
    joinery: string | null;
    floorNo: number | null;
    positionName: string | null;
    priceOld: number | null;
    ownerPermit: string | null;
    toiletteNo: number | null;
    flatsNo: number | null;
    fieldArea: number | null;
    speciality: string | null;
    bedNo: number | null;
    access: string | null;
    center: number | null;
    adress: string | null;
    adressSync: number | null;
    buldingPermit: string | null;
    oldId: number | null;
    parkingPlacePrice: number | null;
    longitude: number | null;
    latitude: number | null;
    optionsTitle: string | null;
    parkingNo: number | null;
    specialOffer: number | null;
    //infield: string | null;
    photos: PhotoDto[];
    agents?: AgentDto[];
    thumbnail: string | null;
    videos?: VideoDto[];
}

export interface LocationDto {
    countryName: string;
    counties: CountyDto[];
}

export interface CountyDto {
    countyName: string;
    cities: CityDto[];
}

export interface CityDto {
    cityName: string;
    areas: AreaDto[];
}

export interface AreaDto {
    areaName: string;
    count: number;
}

export interface ShortListDto {
    name: string;
    short: string;
}

