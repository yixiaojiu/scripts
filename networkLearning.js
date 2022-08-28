/**
 * 小程序: 第二课堂成绩单
 * 环境变量: studentId="学号@学号", 多账号用@分割
 * cron: 11 1 7,17 * * *
 */

// require('dotenv').config()
const { log } = console
const axios = require('axios').default.create({
  baseURL: 'https://dekt.hfut.edu.cn',
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36 MMWEBID/6404 MicroMessenger/8.0.25.2200(0x28001953) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android'
  }
})

const studentId = process.env.studentId
if (!studentId) {
  log('请填写xmyd环境变量！！！')
  process.exit(0)
}

const users = studentId.split('@')
log(`共${users.length}个账号`)

main(users)

async function main(users) {
  let i = 1
  for (const user of users) {
    log(`🚗========第${i}个账号========\n\n`)

    const { success, data: res } = await getScore(user)
    if (!success) {
      log(`🚑${user} 有问题`)
      continue
    }
    log(`当前积分🥠${res.data}`)
    if (res.data > 90) {
      log(`当前账号积分${res.data}, 已经达标`)
      continue
    }

    await wait(2000)
    await task(user)
    i++
  }
}

async function task(user) {
  const size = 20

  let page = 1
  let columnType = 0
  let finish = false

  while (!finish) {
    const { success, data: res } = await getArticles(user, page, size, columnType)
    if (!success) {
      log('🚑获取文章出错')
      break
    }
    const list = res.data.list
    await wait(1000)

    const { success: result, error } = await handleList(user, list)
    if (error) {
      return
    }
    if (result) {
      finish = true
    } else {
      if (res.data.lastPage) {
        if (columnType === 2) {
          log('所有题目都已经做完,没题目了🤣')
          break
        }
        page = 1
        columnType++
      } else {
        page++
      }
    }
  }
}

async function handleList(user, list) {
  for (const article of list) {
    if (article.correct === '已完成') {
      continue
    }
    const { success: getQuestionSuccess, data } = await getQuestion(user, article.id)
    if (!getQuestionSuccess) {
      log('🚑获取问题出错')
      return {
        success: false,
        error: true
      }
    }
    if (data.todayReach) {
      log('今天任务已经完成')
      return {
        success: true,
        error: false
      }
    }
    if (data.questions.length !== 1) {
      continue
    }

    await wait(1000)
    const question = data.questions[0]
    if (question.queType === 0) {
      const result = await handleSingleChoice(user, question)
      if (!result) {
        return {
          success: false,
          error: true
        }
      }
    } else {
      const result = await handleMultipleChoice(user, question)
      if (!result) {
        return {
          success: false,
          error: true
        }
      }
    }

    await wait(3000)
  }
  return {
    success: false,
    error: false
  }
}

async function handleSingleChoice(user, question) {
  const optionList = question.optionList
  for (const option of optionList) {
    const { success, data } = await submitAnswers(user, question.id, [option.id])
    if (!success) {
      log('🚑提交答案出错')
      return false
    }
    log(data.desc)
    if (data.data) {
      break
    }
    await wait(1000)
  }
  return true
}
async function handleMultipleChoice(user, question) {
  const answers = question.optionList.map(option => option.id)
  const reg = /（）*/g
  if (question.queContent.match(reg).length !== answers.length) {
    return true
  }
  const { success, data } = await submitAnswers(user, question.id, answers)
  if (!success) {
    log('🚑提交答案出错')
    return false
  }
  log(data.desc)
  return true
}

async function getScore(user) {
  try {
    const { data } = await axios.get('/scReports/api/wx/uc/learningScore/sum/-1', {
      headers: {
        key_session: user
      }
    })
    if (!data.data) {
      return {
        success: false,
        data: null
      }
    }
    return {
      success: true,
      data
    }
  } catch (error) {
    log(error)
    return {
      success: false,
      data: null
    }
  }
}

async function getArticles(user, page, size, columnType) {
  try {
    const { data } = await axios.post(
      `/scReports/api/wx/netlearning/page/${page}/${size}`,
      {
        category: '',
        columnType
      },
      {
        headers: {
          key_session: user
        }
      }
    )
    return {
      success: true,
      data
    }
  } catch (error) {
    log(error)
    return {
      success: false,
      data: null
    }
  }
}

async function getQuestion(user, id) {
  try {
    const { data } = await axios.get(`/scReports/api/wx/netlearning/questions/${id}`, {
      headers: {
        key_session: user
      }
    })
    return {
      success: true,
      data: data.data
    }
  } catch (error) {
    log(error)
    return {
      success: false,
      data: null
    }
  }
}

async function submitAnswers(user, id, answers) {
  try {
    const { data } = await axios.post(`/scReports/api/wx/netlearning/answer/${id}`, answers, {
      headers: {
        key_session: user
      }
    })
    return {
      success: true,
      data: data.data
    }
  } catch (error) {
    log(error)
    return {
      success: false,
      data: null
    }
  }
}

async function wait(second) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), second)
  })
}
