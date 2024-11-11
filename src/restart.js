import { Console } from "@woowacourse/mission-utils";

async function restart(func) {
  while (true) {
    try {
      return await func();
    } catch (error) {
      Console.print(error.message);
    }
  }
}

export default restart;
