/**
 * 环境变量jtxqToken=token@tokne
 * cron: 11 2 9 * * *
 */
const $ = new Env('鲸碳星球')
const { wait, userStartLog } = require('./utils')
const axios = require('axios')
// require('dotenv').config()

const request = axios.create({
  baseURL: 'https://xcx.jingluone.com',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; MI 6X Build/PKQ1.180904.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/6404 MicroMessenger/8.0.27.2220(0x28001B59) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    Referer: 'https://servicewechat.com/wxee705671364b279b/1/page-frame.html',
    Host: 'xcx.jingluone.com',
  },
})

const jtxqToken = process.env.jtxqToken
if (!jtxqToken) {
  console.log('请填写para环境变量！！！')
  process.exit(0)
}

const tokens = jtxqToken.split('@')

main()

async function main() {
  await wait(3000)
  let i = 1
  for (const token of tokens) {
    userStartLog(i)
    i++
    try {
      const { data: res } = await sendRequest('sigin', token)
      console.log(`获得${res.info.sigin.currency}积分`)
    } catch (error) {
      console.log(error.message)
      continue
    }
    await wait(2365)

    try {
      const { data: res } = await sendRequest('receive', token)
      console.log(res.info)
    } catch (error) {
      console.log(error.message)
      continue
    }
  }
}

/**
 *
 * @param {string} action
 * @param {string} token
 * @returns
 */
function sendRequest(action, token) {
  return request.get('/app/index.php', {
    params: {
      i: '1',
      t: '0',
      v: '1.0.4',
      from: 'wxapp',
      c: 'entry',
      a: 'wxapp',
      do: action,
      m: 'bh_step',
      token: 'e8a14ed75aef419b969832a0c6fa84d1',
      version: '4.1.92',
    },
  })
}

function Env() {}
