import moment from "moment-timezone";

function pick<T>(...values: (T | undefined | null)[]): T | undefined {
  for (const v of values) {
    if (v !== undefined && v !== null) {
      return v;
    }
  }
  return undefined;
}

export function numberFormat(
  input: string | number,
  decimals: number = 0,
  fallback: string = "",
  decimalSeparator?: string,
  thousandSeparator?: string
): string {
  // Xử lý các giá trị đặc biệt
  if (input === "ATO" || input === "ATC") return input;

  const h = Number(input) || 0;
  const c = Math.max(0, decimals);

  // Lấy số chữ số thập phân thực tế
  const fractionalLength = (h.toString().split(".")[1] || "").split("e")[0]
    .length;
  const parts = h.toString().split("e");

  // Làm tròn và định dạng số
  const g = (
    Math.abs(parts[1] ? Number(parts[0]) : h) +
    Math.pow(10, -Math.max(c, fractionalLength) - 1)
  ).toFixed(c);

  const w = String(parseInt(g, 10));
  const n = w.length > 3 ? w.length % 3 : 0;

  const dec = pick(decimalSeparator, ".")!;
  const thou = pick(thousandSeparator, ",")!;

  let formatted = (h < 0 ? "-" : "") + (n ? w.substring(0, n) + thou : "");
  formatted += w.substring(n).replace(/(\d{3})(?=\d)/g, `$1${thou}`);
  if (c) formatted += dec + g.slice(-c);
  if (parts[1] && +formatted !== 0) formatted += "e" + parts[1];

  if (Number(formatted) === 0) return fallback;
  return formatted;
}

export function mapIdToNameIndex(id: string) {
  const map: { [key: string]: string } = {
    "001": "VN-Index",
    "101": "VN30-Index",
    "002": "HNX-Index",
    "301": "UPCOM-Index",
  };

  return map[id] || id;
}

function FormatCurrency(
  num: number | string,
  delimitor: string,
  separate: string
): string {
  const sign = Number(num) === Math.abs(Number(num));
  let tail: string;
  let ret_value: string;

  // chuyển num sang chuỗi và loại bỏ dấu $ và ,
  num = num.toString().replace(/\$|,/g, "");

  if (isNaN(Number(num))) num = "0";

  const str = num.toString();
  const arr_str = str.split(separate);

  if (arr_str.length > 1) {
    tail = String(arr_str[1]);
    if (tail.length < 2) {
      tail = tail + "0";
    }
  } else {
    tail = "";
  }

  num = arr_str[0];

  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      delimitor +
      num.substring(num.length - (4 * i + 3));
  }

  if (tail === "") ret_value = (sign ? "" : "-") + num;
  else ret_value = (sign ? "" : "-") + num + separate + tail;

  return ret_value;
}

export function StringToInt(pString: string | number): number {
  pString = "" + pString;
  pString = pString.replace(/,/g, "");
  const vInt = parseInt(pString, 10);
  if (isNaN(vInt)) {
    return 0;
  } else {
    return vInt;
  }
}

export function formatVolume10(number: string | number) {
  const vTemp = StringToInt(number) * 10;
  const vNumber = FormatCurrency(vTemp.toString(), ",", ".");
  return vNumber.substring(0, vNumber.length - 1);
}

export function formatVolPrice(vol: number) {
  return vol > 1e5 ? numberFormat(vol / 1e5, 2) + "M" : formatVolume10(vol);
}

export function StringToDouble(pString: string | number): number {
  pString = "" + pString;
  pString = pString.replace(/,/g, "");
  //Convert sang so he so 10
  const vFloat = parseFloat(pString);
  if (isNaN(vFloat)) {
    return 0;
  } else {
    return vFloat;
  }
}

export function convertTimeStringToUnix(timeString: string): number {
  // Lấy ngày hiện tại theo giờ Việt Nam (UTC+7)
  const today = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");

  // Kết hợp ngày hiện tại với giờ từ đầu vào
  const localTime = moment.tz(
    `${today} ${timeString}`,
    "YYYY-MM-DD HH:mm:ss",
    "Asia/Ho_Chi_Minh"
  );

  // Trả về Unix timestamp (giây)
  return localTime.unix();
}
