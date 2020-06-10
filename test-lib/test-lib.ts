// import { LibFactorial } from './lib-factorial'

// const lib = new LibFactorial()
// console.log('factorial(5) =', lib.factorial(5))
// Output: factorial(5) = 120

import ffi from 'ffi';
// import { MyLibrary } from './mylibrary';

// const lib = new MyLibrary();
const corpId = '';
const secret = '';

const main = () => {
  const lib = ffi.Library('./mylibrary', {
    init: [ 'int', [ 'string', 'string' ] ],
    getChatData: [ 'string', [ 'int', 'int' ] ],
  });
  const initResult = lib.init(corpId, secret);
  console.log(`initResult: ${initResult}`);
  const data = lib.getChatData(0, 100);
  console.log(`data: ${data}`);
  console.log(corpId, secret);
  // const obj = lib.create_object();
  // lib.do_stuff_with_object(obj);
  // lib.use_string_with_object(obj, 'test string');
  // lib.delete_object(obj);
}

main();
