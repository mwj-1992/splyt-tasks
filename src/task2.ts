

/**
 * 
 * @param fn Function as an argument
 * @param defaultParams Object containing default values for that function's arguments 
 * @returns Function which defaults to the right values
 */
function defaultArguments(fn: any, defaultParams: any) {
  const parmas = getParameterNames(fn);
  return (...args) => {
    let values = [];

    if (fn.name !== '') {
      parmas.forEach((param: string | number, index: number) => {
        if (args[index] != undefined) {
          values.push(args[index]);
        }
        else {
          if (defaultParams[param]) values.push(defaultParams[param]);
        }
      });
    }
    return fn(...values);

  };
}

/**
 * 
 * @param func function reference, e.g const add= (a,b)=>{}
 * @returns Array of param names, e.g['a','b']
 */
function getParameterNames(func: () => any): string[] {
  const functionString = func.toString();
  const parameterRegex = /(?:\()([^)]*)(?:\))/;
  const match = parameterRegex.exec(functionString);
  if (match && match[1]) {
    return match[1].split(',').map((param) => param.trim());
  } else {
    return [];
  }
}
export { defaultArguments }
