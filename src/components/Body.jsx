import { useEffect } from "react";

export default function Body({ children }) {
  useEffect(() => {
    const callback = (e) => {
      const keyReq = "";
      // if (e.shiftKey && e.code === "Digit8") keyReq = "ShiftDigit8";
      // console.log(e.shiftKey);
      console.log(e.code);
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, []);

  return <div className="calculator__body">{children}</div>;
}
