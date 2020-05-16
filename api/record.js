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
//推荐图书-查询关键字
const detail = async (ctx) => {
    try {
        const {id: userId,keyword} = ctx.user
        const where={
            userId
        }

        const data = await Record.findOne({
          where,
        });
        ctx.body = {
            code: 0,
            data
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
    detail,

}
