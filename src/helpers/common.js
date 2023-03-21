export const delayRequest = (s) => new Promise(resolve => setTimeout(resolve, s));
export const isEmptyObject = (obj) => {
    for(let prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}