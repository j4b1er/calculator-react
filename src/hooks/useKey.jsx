import { useEffect } from "react";

export function useKey(buttons, dispatch) {
  useEffect(() => {
    const checkKey = (e) => {
      const isShiftPressed = e.shiftKey;

      buttons.forEach((button) => {
        button.btnkeys.forEach((key) => {
          let keyPressed = e.code.toLowerCase();
          if (isShiftPressed) keyPressed = `shift${keyPressed}`;

          console.log(keyPressed);
          if (keyPressed === key.toLowerCase())
            dispatch({ type: button.action, payload: button });
        });
      });
    };

    document.addEventListener("keydown", checkKey);

    return () => document.removeEventListener("keydown", checkKey);
  }, [buttons, dispatch]);
}
