import { useEffect, useState } from "react";

export function useViewportSize(
  offsetWidth: number = 0,
  offsetHeight: number = 0
) {
  const getSize = () => ({
    width: window.innerWidth - offsetWidth,
    height: window.innerHeight - offsetHeight,
  });

  const [size, setSize] = useState(getSize());

  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [offsetHeight, offsetWidth]);

  return size; // { width, height }
}
