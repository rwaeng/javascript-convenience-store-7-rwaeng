import { Console } from '@woowacourse/mission-utils';

async function restart(func) {
  while (true) {
    try {
      await func();
    } catch (error) {
      Console.print(error.message);
      return await func();
    }
  }
}

export default restart;
