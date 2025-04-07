if (!globalThis.crypto) {
  const { randomBytes } = require('crypto');
  globalThis.crypto = {
    getRandomValues: (arr) => {
      const buf = randomBytes(arr.length);
      arr.set(buf);
      return arr;
    },
  };
}
