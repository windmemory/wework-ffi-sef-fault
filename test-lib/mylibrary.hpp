#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

int init (char* corpId, char* secret);
char* getChatData (int seq, int limit);

#ifdef __cplusplus
}
#endif
