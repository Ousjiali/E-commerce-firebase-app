export const isChecked = (responses, index, option) => {
  const answer = responses?.filter(({ answer }, i) => answer == option);
  return answer?.length > 0 && answer[0]?.answer;
};

export function removeDuplicateObjectFromArray(array, key) {
  var check = new Set();
  array = array.filter((item) => item[key] != "");
  return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
}
