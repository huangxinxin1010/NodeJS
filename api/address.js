const { Address } = require('../db');

// 地址列表
const list = async (ctx) => {
	
	try {
		const {id: userId} = ctx.user
		const data = await Address.findAndCount({
			where: {
				userId
			}
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

// 地址详情
const detail = async (ctx) => {
	try {
		const { id } = ctx.request.body

		const data = await Address.findOne({
			where: {
				id
			}
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

// 发布地址
const create = async (ctx) => {
	try {
		const {
			name,
			address,
			zipcode,
			mobile
		} = ctx.request.body

		const user = ctx.user

		await user.createAddress({
			name,
			address,
			zipcode,
			mobile

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

// 编辑地址
const edit = async (ctx) => {
	try {
		const {
			id,
			name,
			address,
			zipcode,
			mobile

		} = ctx.request.body

		const ads = await Address.findOne({
			where: {
				id
			}
		})

		if (!address) {
			throw '数据不存在'
		}
		await address.update({
			name,
			address,
			zipcode,
			mobile

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

// 删除地址
const del = async (ctx) => {
	try {
		const {
			id
		} = ctx.request.body

		const address = await Address.findOne({
			where: {
				id
			}
		})

		if (!address) {
			throw '数据不存在'
		}

		await address.destroy()

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
	del,
	detail
}
