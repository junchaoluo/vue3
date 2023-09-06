/**
		 * 随机生成一个[a-zA-Z0-9]的编码，默认返回8位。
		 *
		 * @method
		 * @param {Number|undefined} nSize
		 * @return {String}
		 */
 export const gsid = (nSize = 8) => {
    let asBase:Array<string> = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
    var nLength: number = asBase.length
    var asId: Array<string> = []

    while (nSize-- > 0) {
        asId.push(asBase[Math.floor(Math.random() * nLength)])
    }

    return asId.join('')
}

/**
		 * 使用 MD5 进行加密。
		 * 依赖 md5.min.js
		 *
		 * @param {String} sValue
		 * @param {String|undefined} sKey
		 * @param {Boolean|undefined} bRaw
		 * @return{String}
		 */
export const md5 = (sValue = '', sKey = '', bRaw = '') => {
    return ''
}

/**
		 * 生成一个 [min, max] 之间的值。
		 *
		 * @param {Number} nMin 最小时，包含。
		 * @param {Number} nMax 最大值，包含。
		 * @return {Number}
		 */
export const random = (nMin: number, nMax: number) => {
    return Math.round(Math.random() * (nMax - nMin) + nMin)
}

/**
		 * 生成一个 32 位的 id。
		 * 依赖 md5.min.js
		 */
export const gid = () => {
    return md5(new Date() + ',' + random(1000, 9999)) || gsid(32)
}

/**
 * 生成一个 16 位的 id。
 * 依赖 md5.min.js
 *
 * @return {String}
 */
 export const gid16 = () => {
    return gid().substr(8, 16)
}