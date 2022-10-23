/**
 *
 * @param {number} second
 * @returns
 */
exports.wait = async second => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), second)
  })
}

/**
 *
 * @param {number} i
 */
exports.userStartLog = i => {
  console.log(`\n🚗========第${i}个账号========\n`)
}
