/*
 * @name 随机数
 * @param {area} String '0-9'->[0,9] 从0-9包含0和9
 */
function randomNum (area) {
  let arr = area.split('-')
  let min = Number(arr[0])
  let max = Number(arr[1])
  let k = max - min + 1
  let random = Math.random()
  let num = random * k + min
  return Number.parseInt(num, 10)
}

export {
  randomNum
}
