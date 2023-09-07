export interface LoginForm {
    name: string,
    password: string,
    adLogin: number,
}

export interface LoginParam {
    account: string,
    password: string,
    adLogin: 0 | 1,
    key: string,
    source: 0 | 1,
    identification: string,
    kaptcha?: string,
    verificationCode?: string
}

export interface UserInfo {
    id?: string,
    admin?: boolean,
    sysAdmin?: boolean,
    token?: string,
    account?: string,
    avator?: string | null,
    status?: number,
    nickname?: string,
    logintime?: number,
    uuid?: string,
    researchRooms?: string | null,
    location?: string,
    departmentList?: Array<string>,
    departmentName?: string,
    pwdExpirationTime?: string,
    remindDay?: number,
    hasReminded?: boolean,
    name?: string,
    realName?: string,
}