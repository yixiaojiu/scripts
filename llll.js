/**
 * 环境变量llllpara=para@para
 * cron: 11 2 6 * * *
 */
const $ = new Env('第二课堂成绩单')

// require('dotenv').config()
const { wait } = require('./utils')
const dayjs = require('dayjs')
const t = require('./aes.js')
const r = t.enc.Utf8.parse('hbdxWxSmall96548')
const n = t.enc.Utf8.parse('6606136474185246')

const request = require('axios').default.create({
  baseURL: 'https://llhb.ah163.net',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; MI 6X Build/PKQ1.180904.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220805 Mobile Safari/537.36 MMWEBID/6404 MicroMessenger/8.0.27.2220(0x28001B59) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    Referer: 'https://servicewechat.com/wx1f62ea786b9aaf30/136/page-frame.html',
    Host: 'llhb.ah163.net'
  }
})

const para = process.env.llllpara
if (!para) {
  console.log('请填写para环境变量！！！')
  process.exit(0)
}

const tokens = []

para.split('@').forEach(val => {
  console.log(val)
  console.log(Decrypt(val))
  try {
    const phone = JSON.parse(Decrypt(val)).phone
    if (phone) {
      tokens.push(phone)
    } else {
      console.log(`无phone，不合法 ${val}`)
    }
  } catch (error) {
    console.log(error.message)
  }
})

console.log(`🥪共${tokens.length} 个有效账号`)

main()

async function main() {
  await wait(3000)
  let i = 1
  for (const token of tokens) {
    console.log(`\n🚗========第${i}个账号========\n`)
    i++
    try {
      const { data } = await request.post('/ah_red_come/app/userSign', {
        para: Encrypt(
          JSON.stringify({
            queryDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            phone: token
          })
        )
      })
      const res = JSON.parse(Decrypt(data))
      console.log(res.msg)
    } catch (error) {
      console.log(error.message)
    }
    await wait(5124)
  }
}

function Env() {}

function Decrypt(e) {
  var a = t.enc.Hex.parse(e),
    o = t.enc.Base64.stringify(a)
  return t.AES.decrypt(o, r, {
    iv: n,
    mode: t.mode.CBC,
    padding: t.pad.Pkcs7
  })
    .toString(t.enc.Utf8)
    .toString()
}

function Encrypt(e) {
  var a = t.enc.Utf8.parse(e)
  return t.AES.encrypt(a, r, {
    iv: n,
    mode: t.mode.CBC,
    padding: t.pad.Pkcs7
  }).ciphertext.toString()
}

var e = function (e) {
  return (e = e.toString())[1] ? e : '0' + e
}
