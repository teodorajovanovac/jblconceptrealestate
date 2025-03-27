export const ApiEndPointBase = "/api/RealEstate"


export const ApiRealEstate = ApiEndPointBase 
export const ApiRealEstateFeatured = `${ApiEndPointBase}/GetFeatured`
export const ApiLocation = `${ApiEndPointBase}/Locations`
export const ApiPropertyType = `${ApiEndPointBase}/PropertyType`
export const ApiActionName = `${ApiEndPointBase}/ActionNames`
export const ApiValueRanges = `${ApiEndPointBase}/ValueRanges`
export const ApiRealEstateFromList= `${ApiEndPointBase}/GetFromList`

export const ApiAgents = `${ApiEndPointBase}/Agents`
export const ApiAgentById = (id: number) => `${ApiEndPointBase}/Agents/${id}`