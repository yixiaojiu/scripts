const Axios = require('axios')
const axios = Axios.create({
  baseURL: 'https://jde.mtbcpt.com',
  timeout: 5000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 9; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.131 Mobile Safari/537.36 MMWEBID/6404 MicroMessenger/8.0.25.2200(0x28001937) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    Host: 'jde.mtbcpt.com'
  }
})

String.prototype.MD5 = function (n) {
  function r(n, r) {
    return (n << r) | (n >>> (32 - r))
  }
  function t(n, r) {
    var t, u, o, e, i
    return (
      (o = 2147483648 & n),
      (e = 2147483648 & r),
      (i = (1073741823 & n) + (1073741823 & r)),
      (t = 1073741824 & n) & (u = 1073741824 & r)
        ? 2147483648 ^ i ^ o ^ e
        : t | u
        ? 1073741824 & i
          ? 3221225472 ^ i ^ o ^ e
          : 1073741824 ^ i ^ o ^ e
        : i ^ o ^ e
    )
  }
  function u(n, u, o, e, i, f, c) {
    return (
      (n = t(
        n,
        t(
          t(
            (function (n, r, t) {
              return (n & r) | (~n & t)
            })(u, o, e),
            i
          ),
          c
        )
      )),
      t(r(n, f), u)
    )
  }
  function o(n, u, o, e, i, f, c) {
    return (
      (n = t(
        n,
        t(
          t(
            (function (n, r, t) {
              return (n & t) | (r & ~t)
            })(u, o, e),
            i
          ),
          c
        )
      )),
      t(r(n, f), u)
    )
  }
  function e(n, u, o, e, i, f, c) {
    return (
      (n = t(
        n,
        t(
          t(
            (function (n, r, t) {
              return n ^ r ^ t
            })(u, o, e),
            i
          ),
          c
        )
      )),
      t(r(n, f), u)
    )
  }
  function i(n, u, o, e, i, f, c) {
    return (
      (n = t(
        n,
        t(
          t(
            (function (n, r, t) {
              return r ^ (n | ~t)
            })(u, o, e),
            i
          ),
          c
        )
      )),
      t(r(n, f), u)
    )
  }
  function f(n) {
    var r,
      t = '',
      u = ''
    for (r = 0; r <= 3; r++)
      t += (u = '0' + ((n >>> (8 * r)) & 255).toString(16)).substr(u.length - 2, 2)
    return t
  }
  var c,
    a,
    g,
    h,
    s,
    v,
    l,
    y,
    A,
    p = Array()
  for (
    p = (function (n) {
      for (
        var r,
          t = n.length,
          u = t + 8,
          o = 16 * ((u - (u % 64)) / 64 + 1),
          e = Array(o - 1),
          i = 0,
          f = 0;
        f < t;

      )
        (i = (f % 4) * 8), (e[(r = (f - (f % 4)) / 4)] = e[r] | (n.charCodeAt(f) << i)), f++
      return (
        (i = (f % 4) * 8),
        (e[(r = (f - (f % 4)) / 4)] = e[r] | (128 << i)),
        (e[o - 2] = t << 3),
        (e[o - 1] = t >>> 29),
        e
      )
    })(this),
      v = 1732584193,
      l = 4023233417,
      y = 2562383102,
      A = 271733878,
      c = 0;
    c < p.length;
    c += 16
  )
    (a = v),
      (g = l),
      (h = y),
      (s = A),
      (v = u(v, l, y, A, p[c + 0], 7, 3614090360)),
      (A = u(A, v, l, y, p[c + 1], 12, 3905402710)),
      (y = u(y, A, v, l, p[c + 2], 17, 606105819)),
      (l = u(l, y, A, v, p[c + 3], 22, 3250441966)),
      (v = u(v, l, y, A, p[c + 4], 7, 4118548399)),
      (A = u(A, v, l, y, p[c + 5], 12, 1200080426)),
      (y = u(y, A, v, l, p[c + 6], 17, 2821735955)),
      (l = u(l, y, A, v, p[c + 7], 22, 4249261313)),
      (v = u(v, l, y, A, p[c + 8], 7, 1770035416)),
      (A = u(A, v, l, y, p[c + 9], 12, 2336552879)),
      (y = u(y, A, v, l, p[c + 10], 17, 4294925233)),
      (l = u(l, y, A, v, p[c + 11], 22, 2304563134)),
      (v = u(v, l, y, A, p[c + 12], 7, 1804603682)),
      (A = u(A, v, l, y, p[c + 13], 12, 4254626195)),
      (y = u(y, A, v, l, p[c + 14], 17, 2792965006)),
      (v = o(v, (l = u(l, y, A, v, p[c + 15], 22, 1236535329)), y, A, p[c + 1], 5, 4129170786)),
      (A = o(A, v, l, y, p[c + 6], 9, 3225465664)),
      (y = o(y, A, v, l, p[c + 11], 14, 643717713)),
      (l = o(l, y, A, v, p[c + 0], 20, 3921069994)),
      (v = o(v, l, y, A, p[c + 5], 5, 3593408605)),
      (A = o(A, v, l, y, p[c + 10], 9, 38016083)),
      (y = o(y, A, v, l, p[c + 15], 14, 3634488961)),
      (l = o(l, y, A, v, p[c + 4], 20, 3889429448)),
      (v = o(v, l, y, A, p[c + 9], 5, 568446438)),
      (A = o(A, v, l, y, p[c + 14], 9, 3275163606)),
      (y = o(y, A, v, l, p[c + 3], 14, 4107603335)),
      (l = o(l, y, A, v, p[c + 8], 20, 1163531501)),
      (v = o(v, l, y, A, p[c + 13], 5, 2850285829)),
      (A = o(A, v, l, y, p[c + 2], 9, 4243563512)),
      (y = o(y, A, v, l, p[c + 7], 14, 1735328473)),
      (v = e(v, (l = o(l, y, A, v, p[c + 12], 20, 2368359562)), y, A, p[c + 5], 4, 4294588738)),
      (A = e(A, v, l, y, p[c + 8], 11, 2272392833)),
      (y = e(y, A, v, l, p[c + 11], 16, 1839030562)),
      (l = e(l, y, A, v, p[c + 14], 23, 4259657740)),
      (v = e(v, l, y, A, p[c + 1], 4, 2763975236)),
      (A = e(A, v, l, y, p[c + 4], 11, 1272893353)),
      (y = e(y, A, v, l, p[c + 7], 16, 4139469664)),
      (l = e(l, y, A, v, p[c + 10], 23, 3200236656)),
      (v = e(v, l, y, A, p[c + 13], 4, 681279174)),
      (A = e(A, v, l, y, p[c + 0], 11, 3936430074)),
      (y = e(y, A, v, l, p[c + 3], 16, 3572445317)),
      (l = e(l, y, A, v, p[c + 6], 23, 76029189)),
      (v = e(v, l, y, A, p[c + 9], 4, 3654602809)),
      (A = e(A, v, l, y, p[c + 12], 11, 3873151461)),
      (y = e(y, A, v, l, p[c + 15], 16, 530742520)),
      (v = i(v, (l = e(l, y, A, v, p[c + 2], 23, 3299628645)), y, A, p[c + 0], 6, 4096336452)),
      (A = i(A, v, l, y, p[c + 7], 10, 1126891415)),
      (y = i(y, A, v, l, p[c + 14], 15, 2878612391)),
      (l = i(l, y, A, v, p[c + 5], 21, 4237533241)),
      (v = i(v, l, y, A, p[c + 12], 6, 1700485571)),
      (A = i(A, v, l, y, p[c + 3], 10, 2399980690)),
      (y = i(y, A, v, l, p[c + 10], 15, 4293915773)),
      (l = i(l, y, A, v, p[c + 1], 21, 2240044497)),
      (v = i(v, l, y, A, p[c + 8], 6, 1873313359)),
      (A = i(A, v, l, y, p[c + 15], 10, 4264355552)),
      (y = i(y, A, v, l, p[c + 6], 15, 2734768916)),
      (l = i(l, y, A, v, p[c + 13], 21, 1309151649)),
      (v = i(v, l, y, A, p[c + 4], 6, 4149444226)),
      (A = i(A, v, l, y, p[c + 11], 10, 3174756917)),
      (y = i(y, A, v, l, p[c + 2], 15, 718787259)),
      (l = i(l, y, A, v, p[c + 9], 21, 3951481745)),
      (v = t(v, a)),
      (l = t(l, g)),
      (y = t(y, h)),
      (A = t(A, s))
  return 32 == n ? f(v) + f(l) + f(y) + f(A) : f(l) + f(y)
}

function getSign(openId) {
  return `timestamp=${Date.now()}&openid=${openId}&key=JDEMaxwellminiapp#2021!`
    .MD5(32)
    .toUpperCase()
}

if (!process.env.mwOpenId) {
  console.log('请配置环境变量mwOpenId')
  process.exit(0)
}

const openIds = process.env.mwOpenId.split('@')

main()

async function main() {
  console.log(`共${openIds.length}个账号`)
  let i = 1
  for (const openId of openIds) {
    console.log(`🚗========第${i}个账号========\n\n`)
    // 主页签到
    try {
      const { data: res } = await axios.post('/api/JDEMaxwellApi/SignInDailyScore', {
        openId,
        timestamp: Date.now(),
        sign: getSign(openId)
      })
      console.log(res.msg)
    } catch (error) {
      console.log('签到失败！！！🙄')
    }
    await sleep(2000)
    // 每日分享
    try {
      const { data: res } = await axios.post('/api/JDEMaxwellApi/ShareDailyScore', {
        openId,
        timestamp: Date.now(),
        sign: getSign(openId)
      })
      console.log(res.msg)
    } catch (error) {
      console.log('分享失败！！！🙄')
    }
    await sleep(2000)

    // 农场登录
    try {
      const { data: res } = await axios.post('/api/JDEMaxwellApi/UserSign', {
        openId,
        timestamp: Date.now(),
        sign: getSign(openId)
      })
      if (res.state) {
        console.log('签到成功😃')
      } else {
        console.log(res.msg)
      }
    } catch (error) {
      console.log('农场失败！！！🧑🏼')
    }
    await sleep(2000)

    // 农场分享
    try {
      const { data: res } = await axios.post('/api/JDEMaxwellApi/UserShare', {
        openId,
        timestamp: Date.now(),
        sign: getSign(openId)
      })
      if (res.state) {
        console.log('农场分享成功😃')
      } else {
        console.log(res.msg)
      }
    } catch (error) {
      console.log('农场分享失败！！！🙄')
    }
    await sleep(2000)

    // 扫码
    try {
      const { data: res } = await axios.post('/api/JDEMaxwellApi/UserScan', {
        openId,
        timestamp: Date.now(),
        sign: getSign(openId)
      })

      if (res.state) {
        console.log('扫码成功')
      } else {
        console.log(res.msg)
      }
    } catch (error) {
      console.log('扫码失败！！！😘')
    }

    await sleep(2000)
    // 获取可用的水滴
    // 💧
    let canUseWaters = 0
    let tiems = 0
    let userFarmStatus = 0
    try {
      const { data: res } = await axios.post('/api/JDEMaxwellApi/GetUserFarmInitData', {
        openId,
        timestamp: Date.now(),
        sign: getSign(openId)
      })
      canUseWaters = res.data1.canUseWaters
      tiems = Math.floor(canUseWaters / 20)
      console.log(`💧💧💧可用水滴${canUseWaters}，可浇${tiems}次水`)
      const farm = res.data
      userFarmStatus = farm.userFarm.status
      console.log(`当前进度${farm.progressBar}%，状态${farm.statusName}`)
    } catch (error) {
      console.log('获取可用的水滴失败！！！🙄')
    }
    await sleep(1000)
    // 浇水
    for (let i = 0; i < tiems; i++) {
      try {
        const { data: res } = await axios.post('/api/JDEMaxwellApi/UserWatering', {
          openId,
          timestamp: Date.now(),
          sign: getSign(openId),
          doNotRepeat: true,
          through: true
        })
        if (res.state) {
          console.log(`浇水成功，可用水滴${res.data1.canUseWaters}`)
        } else {
          console.log(res.msg)
          // 判断是否需要选择奖励
          if (res.msg === '请先选择目标奖励') {
            i--
            const result = await selectProduct(openId, userFarmStatus)
            if (!result) {
              console.log('选取奖励出错，退出')
              break
            }
          }
          if (res.msg === ' 有需要喷洒水滴的树') {
            console.log('树熟了')
            break
          }
        }
        await sleep(2000)
      } catch (error) {
        console.log('浇水失败！！！🎈')
      }
    }
    await sleep(1000)

    // 获取积分
    try {
      const { data: res } = await axios.post('/api/JDEMWMall/GetUserPoint', {
        openId,
        timestamp: Date.now(),
        sign: getSign(openId)
      })
      console.log(`当前积分${res.data}\n\n`)
    } catch (error) {
      console.log('获取积分失败！！！🤣')
    }
    i++
    await sleep(1000)
  }
}

async function sleep(time) {
  return new Promise(resolved => {
    setTimeout(() => resolved(), time)
  })
}

async function selectProduct(openId, userFarmStatus) {
  let productno = 0
  try {
    const { data: res } = await axios.post('/api/JDEMaxwellApi/GetFarmGoodsList', {
      openId,
      timestamp: Date.now(),
      sign: getSign(openId),
      doNotRepeat: true,
      source: 1,
      userFarmStatus
    })
    const goods = res.data.farmgoodslist[0]
    productno = goods.productno
    console.log(`选取奖励：${goods.ProductType}`)
  } catch (error) {
    console.log('获取目标奖励失败！！！👩🏼‍🦱')
    return false
  }
  await sleep(1200)
  try {
    const { data: res } = await axios.post('/api/JDEMaxwellApi/SaveFarmGoods', {
      openId,
      timestamp: Date.now(),
      sign: getSign(openId),
      doNotRepeat: true,
      productno
    })
    console.log(res.msg)
    if (res.msg === '礼品不存在，请联系管理员') {
      return false
    }
    return true
  } catch (error) {
    console.log('选取奖励失败！！！👩🏼‍🦱')
    return false
  }
}

// axios
//   .post('/api/JDEMaxwellApi/SaveFarmGoods', {
//     openId: 'oBn1t5LdWY4jmXFO37SPJfuEbZGg',
//     timestamp: Date.now(),
//     sign: getSign('oBn1t5LdWY4jmXFO37SPJfuEbZGg'),
//     doNotRepeat: true,
//     productno: '16100344'
//   })
//   .then(res => {
//     console.log(res.data)
//   })
