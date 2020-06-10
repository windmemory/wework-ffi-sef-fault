#include "mylibrary.hpp"
#include <dlfcn.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string>
using std::string;

typedef int init_func_t(const char* corpid, const char* secret);
typedef char* getchatdata_func_t(uint64_t, uint64_t);

int main(int argc, char* argv[])
{
    printf("Starting...\n");
    uint64_t seq = 1000u;
    uint64_t limit = 1000u;
    char* corpId = ""; // Need to fill in corpId
    char* secret = ""; // Need to fill in secret

    // new sdk api
    void* so_handle = dlopen("./mylibrary.so", RTLD_LAZY);
    if (!so_handle) {
        printf("load sdk so fail:%s\n", dlerror());
        return -1;
    }
    printf("sdk loaded\n");
    init_func_t* init_fn = (init_func_t*)dlsym(so_handle, "init");
    int init_result = init_fn(corpId, secret);

    printf("inited\n");

    getchatdata_func_t* getchatdata_fn = (getchatdata_func_t*)dlsym(so_handle, "getChatData");
    char* data = getchatdata_fn(seq, limit);
    printf("data: %s", data);
}
