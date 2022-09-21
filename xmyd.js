/**
 * 原理: 通过小米运动修改步数，此脚本使用第三方接口，不是小米运动的接口
 * 变量: xmyd="小米运动账号#密码@小米运动账号#密码", 密码用#分割,多个账号之间用@分割
 * 步数: 修改STEP变量
 * cron: 11 0 8,9 * * *
 */

const $ = new Env('小米运动刷步数')
const Axios = require('axios')
// require('dotenv').config()

// 步数
const STEP = 47982

const userStr = process.env.xmyd
if (!userStr) {
  console.log('请填写xmyd环境变量！！！')
  process.exit(0)
}

const users = userStr.split('@')
console.log(`共${users.length}个账号`)

const axios = Axios.create({
  baseURL: 'https://4og.cn/xm/app/ajax.php',
  timeout: 10000,
  headers: {
    'User-Agent': 'Apache-HttpClient/UNAVAILABLE (java 1.4)',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const hour = new Date().getHours()

main()

async function main() {
  let i = 1
  for (const user of users) {
    console.log(`🚌=======第${i}个账号=======\n\n`)
    const account = user.split('#')[0]
    const pwd = user.split('#')[1]
    let step = hour > 8 ? STEP + 1000 : STEP
    let successful = false
    let attempts = 0

    while (!successful) {
      if (attempts) {
        step += 100
        console.log(`第${attempts}次尝试`)
      }
      try {
        const data = {
          usr: account,
          psw: pwd,
          bs: `${step}formSubmitBtn`
        }
        const { data: res } = await axios.post('/', new URLSearchParams(data).toString())
        if (res.message !== '更新失败') {
          console.log(`提交步数${step}`)
          successful = true
        }
        console.log(res.message)

        if (successful) {
          break
        }

        if (attempts === 3) {
          console.log('更新次数上限，退出')
          break
        }
        // 更新失败，10秒后进行重试
        await sleep(10000)
        attempts++
      } catch (error) {
        console.log('请求失败')
      }
    }

    if (i === users.length) {
      break
    }
    console.log('\n')
    await sleep(10000)
    i++
  }
}

async function sleep(time) {
  return new Promise(resolved => {
    setTimeout(() => resolved(), time)
  })
}

function Env() {}
