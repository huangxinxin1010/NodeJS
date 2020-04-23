const { Category } = require('../db');

// 类型列表
const list = async (ctx) => {
	try {

		const data = await Category.findAndCount();

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


		await Category.create({
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

		const category = await Category.findOne({
			where: {
				id
			}
		})

		if(!category){
			throw '数据不存在'
		}
		await category.update({
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
	
		const category = await Category.findOne({
			where: {
				id
			}
		})

		if(!category){
			throw '数据不存在'
		}

		await category.destroy()

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
