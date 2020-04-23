const { Rank } = require('../db');

// 类型列表
const list = async (ctx) => {
	try {

		const data = await Rank.findAndCount();

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


// 新增类型
const create = async (ctx) => {
	try {
		const {
			name,
		} = ctx.request.body


		await Rank.create({
			name,
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

// 编辑类型
const edit = async (ctx) => {
	try {
		const {
			id,
			name,
		} = ctx.request.body

		const rank = await Rank.findOne({
			where: {
				id
			}
		})

		if(!rank){
			throw '数据不存在'
		}
		await rank.update({
			name,
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

// 删除类型
const del = async (ctx) => {
	try {
		const {
			id
		} = ctx.request.body
	
		const rank = await Rank.findOne({
			where: {
				id
			}
		})

		if(!rank){
			throw '数据不存在'
		}

		await rank.destroy()

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
	list,
	create,
	edit,
	del
}
