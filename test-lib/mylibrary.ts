import {
  LIBRARY,
  API,
  RETURN,
}             from 'ffi-adapter'

@LIBRARY('./mylibrary')
export class MyLibrary {
  @API('int')
  do_some_number_fudging (a: number, b: number): number { return RETURN(a, b) };

  @API('pointer')
  create_object (): Buffer { return RETURN() };

  @API('int')
  do_stuff_with_object (obj: Buffer): number { return RETURN(obj) };

  @API('void')
  use_string_with_object (obj: Buffer, value: string): void { return RETURN(obj, value) };

  @API('void')
  delete_object (obj: Buffer): void { return RETURN(obj) };
}
