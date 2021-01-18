/**
 * Checks if the given is a valid JSON string
 * @param {string} str
* @returns {boolean} true if valid else false
 */
const isJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

export default {
  isJSON
};
