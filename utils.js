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
