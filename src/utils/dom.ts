import { StringToDouble } from "./format";

export function setAppHeight() {
  const vh = window.innerHeight;
  document.documentElement.style.setProperty("--app-height", `${vh}px`);
}

export function colorFix(
  cPrice: number | string,
  oPrice: number,
  tran: number,
  san: number,
  tc: number
): string {
  if (typeof cPrice === "string") {
    cPrice = StringToDouble(cPrice);
  }
  if (cPrice == 0) return "preo";
  if (cPrice == tc) return "r";
  if (cPrice == tran) return "c";
  if (cPrice == san) return "f";
  if (cPrice - oPrice > 0) {
    return "i";
  } else if (cPrice - oPrice < 0) {
    return "d";
  }
  return "r";
}

export function getStatusIndex(st: string | number, mc = "10") {
  const hours = new Date().getHours();
  if (mc === "10" || mc === "11") {
    // hose
    if (
      (st === "undefined" || st === "Undefined" || st == undefined) &&
      hours >= 9 &&
      hours < 10
    )
      return "ATO";

    if (st === "P") {
      return "ATO";
    }
    if (st === "O") {
      return "Mở cửa";
    }
    if (st === "I") {
      return "Nghỉ trưa";
    }
    if (st === "A") {
      return "ATC";
    }
    if (st === "C") {
      return "Thỏa thuận";
    }
    return "Đóng cửa";
  }

  if (mc === "02") {
    // hnx
    if (st === "O") {
      return "Mở cửa";
    }
    if (st === "I") {
      return "Nghỉ trưa";
    }
    if (st === "A") {
      return "ATC";
    }
    if ((st === "C" || st === "K") && hours < 15 && hours > 12) {
      return "PLO";
    }
    return "Đóng cửa";
  }
  if (mc === "03") {
    if (st === "O") {
      return "Mở cửa";
    }
    if (st === "I") {
      return "Nghỉ trưa";
    }
    return "Đóng cửa";
  }
  // if (st === 'K' || st === 'C' || st === 'J' || st === 'Undefined') {
  //   return i18n.t('txt-closed');
  // }
  // if (st === 'I') {
  //   return i18n.t('txt-intermission');
  // }
  // return i18n.t('txt-opened');
}
