const sliceStrFormEnd = (str, sliceLen) => {
  if (str.length > sliceLen) {
    let endIdx = str.length;
    let startIdx = endIdx - sliceLen;
    return str.slice(startIdx, endIdx);
  } else {
    return str;
  }
};

const sliceStrFormStart = (str, sliceLen) => {
  if (str.length > sliceLen) {
    return str.slice(0, sliceLen);
  } else {
    return str;
  }
};

export default {
  sliceStrFormEnd,
  sliceStrFormStart
};
