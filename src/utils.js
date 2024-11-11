import { Console } from '@woowacourse/mission-utils';

function convertToObjects(data) {
  const keys = data[0].split(',').map(key => key.trim());
  const objects = data.slice(1).map(row => {
    return convertToObject(keys, row);
  });

  return objects;
}

function convertToObject(keys, row) {
  const values = row.split(',').map(value => value.trim());
  const object = keys.reduce((obj, key, index) => {
    obj[key] = values[index];
    return obj;
  }, {});

  return object;
}

export { convertToObjects };
