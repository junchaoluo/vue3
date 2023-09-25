export interface GetUserParams {
    keywords: string,
    pageIndex: number,
    pageSize: number,
    departmentId?: string,
    needCheckAll?: boolean,
    status?: number
}