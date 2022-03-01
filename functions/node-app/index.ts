import serverless from 'serverless-http'
import tcb from '@cloudbase/node-sdk'
import type {IncomingMessage, ServerResponse} from 'http'
import getRequestBody from './utils/getRequestBody'
import getAvatarUrl from './utils/getAvatarUrl'
import Comment from './types/Comment'

export const main = serverless(async (req: IncomingMessage, res: ServerResponse) => {
    if (!['GET', 'POST'].includes(req.method)) {
        res.statusCode = 405
        res.end()
    }
    const postId = req.url.substr(1)
    if (!/^[a-z0-9\-]+$/.test(postId)) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'text/plain')
        res.end('invalid postId nya щ(゜ロ゜щ)')
        return
    }
    const app = tcb.init({env: '环境名称'})
    const db = app.database()
    const col = db.collection('comments')

    if (req.method === 'GET') {
        //获取文章评论
        const ret = await col.where({postId}).field({email: false, postId: false}).get()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(ret))
    }
    else if (req.method === 'POST') {
        //写入评论
        const reqBody = JSON.parse(await getRequestBody(req))
        const {username, email, url, content} = reqBody
        if (!username) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/plain')
            res.end('invalid username nya щ(゜ロ゜щ)')
            return
        }
        if (!content) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/plain')
            res.end('content empty nya щ(゜ロ゜щ)')
            return
        }
        if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'text/plain')
            res.end('invalid email nya щ(゜ロ゜щ)')
            return
        }
        const avatar = getAvatarUrl(email)
        const commentObj = {
            username, content, email, url, avatar, postId,
            date: new Date(),
        } as Comment
        await col.add(commentObj)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(commentObj))
    }
})
