/**
 * 环境变量zlcftToken=token@token
 * cron: 11 2 7,17 * * *
 */
const $ = new Env('涨乐财付通')
// require('dotenv').config()
const { wait } = require('./utils')

const request = require('axios').default.create({
  baseURL: 'https://m.zhangle.com',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; MI 6X Build/PKQ1.180904.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/1037 MicroMessenger/8.0.27.2220(0x28001B59) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    'content-type': 'application/x-www-form-urlencoded',
    Referer: 'https://servicewechat.com/wx78f87fe7f0ee0564/16/page-frame.html',
    Host: 'm.zhangle.com'
  }
})

const zlcftToken = process.env.zlcftToken

const tokens = zlcftToken.split('@')

main()

async function main() {
  let i = 1
  for (const token of tokens) {
    console.log(`\n🚗========第${i}个账号========\n`)
    await wait(4123)
    i++
    try {
      const { data } = await request.get('/push-web/3gGate/gate', {
        params: {
          _routeCode: '8E9239C29FE5533345CB30D7C6C38669',
          path: '/activity/weixin/signIntoLeMi',
          token
        }
      })
      console.log(data.msg)
      console.log(data)
      if (data.code === '0') {
        console.log(`🍟当前积分:${data.resultData.signInPointsOfToday}`)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}

function Env() {}
