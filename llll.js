/**
 * 环境变量llllpara=para@para
 * cron: 11 2 6 * * *
 */
const $ = new Env('流量来啦')

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
const users = []

para.split('@').forEach(val => {
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
    const user = {}
    user.token = token
    // 获取用户信息
    try {
      const { data } = await request.post('/ah_red_come/app/getuser', {
        para: JSONStringifyEncrypt({
          queryDate: getFormatTime(),
          phone: token
        })
      })

      const res = JSONParseDecrypt(data)
      const nickname = res.data.nickname
      console.log(`🍚昵称:${nickname}`)
      user.openid = res.data.openid
      user.nickname = nickname
    } catch (error) {
      console.log(error.message)
      continue
    }
    await wait(2123)

    // 签到
    try {
      const { data } = await request.post('/ah_red_come/app/userSign', {
        para: JSONStringifyEncrypt({
          queryDate: getFormatTime(),
          phone: token
        })
      })

      const res = JSONParseDecrypt(data)
      console.log(res.msg)
    } catch (error) {
      console.log(error.message)
      continue
    }
    await wait(3214)

    //获取红包码
    try {
      const { data } = await request.post('/ah_red_come/app/sendRedPackage', {
        para: JSONStringifyEncrypt({
          queryDate: getFormatTime(),
          phone: token,
          openid: user.openid
        })
      })
      const res = JSONParseDecrypt(data)
      user.giveseqid = res.data
    } catch (error) {
      console.log(error.message)
      continue
    }
    await wait(2320)

    users.push(user)
  }

  await wait(3313)
  console.log('\n\n🥗开始开红包')
  i = 1
  for (const user of users) {
    console.log(`\n🚗========第${i}个账号========\n`)
    i++
    console.log(`当前账号:${user.nickname}`)

    // 拆红包
    for (const item of users) {
      await wait(3245)
      // 如果是自己就跳过
      if (item.openid === user.openid) {
        continue
      }

      try {
        const { data } = await request.post('/ah_red_come/app/getRedPackageById', {
          para: JSONStringifyEncrypt({
            queryDate: getFormatTime(),
            id: item.giveseqid
          })
        })
        const res = JSONParseDecrypt(data)
        await wait(2653)

        // 判断红包是否有剩余
        if (!res.data.leftcount) {
          try {
            const { data } = await request.post('/ah_red_come/app/sendRedPackage', {
              para: JSONStringifyEncrypt({
                queryDate: getFormatTime(),
                phone: item.token,
                openid: item.openid
              })
            })
            const resData = JSONParseDecrypt(data)
            item.giveseqid = resData.data
            console.log(`${item.nickname}更新红包码`)
          } catch (error) {
            console.log(error.message)
            continue
          }
          await wait(1320)
        }

        let flagid = ''
        // 拆红包
        try {
          const { data } = await request.post('/ah_red_come/app/receiveRed', {
            para: JSONStringifyEncrypt({
              queryDate: getFormatTime(),
              giveseqid: item.giveseqid,
              phone: user.token
            })
          })
          const resData = JSONParseDecrypt(data)
          const code = resData.code

          // 过滤
          if (code === 4) {
            console.log(resData.msg)
            continue
          }
          if (code === 20) {
            console.log(resData.msg)
            break
          }
          flagid = resData.data.flagid
          console.log(`🍿获取:${resData.data.name}`)
        } catch (error) {
          console.log(error.message)
          break
        }
        await wait(2398)

        // 领取
        try {
          const { data } = await request.post('/ah_red_come/app/receiveRedPackage', {
            para: JSONStringifyEncrypt({
              queryDate: getFormatTime(),
              receiveid: flagid,
              phone: user.token
            })
          })
          const resData = JSONParseDecrypt(data)
          console.log(resData.msg)
        } catch (error) {
          console.log(error.message)
          break
        }
      } catch (error) {
        console.log(error.message)
        break
      }
    }
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

function e(e) {
  return (e = e.toString())[1] ? e : '0' + e
}

function getFormatTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

function JSONParseDecrypt(data) {
  return JSON.parse(Decrypt(data))
}

function JSONStringifyEncrypt(data) {
  return Encrypt(JSON.stringify(data))
}
