function numberToWords(num, addCurrency = true) {
  if (num === 0) return "Zero Dirhams";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million", "Billion"];

  function convertChunk(n) {
    let str = "";
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 11 && n <= 19) {
      str += teens[n - 11] + " ";
    } else {
      if (n >= 20) {
        str += tens[Math.floor(n / 10)] + " ";
      }
      if (n % 10 > 0) {
        str += ones[n % 10] + " ";
      }
    }
    return str.trim();
  }

  let [integerPart, decimalPart] = num.toString().split(".");
  integerPart = parseInt(integerPart);
  let word = "";
  let thousandIndex = 0;

  while (integerPart > 0) {
    if (integerPart % 1000 !== 0) {
      word =
        convertChunk(integerPart % 1000) +
        " " +
        thousands[thousandIndex] +
        " " +
        word;
    }
    integerPart = Math.floor(integerPart / 1000);
    thousandIndex++;
  }

  if (decimalPart) {
    let decimalWords = numberToWords(decimalPart, false);
    word += " and " + decimalWords;
  }

  if (addCurrency) word = word.trim() + " Dirhams Only";

  return word;
}

export default numberToWords;
