const { Order, Goods, Category, Rank, Address } = require('../db');

// 购物车列表
const list = async (ctx) => {
	try {
		const { page, pageSize} = ctx.request.body

		const user = ctx.user

		let where = {}
		if (user.role == 2 ) {
			where = {
				userId: user.id,
				status:0
			}
		}
		const { count: total, rows: dataList } = await Order.findAndCount({
			where,
			include: [{
				model: Goods,
				include: [{
					model: Category,
					attributes: ['id', 'name'],
				}, {
					model: Rank,
					attributes: ['id', 'name'],
				}]
			},
				Address
			],
			offset: page * pageSize || 0,
			limit: pageSize || 50
		});

		ctx.body = {
			code: 0,
			total,
			dataList
		}
	} catch (err) {
		console.log(err)
		ctx.body = {
			code: 1,
			err
		}
	}
}

// 历史购买记录
const list2 = async (ctx) => {
	try {
		const { page, pageSize} = ctx.request.body

		const user = ctx.user

		let where = {}
		if (user.role == 2 ) {
			where = {
				userId: user.id,
				status:[2,3]
			}
		}
		const { count: total, rows: dataList2 } = await Order.findAndCount({
			where,
			include: [{
				model: Goods,
				include: [{
					model: Category,
					attributes: ['id', 'name'],
				}, {
					model: Rank,
					attributes: ['id', 'name'],
				}]
			},
				Address
			],
			offset: page * pageSize || 0,
			limit: pageSize || 50
		});

		ctx.body = {
			code: 0,
			total,
			dataList2
		}
	} catch (err) {
		console.log(err)
		ctx.body = {
			code: 1,
			err
		}
	}
}

// 订单详情
const detail = async (ctx) => {
	try {
		const { id } = ctx.request.body

		const data = await Order.findOne({
			where: {
				id
			},
			include: [{
				model: Goods,
				include: [{
					model: Category,
					attributes: ['id', 'name'],
				}, {
					model: Rank,
					attributes: ['id', 'name'],
				}]
			},
				Address
			]
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

// 创建订单
const create = async (ctx) => {
	try {

		const {
			goodsId,
			addressId,
			orderId,
		} = ctx.request.body

		const ads = await Address.findOne({
			where: {
				id: addressId
			}
		})
		if (!ads) {
			throw '地址不存在'
		}
		const good = await Goods.findOne({
			where: {
				id: goodsId
			}
		})
		const order = await Order.findOne({
			where: {
				id:orderId
			}
		})
		const user = ctx.user
		await Order.create({
			name: ads.name,
			goodId: goodsId,
			addressId,
			userId: user.id,
			status: 0,
			quantity:1,
			totalPrice:good.price,

		})
		console.log('totalPrice')

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


// 删除订单
const del = async (ctx) => {
	try {
		const {
			id
		} = ctx.request.body
		const order = await Order.findOne({
			where: {
				id
			}
		})
		if (!order) {
			throw '数据不存在'
		}
		await order.destroy()
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


// 更改订单状态
const status = async (ctx) => {
	try {

		const {
			id,
			status,
		} = ctx.request.body

		const order = await Order.findOne({
			where: {
				id
			}
		})

		if (!order) {
			throw '数据不存在'
		}

		if(order.userId != ctx.user.id && ctx.user.role == 2){
			throw '只能修改自己的订单'
		}

		await order.update({
			status
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

// 编辑数量
const edit= async (ctx) => {
	try {

		const {
			id,
			quantity,
			totalPrice
		} = ctx.request.body

		const order = await Order.findOne({
			where: {
				id
			}
		})
		if (!order) {
			throw '数据不存在'
		}
		if(order.userId != ctx.user.id && ctx.user.role == 2){
			throw '只能修改自己的订单'
		}
		await order.update({
			quantity,
			totalPrice
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
	list,
	create,
	del,
	detail,
	status,
	list2,
	edit
}
