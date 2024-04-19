import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    let word : string
    word = 'Hello World!'
    return ({
      message:  `This World from the Server and already Typed : ${word}`
    })
  }
}
