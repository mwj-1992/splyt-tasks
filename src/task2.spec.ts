// Example function for testing
import {defaultArguments} from './task2';

describe('defaultArguments', () => {
  function add(a: number, b: number): number {
    return a + b;
  }
  test('returns a function with default arguments applied', () => {
    const defaults: any= { b: 5 };
    const addWithDefaults = defaultArguments(add, defaults);

    expect(addWithDefaults(10)).toBe(15);
    expect(addWithDefaults(10, 7)).toBe(17);
  });

  test('handles undefined values for non-existing default arguments', () => {
    function add(a: number, b: number): number {
      return a + b;
    }
    const defaults: any = { c: 3 };
    const addWithDefaults = defaultArguments(add, defaults);

    expect(addWithDefaults(10)).toBeNaN();
    expect(addWithDefaults(10, 7)).toBe(17);
  });

  test('handles default arguments for functions with multiple parameters', () => {
    function multiply(a: number, b: number, c: number): number {
      return a * b * c;
    }

    const defaults: any= { b: 2, c: 3 };
    const multiplyWithDefaults = defaultArguments(multiply, defaults);

    expect(multiplyWithDefaults(5)).toBe(30);
    expect(multiplyWithDefaults(5, 4)).toBe(60);
    expect(multiplyWithDefaults(5, 4, 2)).toBe(40);
  });

  test('handles default arguments for functions with varying parameter types', () => {
    function concatStrings(a: string, b: string, c: string ): string {
      return a + b + c;
    }

    const defaults:any = { c: 'override' };
    const concatWithDefaults = defaultArguments(concatStrings, defaults);

    expect(concatWithDefaults('Hello, ', 'world!')).toBe('Hello, world!override');
    expect(concatWithDefaults('Hello, ', 'world!', 'custom')).toBe('Hello, world!custom');
  });
});
