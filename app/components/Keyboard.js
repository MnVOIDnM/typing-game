"use client";

import { useRecoilValue } from "recoil";
import { characterConditionState } from "../states/selectors";
import { pressedKeysState } from "../states/atoms";

function Keyboard() {
  const characterCondition = useRecoilValue(characterConditionState);
  const pressedKeys = useRecoilValue(pressedKeysState);
  const keys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "¥"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@", "["],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "]"],
    ["⇧", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "_", "⇧"],
  ];

  return (
    <div className="w-[780px] flex flex-col items-center bg-gray-200 text-gray-700 text-lg font-medium rounded-lg">
      {keys.map((line, index) => (
        <div key={index}>
          {line.map((key, index) => (
            <span
              key={index}
              className={`inline-block px-5 py-3 m-1 rounded-lg shadow-sm ${
                pressedKeys.includes(key)
                  ? "bg-orange-200"
                  : key === characterCondition.current
                  ? "bg-blue-200 ring-2 ring-offset- outline-note"
                  : "bg-white"
              }`}
            >
              {key.toUpperCase()}
            </span>
          ))}
        </div>
      ))}
      <div className="py-3 m-1 rounded-lg shadow-sm w-1/2 text-center bg-white">
        space
      </div>
    </div>
  );
}

export default Keyboard;
