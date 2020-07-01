const calcId = (x, y, length = 0, height = 0) => {
  //   console.log((y + height) * 10 + (x + length));
  return (y + height) * 10 + (x + length);
};

const switchXY = (length, height, rotation) =>
  rotation === 1 || rotation === 3 ? [height, length] : [length, height];

const populateArray = (x, y, length, height, rotation) => {
  let array = [];
  let [newLength, newHeight] = switchXY(length, height, rotation);
  if (x + newLength <= 10 && y + newHeight <= 10) {
    for (let i = 0; i < newLength; i++) {
      for (let j = 0; j < newHeight; j++) {
        array.push(calcId(x, y, i, j));
      }
    }
  }
  // console.log(array);
  return array;
};

const filteredId = (x, y, filterX, filterY, length, height, rotation) => {
  switch (rotation) {
    case 0:
      return calcId(x, y, filterX, filterY);
    case 1:
      return calcId(x, y, filterY, Math.ceil(height / 2) - filterX);
    case 2:
      return calcId(
        x,
        y,
        Math.ceil(length / 2) - filterX,
        Math.ceil(height / 2) - filterY
      );
    case 3:
      return calcId(x, y, Math.ceil(length / 2) - filterY, filterX);
    default:
      throw new Error();
  }
};

const createShip = (x, y, length, height, rotation) => {
  let idsArray = populateArray(x, y, length, height, rotation);
  let boundary = populateArray(
    x === 0 ? x : x - 1,
    y === 0 ? y : y - 1,
    x === 0 || x + length >= 10 ? length + 1 : length + 2,
    y === 0 || y + height >= 10 ? height + 1 : height + 2,
    rotation
  );
  return [idsArray, boundary];
};

export const ship1 = (x, y, rotation, selected) => {
  let length = 2,
    height = 4;
  let [idsArray, boundary] = createShip(x, y, length, height, rotation);
  // check for overlap of existing ships with outer boundary of current ship
  return boundary.length && !boundary.some((el) => selected.includes(el))
    ? idsArray
    : [];
};

export const ship2 = (x, y, rotation, selected) => {
  let length = 3,
    height = 3;
  let [idsArray, boundary] = createShip(x, y, length, height, rotation);
  idsArray = idsArray.filter(
    (el) =>
      el !== filteredId(x, y, 1, 0, length, height, rotation) &&
      el !== filteredId(x, y, 1, 1, length, height, rotation)
  );

  return boundary.length && !boundary.some((el) => selected.includes(el))
    ? idsArray
    : [];
};

export const ship3 = (x, y, rotation, selected) => {
  let length = 3,
    height = 3;
  let [idsArray, boundary] = createShip(x, y, length, height, rotation);
  idsArray = idsArray.filter(
    (el) =>
      el !== filteredId(x, y, 0, 0, length, height, rotation) &&
      el !== filteredId(x, y, 0, 1, length, height, rotation) &&
      el !== filteredId(x, y, 2, 0, length, height, rotation) &&
      el !== filteredId(x, y, 2, 1, length, height, rotation)
  );

  return boundary.length && !boundary.some((el) => selected.includes(el))
    ? idsArray
    : [];
};

export const ship4 = (x, y, rotation, selected) => {
  let length = 2,
    height = 2;
  let [idsArray, boundary] = createShip(x, y, length, height, rotation);
  return boundary.length && !boundary.some((el) => selected.includes(el))
    ? idsArray
    : [];
};

export const ship5 = (x, y, rotation, selected) => {
  let length = 1,
    height = 2;
  let [idsArray, boundary] = createShip(x, y, length, height, rotation);
  return boundary.length && !boundary.some((el) => selected.includes(el))
    ? idsArray
    : [];
};
