import { useEffect, useRef } from "react";

export function useIntervalApi(
  callback: () => void, // Hàm gọi api
  delay: number // Thời gian lăp (ms)
) {
  const savedCallback = useRef(callback);

  // Lưu callback mới nhất
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    function tick() {
      savedCallback.current();
    }

    //Gọi lần đầu khi mount
    tick();

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
