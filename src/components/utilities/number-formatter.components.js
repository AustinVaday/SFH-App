import numeral from "numeral";

function numberFormatter(number) {
  if (number > 9999) {
    return numeral(number).format("0.0a");
  } else {
    return number;
  }
}

export { numberFormatter };
