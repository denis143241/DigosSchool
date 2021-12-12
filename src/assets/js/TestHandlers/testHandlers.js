export const keysFromObject = (obj) => {
  // Собирает все ключи из объекта в массив
  const keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
};

export const shakeArray = (arr) => {
  // Заполняем в случайным порядком вектор. Затем в соответсвии с этим ветором размещаем элементы входного массива
  const randomIndexes = [];
  const shakedArray = [];
  while (randomIndexes.length != arr.length) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    }
  }
  for (let i of randomIndexes) {
    shakedArray.push(arr[i]);
  }
  return shakedArray;
};

export const CompareAnswer = (answer, correctList) => {
  // На вход строка и Массив вариантов ответов соответственно
  return correctList.find(
    (cor) => answer.toLowerCase() === cor.toLowerCase()
  ) !== undefined
    ? true
    : false;
};

export const isDoneFromLocalStorage = (nameTest) => {
  // Проверяем выполнен ли тест когда либо ранее
  return localStorage.getItem(nameTest);
};
