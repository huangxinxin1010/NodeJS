const { genUuid } = require('../utils');
const Sequelize = require('sequelize');
// sequelize是连接mysql的对象
var sequelize = new Sequelize('mysql://root:123456@localhost:3306/pc', {
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// 连接的过程
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/**
 * 用户
 * username 用户名
 * password 密码
 * question 问题
 * answer 答案
 * role 角色 1 超级管理员 2 普通用户
 */
// MongoDB中的主键以时间戳为基础，以进程编号，服务器名称为后缀，
// 以此保证新数据填入时一定有一个独一无二的标识，从而免去与"用户注册表"的主键查询交互。
const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => {
      return genUuid()
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    // 唯一约束
    unique: true,
    validate: {
      isUnique: async (username) => {
        const res = await User.findOne({ where: { username } })
        if (res) throw new Error('sorry，用户名已经存在了');
      },
      notAllowNull(username) {
        if (!username) throw new Error('sorry，用户名不能为空');
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    // 验证
    validate: {
      notAllowNull(password) {
        if (!password) throw new Error('sorry，密码不能为空');
      }
    }

  },
  question: {
    type: Sequelize.STRING,
    allowNull: false,
    // 验证
    validate: {
      notAllowNull(question) {
        if (!question) throw new Error('sorry，密保问题不能为空');
      }
    }
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false,
    // 验证
    validate: {
      notAllowNull(answer) {
        if (!answer) throw new Error('sorry，密保答案不能为空');
      }
    }
  },
  role: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  /*利用UUID生成token*/
  token: {
    type: Sequelize.UUID
  }
});

/**
 * 图书
 * name 名称
 * author 作者
 * publisher 出版社
 * isbn ISBN
 * sendareas 发货地
 * image 图片地址
 * describe 描述
 * price 价格
 */

const Goods = sequelize.define('goods', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => {
      return genUuid()
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notAllowNull(name) {
        if (!name) throw new Error('sorry，图书名不能为空');
      }
    }
  },
  author: {
    type: Sequelize.STRING
  },
  publisher: {
    type: Sequelize.STRING
  },
  isbn: {
    type: Sequelize.STRING
  },
  sendareas: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING,
  },
  describe: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  }
}, {
    freezeTableName: true
  });


/**
 * 订单
 * status 状态 0购物车 1未支付 2已支付 3取消订单
 */

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => {
      return genUuid()
    }
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
}, {
    freezeTableName: true
  });

/**
 * 图书类型分类
 * name 类别名称
 */

const Category = sequelize.define('category', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => {
      return genUuid()
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
    freezeTableName: true
  });

/**
* 排行榜分类
* name 排行榜名称
*/
const Rank = sequelize.define('rank', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => {
      return genUuid()
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
    freezeTableName: true
  });

/**
 * 地址
 * name 姓名
 * mobile 手机号
 * zipcode 邮编
 * address 收货地址
 */

const Address = sequelize.define('address', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => {
      return genUuid()
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
    freezeTableName: true
  });


const Record = sequelize.define('record', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: () => {
      return genUuid()
    }
  },keyword: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true
});
// 关系
User.hasMany(Address);
// User.hasMany(Record);
Goods.belongsTo(Category);
Goods.belongsTo(Rank);

Order.belongsTo(Goods);
Order.belongsTo(User);
Order.belongsTo(Address);

Record.belongsTo(User);


// User.sync({ force: true })
// Category.sync({ force: true })
// Rank.sync({ force: true })
// Goods.sync({ force: true })
// Order.sync({ force: true })
// Address.sync({ force: true })


module.exports = {
  User,
  Address,
  Goods,
  Category,
  Rank,
  Order,
  Record,
}

