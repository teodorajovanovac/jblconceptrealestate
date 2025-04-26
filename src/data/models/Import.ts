export interface RealEstateShortDto {
    id: number;
    edited: string;
}

export interface ComparisonResult {
    addItems: RealEstateShortDto[];
    updateItems: RealEstateShortDto[];
    deleteItems: RealEstateShortDto[];
}

export interface ComparisonResultDto {
    action: string;
    id: number;
    edited: string;
}