const {User} = require('../db');

let whiteList = []

const checkToken = async (ctx, next) => {




	let res = whiteList.filter(o => o == ctx.request.url).length

	let {token} = ctx.request.body

	// 需要检查 但是没有传token字段
	if (!res && !token) {
		ctx.body = {
			code: 403,
			msg: '无token'
		}

		return false
	}

	// 需要检查并且有token字段
	if (!res && token) {
		// token匹配不到用户
		let user = await User.findOne({
			where: {
				token
			}
			
		})

		if (!user) {
			ctx.body = {
				code: 403,
				msg: '无效的token'
			}
			return false
		}
		
		
		ctx.user = user

		await next();

		return false

	}
	await next();

}

module.exports = function (list = []) {
	whiteList = list
	return checkToken
}