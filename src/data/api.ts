export const ApiEndPointBase = "/api/RealEstate"


export const ApiRealEstate = ApiEndPointBase 
export const ApiRealEstateFromList= `${ApiEndPointBase}/GetFromList`
export const ApiRealEstateFeatured = `${ApiEndPointBase}/GetFeatured`
export const ApiLocation = `${ApiEndPointBase}/Locations`
export const ApiLocationArea = `${ApiEndPointBase}/LocationsArea`
export const ApiPropertyType = `${ApiEndPointBase}/PropertyType`
export const ApiActionName = `${ApiEndPointBase}/ActionNames`
export const ApiValueRanges = `${ApiEndPointBase}/ValueRanges`
export const ApiRoomsNo = `${ApiEndPointBase}/RoomsNo`
export const ApiLocationAreaCountyCity = `${ApiEndPointBase}/LocationsAreaCountyCity`
export const ApiLocationAreaCity = `${ApiEndPointBase}/LocationsAreaCity`

export const ApiAgents = `${ApiEndPointBase}/Agents`
export const ApiAgentById = (id: number) => `${ApiEndPointBase}/Agents/${id}`