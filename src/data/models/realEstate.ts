export interface PhotoDto {
    name: string;
    title: string;
    priority: number;
}

export interface AgentDto {
    name: string;
    surname: string;
    company: string;
    licence: string;
    email: string;
    phone: string;
    mobile: string;
    image: string;
}

export interface RealEstateDto {
    id: number;
    price: number | 0;
    priceM2: number | 0;
    code: string | null;
    area: number | 0;
    roomsNo: number | null;
    bathroomNO: number| null;
    gmapSync: number| null;
    approximateLocation: number | null;
    inserted: string | null;
    edited: string | null;
    ownerPermit: number| null;
    lux: number| null;
    tags: string | null;
    locationCountryName: string | null;
    locationCountyName: string | null;
    locationCityName: string | null;
    locationArea: string | null;
    floorNo: number| null;
    floorNoString: string | null;
    description: string | null;
    realEstateDescription: string | null;
    actionName: string | null;
    actionShortName: string | null;
    spaces: string | null;
    spacesValue: string | null;
    spacesNumber: string | null;
    status: string | null;
    portalName: string | null;
    typeName: string | null;
    typePlural: string | null;
    subTypeName: string | null;
    subTypeShortName: string | null;
    photos: PhotoDto[];
    agent?: AgentDto[];
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
