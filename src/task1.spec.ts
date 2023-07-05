import { retryFailures, targetFn } from './task1'; // Update with your actual file name

describe('retryFailures', () => {
  test('retries and succeeds on the specified attempt', async () => {
    const succeedsOnAttempt = 3;
    const retries = 5;
    retryFailures(targetFn(succeedsOnAttempt), retries).then((attempt) => {
      expect(attempt).toEqual(succeedsOnAttempt);
    });
    //  // fails on attempt number 2 and throws last error
    //  
    //  // succeeds
    //  retryFailures(targetFn(10), 10).then((attempt) => {
    //   console.assert(attempt === 10);
    //  });
  });


  test('Fails on attempt number 2 and throws last error', async () => {
    retryFailures(targetFn(3), 2).then(() => {
        throw new Error('should not succeed');
       }, (e) => {
         expect(e.attempt).toEqual(2)
        console.assert(e.attempt === 2);
       });
  });

  test('Should success after specific tries', async () => {
    const succeedsOnAttempt = 10;
    const retries = 10;
    retryFailures(targetFn(succeedsOnAttempt), retries).then((attempt) => {
      expect(attempt).toEqual(succeedsOnAttempt);
    });
  });
});
