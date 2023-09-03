"use client";

import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  pressedKeysState,
  quizIndexState,
  wordIndexState,
} from "./states/atoms";
import { characterConditionState, typingWordState } from "./states/selectors";
import Keyboard from "./components/Keyboard";

export default function Home() {
  const [wordIndex, setWordIndex] = useRecoilState(wordIndexState);
  const [quizIndex, setQuizIndex] = useRecoilState(quizIndexState);
  const [pressedKeys, setPressedKeys] = useRecoilState(pressedKeysState);
  const [isStarted, setIsStarted] = useState(false);
  const typingWord = useRecoilValue(typingWordState);
  const characterCondition = useRecoilValue(characterConditionState);

  const typingRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === characterCondition.current) {
      setWordIndex((prev) => prev + 1);
    } else if (!pressedKeys.includes(e.key)) {
      setPressedKeys([...pressedKeys, e.key]);
    }
    if (e.key === "Escape") {
      refreshAll();
    }
    if (e.key === "Enter") {
      setIsStarted(true);
    }

    if (wordIndex + 1 >= typingWord.roman.length) {
      if (quizIndex + 1 >= 10) {
        setIsStarted(false);
      } else {
        setQuizIndex((prev) => prev + 1);
        setWordIndex(0);
      }
    }
  }
  const handleKeyUp = (e) => {
    setPressedKeys(pressedKeys.filter((pressedKey) => pressedKey !== e.key));
  };

  const refreshAll = () => {
    setWordIndex(0);
    setIsStarted(false);
    setQuizIndex(0);
  };

  const onClick = () => {
    typingRef.current && typingRef.current.focus();
  };

  useEffect(() => {
    onClick();
  }, []);

  return (
    <div className="flex flex-col items-center p-3">
      <div
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={onClick}
        tabIndex={0}
        ref={typingRef}
        className="flex items-center justify-center w-[780px] h-[200px] p-5 my-5 rounded-lg bg-gradient-to-b from-blue-500 to-blue-400 outline-none"
      >
        {isStarted ? (
          <div className="flex flex-col items-center">
            <h className="text-lg text-white">{typingWord.kana}</h>
            <h className="text-4xl text-white">{typingWord.japanese}</h>
            <h className="text-5xl">
              {characterCondition.past}
              <mark className="text-white bg-slate-500 rounded-lg">
                {characterCondition.current}
              </mark>
              <span className="text-white">{characterCondition.upcoming}</span>
            </h>
          </div>
        ) : (
          <div className="">Press Enter to start</div>
        )}
      </div>

      <Keyboard />
    </div>
  );
}
