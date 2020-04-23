const uuid = require('node-uuid')

const genUuid = () => {
  return uuid.v4().replace(/-+/g, '')
}

const resErr = (ctx, err) => {
  console.log(err)
  if(typeof err == 'string') {
    ctx.body = {
      code: 1,
      errMsg: err
    };
    return false
  }
  const errMsg = err && err.errors ? err.errors.filter(o => !o.message.includes('Warning')) : ''
  ctx.body = {
    code: 1,
    errMsg: errMsg && errMsg.length ? errMsg[0].message : '服务器错误'
  };
}

module.exports = {
  genUuid,
  resErr
}