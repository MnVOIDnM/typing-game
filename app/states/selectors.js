import { selector } from "recoil";
import { quizIndexState, wordIndexState } from "./atoms";
import { dictionary } from "../dictionary";

export const typingWordState = selector({
  key: "typingWordState",
  get: ({ get }) => {
    const quizIndex = get(quizIndexState);
    const word = dictionary[quizIndex];
    return word;
  },
});

export const characterConditionState = selector({
  key: "characterConditionState",
  get: ({ get }) => {
    const word = get(typingWordState);
    const index = get(wordIndexState);
    return {
      past: word.roman.slice(0, index),
      current: word.roman[index],
      upcoming: word.roman.slice(index + 1, word.length),
    };
  },
});
