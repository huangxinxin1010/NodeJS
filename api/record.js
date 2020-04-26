const {Record} = require('../db');
// 创建记录
const create = async (ctx) => {
    try {
        const {
            keyword,
        } = ctx.request.body
        const user = ctx.user
        await Record.create({
            keyword,
            userId: user.id,
        })
        ctx.body = {
            code: 0
        }
    } catch (err) {
        console.log(err)
        ctx.body = {
            code: 1,
            err
        }
    }
}
module.exports = {
    create,

}
