import { LIBRARY, API, RETURN } from 'ffi-adapter';
import ref from 'ref';
import ffi from 'ffi';
import Struct from 'ref-struct';

const libraryPath = './lib/libWeWorkFinanceSdk_C';
// const libraryPath = './lib/libWeWorkFinanceSdk_Java';

const corpId = ''; // Need to fill in corpId
const secret = ''; // Need to fill in secret

@LIBRARY(libraryPath)
export class WeWorkMessageSDK {
  @API('pointer')
  NewSdk(): Promise<Buffer> { return RETURN() }

  @API('int')
  Init(sdk: Buffer, corpid: string, secret: string): Promise<number> { return RETURN(sdk, corpid, secret) }

  @API('pointer')
  NewSlice(): Promise<Buffer> { return RETURN() }

  @API('void')
  FreeSlice(slice: Buffer): Promise<void> { return RETURN(slice) }

  @API('string')
  GetContentFromSlice(slice: Buffer): Promise<string> { return RETURN(slice) }

  @API('int')
  GetChatData(sdk: Buffer, seq: number, limit: number, proxy: string, passwd: string, timeout: number, chatDatas: Buffer): Promise<number> { return RETURN(sdk, seq, limit, proxy, passwd, timeout, chatDatas) };
}

// const main = async () => {

//   const sdk = new WeWorkMessageSDK();
//   const sdkInstance = await sdk.NewSdk();
//   const initResult = await sdk.Init(sdkInstance, corpId, secret);
//   console.log(`initResult: ${initResult}`);
//   // const slice = ref.refType(ref.types.void);

//   // await new Promise(r => setTimeout(r, 1000));
//   const slicePtr = await sdk.NewSlice();
//   console.log(`new slice: ${slicePtr.toString()}`);
//   // const slicePtr = ref.alloc(ref.refType(ref.types.void));

//   const seq = 0;
//   const getDataResult = await sdk.GetChatData(sdkInstance, seq, 10, null, null, 10, slicePtr);
//   console.log(`getDataResult: ${getDataResult}`);
//   const content = await sdk.GetContentFromSlice(slicePtr);
//   console.log(`content: ${content}`);
//   // ref.deref(slicePtr);
//   // await sdk.FreeSlice(slicePtr);
// }

// main();

const main = async () => {

  // const sdk = ref.types.void;
  // const sdkPtr = ref.refType(sdk);

  // const slice = ref.types.void;

  // const sliceRawStruct = Struct({
  //   buf: ref.refType(ref.types.char),
  //   len: 'int',
  // });
  // const slicePtr = ref.refType(sliceRawStruct);

  const sdkLibrary = ffi.Library(libraryPath, {
    'NewSdk': [ 'pointer', [] ],
    'Init': [ 'int', [ 'pointer', 'string', 'string' ] ],
    'NewSlice': [ 'pointer', [] ],
    'FreeSlice': [ 'void', [ 'pointer' ] ],
    'GetContentFromSlice': [ 'string', [ 'pointer' ] ],
    'GetChatData': [ 'int', [ 'pointer', 'uint64', 'uint64', 'string', 'string', 'uint64', 'pointer' ] ],
    'DestroySdk': [ 'void', [ 'pointer'] ],
  });

  const sdkptr = sdkLibrary.NewSdk();
  console.log(`new sdk: ${(sdkptr as any).hexAddress()}`);
  const initResult = sdkLibrary.Init(sdkptr, corpId, secret);


  console.log(`init: ${initResult}`);
  const newslice = sdkLibrary.NewSlice();
  if (newslice.isNull()) {
    console.log('wow, newslice is null!');
  }

  // const newslice = ref.alloc(sliceRawStruct);
  console.log(`new slice: ${(newslice as any).hexAddress()}`);

  try {
    const getDataResult = sdkLibrary.GetChatData(sdkptr, 0, 25, null, null, 0, newslice);
    console.log(`get data result: ${getDataResult}`);
  } catch (e) {
    console.error(e);
  }

  const data = sdkLibrary.GetContentFromSlice(newslice);
  console.log(data);

  sdkLibrary.FreeSlice(newslice);
  // ref.deref(newslice);
  // console.log(rawData);
  // sdkLibrary.DestroySdk(sdkptr);
}

main();
