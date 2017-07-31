
import {Headers} from "@angular/http";


export function commonHttpHeaders(userId) {
  const headers = new Headers();
  headers.append('USERID', userId.toString());
  headers.append('Content-Type', 'application/json; charset=utf-8');

  //es6 shorthand notation
  return {headers};
}
