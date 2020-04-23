const {genUuid, resErr} = require('../utils');
const { User } = require('../db');

// 登录
// ctxs是上下文的意思
const login = async (ctx) => {
	try {

		console.log(ctx)
		const { username, password } = ctx.request.body
		const token = genUuid()

		const data = await User.findOne({
			where: {
				username,
				password
			}
		});

		if(!data){
			throw '密码或用户名错误'
		}

		data.token = token
		await data.save()
		ctx.body = {
			code: 0,
			data
		}
	} catch (err) {
		resErr(ctx, err)
	}
}
// 忘记密码-密保登录
const find = async (ctx) => {
	try {
		console.log(ctx)
		const { username, question,answer } = ctx.request.body
		const token = genUuid()

		const data = await User.findOne({
			where: {
				username,
				question,
				answer
			}
		});

		if(!data){
			throw '密保或用户名错误'
		}

		data.token = token
		await data.save()
		ctx.body = {
			code: 0,
			data
		}
	} catch (err) {
		resErr(ctx, err)
	}
}
// 注册
const register = async (ctx) => {
	try {
		const {
			username,
			password,
			question,
			answer,
		} = ctx.request.body
// 对象简写
// 		var name = "test", age = 18, sex = "male";
//   var obj = {name: name, age: age, sex: sex}; 	<==>   var obj = {name, age, sex}
		await User.create({
			username,  //	<==>  username:username
			password,
			question,
			answer,
			role: 2
		})
	
		ctx.body = {
			code: 0
		}
	} catch (err) {
		resErr(ctx, err)
	}
	
}
//个人管理
const list = async (ctx) => {
	try {
		const {id:userId} = ctx.user
		const data = await User.findAndCount({
			where: {
				id:userId
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
//用户管理
const list1 = async (ctx) => {
	try{
		// 获取参数,param是参数
		const {role:param} = ctx.request.body
		const list1 = await User.findAll({
			where:{
				$or:[
					{
						role:[1, 2]
					}
				]
			}
		})
		console.log(list1.length)
		ctx.body={
			code:0,
			data:list1
		}
	}catch (err) {
		resErr(ctx, err)
	}
}
// 用户详情
const detail = async (ctx) => {
	try {
		const { id } = ctx.request.body

		const data = await User.findOne({
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
			username,
			password,
			question,
			answer
		} = ctx.request.body

		const user = ctx.user

		await user.createUser({
			username,
			password,
			question,
			answer

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

// 编辑用户
const edit = async (ctx) => {
	try {
		const {
			id,
			username,
			password,
			question,
			answer

		} = ctx.request.body

		const user = await User.findOne({
			where: {
				id
			}
		})

		if (!user) {
			throw '数据不存在'
		}
		await user.update({
			username,
			password,
			question,
			answer

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

// 删除用户
const del = async (ctx) => {
	try {
		const {
			id
		} = ctx.request.body

		const user= await User.findOne({
			where: {
				id
			}
		})

		if (!user) {
			throw '数据不存在'
		}

		await user.destroy()

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
	login,
	register,
	find,
	list,
	create,
	edit,
	del,
	detail,
	list1
}
