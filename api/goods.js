const { resErr } = require('../utils');
const { Goods, Category, Rank } = require('../db');
const searchList = async (ctx) => {
	try{
	// 获取参数,param是参数
	const {name:param} = ctx.request.body
		const searchList = await Goods.findAll({
		where:{
			$or:[
				{
					name: {
						$like: `%${param}%`
					}
				},
				{
					publisher:{
						$like:`%${param}%`
					}
				},
				{
					author:{
						$like:`%${param}%`
					}
				},
				{
					isbn:{
						$like:`%${param}%`
					}
				},
				{
					sendareas:{
						$like:`%${param}%`
					}
				},
				{
					price:{
						$like:`%${param}%`
					}
				}
			]
		}
	})
		console.log(searchList)
		ctx.body={
			code:0,
			data:searchList
		}
	}catch (err) {
		resErr(ctx, err)
	}
}

// 图书列表
const list = async (ctx) => {
	try {
		const { page, pageSize, categoryId, rankId, } = ctx.request.body

		const where = {
			categoryId,
			rankId,
		}
		if(!categoryId) delete where.categoryId
		if(!rankId) delete where.rankId
		const { count: total, rows: dataList } = await Goods.findAndCount({
			where,
			include: [Category, Rank],
			offset: page * pageSize || 0,
			limit: pageSize || 50
		});
		ctx.body = {
			code: 0,
			total,
			dataList
		}
	} catch (err) {
		resErr(ctx, err)
	}
}
// 商品详情
const detail = async (ctx) => {
	try {
		const { id} = ctx.request.body
		const data = await Goods.findOne({
			where: {
				id
			},
		});

		ctx.body = {
			code: 0,
			data
		}
	} catch (err) {
		resErr(ctx, err)
	}
}


// 添加商品
const create = async (ctx) => {
	try {
		console.log(ctx.user)
		if (ctx.user.role != 1) {
			throw '只有管理员才可以进行此操作'
		}
		const {
			name,
			author,
			publisher,
			isbn,
			sendareas,
			image,
			price,
			describe,
			categoryId,
			rankId
		} = ctx.request.body

		await Goods.create({
			name,
			author,
			publisher,
			isbn,
			sendareas,
			image,
			price,
			describe,
			categoryId,
			rankId
		})

		ctx.body = {
			code: 0
		}
	} catch (err) {
		resErr(ctx, err)
	}
}

// 编辑商品
const edit = async (ctx) => {
	try {
		if (ctx.user.role != 1) {
			throw '只有管理员才可以进行此操作'
		}
		const {
			id,
			name,
			author,
			publisher,
			isbn,
			sendareas,
			image,
			price,
			describe,
			categoryId,
			rankId
		} = ctx.request.body

		const goods = await Goods.findOne({
			where: {
				id
			}
		})

		if (!goods) {
			throw '数据不存在'
		}
		await goods.update({
			name,
			author,
			publisher,
			isbn,
			sendareas,
			image,
			price,
			describe,
			categoryId,
			rankId
		})

		ctx.body = {
			code: 0
		}
	} catch (err) {
		resErr(ctx, err)
	}
}

// 删除商品
const del = async (ctx) => {
	try {
		if (ctx.user.role != 1) {
			throw '只有管理员才可以进行此操作'
		}
		const {
			id
		} = ctx.request.body

		const goods = await Goods.findOne({
			where: {
				id
			}
		})

		if (!goods) {
			throw '数据不存在'
		}

		await goods.destroy()

		ctx.body = {
			code: 0
		}
	} catch (err) {
		resErr(ctx, err)
	}
}

module.exports = {
	list,
	create,
	edit,
	del,
	detail,
	searchList
}
