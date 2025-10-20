import moment from "moment-timezone";

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
