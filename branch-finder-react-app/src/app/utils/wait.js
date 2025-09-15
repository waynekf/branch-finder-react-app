function wait(ms) {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

export default wait;
