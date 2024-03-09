import { useEffect, useRef } from "react";

export function useClickOutside(close) {
  const ref = useRef();

  useEffect(
    function () {
      if (!ref.current) return;

      const current = ref.current;

      const handleClickOutside = (e) => {
        if (e.target === current) {
          console.log("close");
          close();
        }
      };

      current.addEventListener("click", handleClickOutside);

      return () => current.removeEventListener("click", handleClickOutside);
    },
    [close]
  );

  return { ref };
}
