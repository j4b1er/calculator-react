import { useEffect } from "react";

export function useKey(buttons, dispatch) {
  useEffect(() => {
    const checkKey = (e) => {
      buttons.forEach((button) => {
        button.btnkeys.forEach((key) => {
          if (e.code.toLowerCase() === key.toLowerCase())
            dispatch({ type: button.action, payload: button });
        });
      });
    };

    document.addEventListener("keydown", checkKey);

    return () => document.removeEventListener("keydown", checkKey);
  }, []);
}
