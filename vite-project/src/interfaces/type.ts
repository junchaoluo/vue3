export interface SearchTypeParams {
    pageNum: number,
    pageSize: number,
    keywords: string
}

export interface TypeParams {
    id: string | null | undefined,
    name: string,
    code: string,
    recordDimension: string,
    openFormula: number,
    openTable: number
}