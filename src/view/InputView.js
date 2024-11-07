import { readFileSync } from "fs";

const InputView = {
  readFile(fileName) {
    const data = readFileSync(fileName, "utf-8")
      .split("\r\n")
      .map((it) => it.trim());

    return data.slice(1, data.length - 1);
  },
};

export default InputView;
