function assertString(input) {
  const isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This only validates string inputs');
  }
}

const isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
const isbn13Maybe = /^(?:[0-9]{13})$/;
const errMsg = 'El ISBN introducido no es válido';
const factor = [1, 3];

const validateISBN10 = sanitized => {
  let checksum = 0;
  let i;

  if (!isbn10Maybe.test(sanitized)) {
    return false;
  }
  for (i = 0; i < 9; i++) {
    checksum += (i + 1) * sanitized.charAt(i);
  }
  if (sanitized.charAt(9) === 'X') {
    checksum += 10 * 10;
  } else {
    checksum += 10 * sanitized.charAt(9);
  }
  if (checksum % 11 === 0) {
    return !!sanitized;
  }
};

const validateISBN13 = sanitized => {
  let checksum = 0;
  let i;

  if (!isbn13Maybe.test(sanitized)) {
    return false;
  }
  for (i = 0; i < 12; i++) {
    checksum += factor[i % 2] * sanitized.charAt(i);
  }
  if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
    return !!sanitized;
  }
};

export default function isISBN(str) {
  assertString(str);
  let valid = false;
  const sanitized = str.replace(/[\s-]+/g, '');

  if (validateISBN10(sanitized)) {
    valid = true;
  }

  if (valid || validateISBN13(sanitized)) {
    valid = true;
  }

  return [valid, errMsg];
}
