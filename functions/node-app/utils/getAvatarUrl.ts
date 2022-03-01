import md5 from 'md5'

export default (email: string) => {
    if (/([1-9]([0-9]{5,11}))@qq\.com/.test(email)) {
        const uin = /([1-9]([0-9]{5,11}))@qq\.com/.exec(email)[1]
        return `https://q1.qlogo.cn/g?b=qq&nk=${uin}&s=640`
    }
    const hash = md5(email.trim().toLowerCase())
    return `https://cdn.v2ex.com/gravatar/${hash}?s=200&d=mp`
}
