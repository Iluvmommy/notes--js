function findClosest(arr, target) {
  var n = arr.length;

  if (target <= arr[0]) return arr[0];
  if (target >= arr[n - 1]) return arr[n - 1];

  var i = 0,
    j = n,
    mid = 0;
  while (i < j) {
    mid = (i + j) / 2;

    if (arr[mid] == target) return arr[mid];

    if (target < arr[mid]) {
      if (mid > 0 && target > arr[mid - 1])
        return getClosest(arr[mid - 1], arr[mid], target);

      j = mid;
    } else {
      if (mid < n - 1 && target < arr[mid + 1])
        return getClosest(arr[mid], arr[mid + 1], target);
      i = mid + 1;
    }
  }

  return mid
}

function getClosest(val1, val2, target) {
  if (target - val1 >= val2 - target) return val2;
  else return val1;
}

module.exports = findClosest;
