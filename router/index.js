// 加载路由模块
// 分类引入请求
// 每个功能的请求
const Router = require('koa-router')(), {
	user,
	goods,
	address,
	category,
	order,
	rank,
	record,

} = require('../api'), types = ['get', 'post'], get = [], post = [
	['/login', user.login],
	['/register', user.register],
	['/find', user.find],
	['/user', user.list],
	['/users', user.list1],
	['/user/create', user.create],
	['/user/edit', user.edit],
	['/user/delete', user.del],
	['/user/detail', user.detail],

	['/goods', goods.list],
	['/goods/create', goods.create],
	['/goods/edit', goods.edit],
	['/goods/delete', goods.del],
	['/goods/detail', goods.detail],
	['/goods/search', goods.searchList],

	['/address', address.list],
	['/address/create', address.create],
	['/address/edit', address.edit],
	['/address/delete', address.del],
	['/address/detail', address.detail],

	['/category', category.list],
	['/category/create', category.create],
	['/category/edit', category.edit],
	['/category/delete', category.del],

	['/rank', rank.list],
	['/rank/create', rank.create],
	['/rank/edit', rank.edit],
	['/rank/delete', rank.del],

	['/order', order.list],
	['/order1', order.list1],
	['/order2', order.list2],
	['/order3', order.list3],
	['/order/create', order.create],
	['/order/create1', order.create1],
	['/order/delete', order.del],
	['/order/detail', order.detail],
	['/order/status', order.status],
	['/order/edit', order.edit],

	['/record/create', record.create],
	['/record/detail', record.detail],


], router = {
	get,
	post
};


types.forEach(type => {
	router[type].forEach(route => {
		const [url, api] = route
		Router.post(url, api)
	})
})


module.exports = Router