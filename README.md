Compile cpp demo from wechat work to `tool` executable
```shell
g++ -ldl tool_testSdk.cpp -o tool
```

Compile `test.cpp` to `test` executable
```shell
g++ -ldl test.cpp -o test
```

Compile `mylibrary.so` from `mylibrary.cpp`
```shell
g++ -shared -fpic -Wall -g mylibrary.cpp -o mylibrary.so
```

Run wechat work cpp demo to get chat data from server
```shell
./tool 1 0 10
```

### Problem

When use nodejs with ffi to call .so function, there will be random segmentation fault, however, using cpp call .so is okay.
Like below:

```
nodejs -> ffi -> WeWorkFinanceSdk_C.so                   // Random Segmentation fault
cpp -> WeWorkFinanceSdk_C.so                             // OK

nodejs -> ffi -> mylibrary.so -> WeWorkFinanceSdk_C.so   // Random Segmentation fault
cpp -> mylibrary.so -> WeWorkFinanceSdk_C.so             // OK
```

So we know there must be something wrong with nodejs -> ffi -> *.so, but I haven't figured out. Create this repo for record purpose. Hope I can resolve this in the future.
