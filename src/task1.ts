const targetFn = (succeedsOnAttempt: number):()=>Promise<any> => {
  let attempt: number = 0;
  return async () => {
    if (++attempt === succeedsOnAttempt) {
      return attempt;
    }
    throw Object.assign(new Error(`failure`), { attempt });
  };
}


const retryFailures = async <T>(fn: () => Promise<T>, retries: number = 0): 
Promise<T> => {
  let error: Error | undefined;

  for (let i: number = 0; i < retries; i++) {
    try {
      const result: any = await fn();
      return result
    } catch (err: any) {
      error = err;
    }
  }
  throw error;
}


export {retryFailures, targetFn}
// retryFailures(targetFn(3), 5).then((attempt) => {
//   console.assert(attempt === 3);
//  });
//  // fails on attempt number 2 and throws last error
//  retryFailures(targetFn(3), 2).then(() => {
//   throw new Error('should not succeed');
//  }, (e) => {
//   console.assert(e.attempt === 2);
//  });
//  // succeeds
//  retryFailures(targetFn(10), 10).then((attempt) => {
//   console.assert(attempt === 10);
//  });