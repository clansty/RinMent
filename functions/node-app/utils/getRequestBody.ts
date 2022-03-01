import {IncomingMessage} from 'http'

export default async (req: IncomingMessage) => new Promise<string>(resolve => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        resolve(body)
    })
})
