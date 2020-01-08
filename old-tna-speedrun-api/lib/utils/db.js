const mongoose = require('mongoose')
const { DB_URI, DB_NAME } = process.env

module.exports = {
  // 连接数据库并执行操作，操作完毕后关闭数据库连接
  async connectDB (callback = () => {}) {
    // connect 连接后必须调用 close 关闭连接，否则会导致进程死掉
    await mongoose.connect(DB_URI, { 
      useNewUrlParser: true,
      dbName: DB_NAME
    })
    try {
      await callback()
    } catch (e) {
      console.log(e)
    } finally {
      await mongoose.connection.close()
    }
  },

  // 仅连接数据库
  async onlyConnect () {
    await mongoose.connect(DB_URI, { 
      useNewUrlParser: true,
      dbName: DB_NAME
    })
  },

  // 仅关闭数据库连接
  async onlyClose () {
    await mongoose.connection.close()
  }
}