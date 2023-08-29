"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import { quizIndexState, wordIndexState } from "./states/atoms";
import { characterConditionState, typingWordState } from "./states/selectors";
import { useState } from "react";

export default function Home() {
  const [wordIndex, setWordIndex] = useRecoilState(wordIndexState);
  const [quizIndex, setQuizIndex] = useRecoilState(quizIndexState);

  const [isStarted, setIsStarted] = useState(false);

  const typingWord = useRecoilValue(typingWordState);
  const characterCondition = useRecoilValue(characterConditionState);

  function checkKeyPress(e) {
    if (e.key === characterCondition.current) {
      setWordIndex((prev) => prev + 1);
    }
  }

  function handleKeyPress(e) {
    if (!isStarted) {
      setIsStarted(true);
    }
    checkKeyPress(e);
    if (wordIndex + 1 >= typingWord.roman.length) {
      if (quizIndex + 1 >= 10) {
        setIsStarted(false);
      } else {
        setQuizIndex((prev) => prev + 1);
        setWordIndex(0);
      }
    }
  }

  const refreshAll = () => {
    setWordIndex(0);
    setIsStarted(false);
    setQuizIndex(0);
  };

  return (
    <div
      onKeyDown={(e) => handleKeyPress(e)}
      className="flex flex-col justify-center items-center gap-1 p-20 my-10 mx-20 rounded-2xl border-2 bg-gradient-to-b from-blue-500 to-blue-400"
    >
      <h className="text-lg text-white">{typingWord.kana}</h>
      <h className="text-4xl text-white">{typingWord.japanese}</h>
      <h className="text-5xl">
        {characterCondition.past}
        <mark className="text-white bg-slate-700 rounded-full">
          {characterCondition.current}
        </mark>
        <span className="text-white">{characterCondition.upcoming}</span>
      </h>
      <button onClick={refreshAll} className="mt-10">
        {isStarted ? "リセット" : "スタート"}
      </button>
    </div>
  );
}
