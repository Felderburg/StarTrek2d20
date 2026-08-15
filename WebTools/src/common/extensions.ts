export function copyObject(target: {}, ...sources: Array<{}>) {
  if (target === undefined || target === null) {
    throw new TypeError('copyObject failed due to inconsistent cast.');
  }

  const to = Object(target);
  for (let i = 0; i < sources.length; i++) {
    let nextSource = sources[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }
    nextSource = Object(nextSource);

    const keysArray = Object.keys(nextSource);
    for (
      let nextIndex = 0, len = keysArray.length;
      nextIndex < len;
      nextIndex++
    ) {
      const nextKey = keysArray[nextIndex];
      const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }

  return to;
}
