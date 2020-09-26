/**
 * @param {string} str
 * @return {string}
 */
export function capitalize(str) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 *
 * @param {number} start
 * @param {number} end
 * @return {array}
 */
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index)=>{
        return start+index
      })
}
