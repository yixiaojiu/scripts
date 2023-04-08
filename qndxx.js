/**
 * 应用: 青年大学习公众号
 * 环境变量: qndxxToken="token@token", 多账号用@分割
 * cron: 10 5 8 * * *
 */
const $ = new Env('青年大学习')
const axios = require('axios')

// require('dotenv').config()

const request = axios.create({
  baseURL: 'http://dxx.ahyouth.org.cn',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36 MMWEBID/6404 MicroMessenger/8.0.25.2200(0x28001953) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
  },
})

const qndxxToken = process.env.qndxxToken
if (!qndxxToken) {
  console.log('请填写qndxxToken环境变量！！！')
  process.exit(0)
}

const tokens = qndxxToken.split('@')
console.log(`共${tokens.length}个账号`)

main()

async function main() {
  let i = 1
  for (const token of tokens) {
    console.log(`\n🚗========第${i}个账号========\n`)
    i++
    const { data: userInfoData, error: userInfoError } = await getUserInfo(
      token
    )
    if (userInfoError) {
      continue
    }
    console.log('当前账号:' + userInfoData.content.nickname)

    await wait(2000)

    // 当期学习
    const { error: newLearnError } = await newLearn(token)
    if (newLearnError) {
      continue
    }
    await wait(2000)

    // 往期学习
    const { error: oldLearnError } = await oldLearn(token)
    if (oldLearnError) {
      continue
    }
    await wait(2000)

    // 阅读文章
    const { error: taskReadArticleError } = await taskReadArticle(token)
    if (taskReadArticleError) {
      continue
    }
    await wait(2000)

    // 获取每日任务
    const { data: todayTaskData, error: getTodayTaskError } =
      await getTodayTask(token)
    if (getTodayTaskError) {
      continue
    }
    const tadayList = todayTaskData.list
    console.log('🧀当前可用积分:' + tadayList.usable_score)
    console.log('🍟今日获得积分', tadayList.today_score)
  }
}

async function getUserInfo(token) {
  try {
    const { data } = await request.post('/api/userInfo', undefined, {
      headers: {
        token,
      },
    })
    return {
      data,
      error: false,
    }
  } catch (err) {
    console.log(err.message)
    return {
      error: true,
    }
  }
}

async function newLearn(token) {
  try {
    const { data } = await request.post('/api/newLearn', undefined, {
      headers: {
        token,
      },
    })
    console.log('当期学习:' + data.message)
    return {
      error: false,
    }
  } catch (err) {
    console.log(err.message)
    return {
      error: true,
    }
  }
}

async function oldLearn(token) {
  try {
    const { data } = await request.post(
      '/api/oldLearn',
      { id: 203 },
      {
        headers: {
          token,
        },
      }
    )
    console.log('往期学习:' + data.message)
    return {
      error: false,
    }
  } catch (err) {
    console.log(err.message)
    return {
      error: true,
    }
  }
}

async function getArticleList(token, page) {
  try {
    const { data } = await request.post('/api/imageTextList', undefined, {
      headers: {
        token,
      },
      params: {
        page,
      },
    })
    return {
      data,
      error: false,
    }
  } catch (error) {
    console.log(error.message)
    return {
      error: true,
    }
  }
}

async function readArticle(token, id) {
  try {
    await request.post(
      '/api/imageTextDetail',
      { id },
      {
        headers: {
          token,
        },
      }
    )
    console.log('阅读文章成功')
  } catch (error) {
    console.log(error.message)
  }
}

async function getTodayTask(token) {
  try {
    const { data } = await request.post('/api/todayTask', undefined, {
      headers: {
        token,
      },
    })
    return {
      data,
      error: false,
    }
  } catch (error) {
    console.log(error.message)
    return {
      error: true,
    }
  }
}

async function taskReadArticle(token) {
  const { data: firstData, error: firstError } = await getArticleList(token, 1)
  if (firstError) {
    return {
      error: true,
    }
  }
  await wait(2000)
  const { data, error } = await getArticleList(
    token,
    getRandomInt(1, firstData.lists.last_page)
  )
  if (error) {
    return {
      error: true,
    }
  }
  const articleIds = data.lists.data.map(item => item.id)
  await wait(2000)

  let i = 1
  for (const id of articleIds) {
    if (i > 5) {
      break
    }
    await readArticle(token, id)
    i++
    await wait(2000)
  }
  return {
    error: false,
  }
}

/**
 *
 * @param {number} second
 * @returns
 */
async function wait(second) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), second)
  })
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function Env() {}
