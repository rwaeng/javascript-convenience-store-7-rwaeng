import { Console } from '@woowacourse/mission-utils';

async function restart(func) {
  while (true) {
    try {
      await func();
      break;
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default restart;
