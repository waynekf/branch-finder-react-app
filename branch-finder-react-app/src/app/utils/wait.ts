function wait(ms: number): void {
  const start: number = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

export default wait;
