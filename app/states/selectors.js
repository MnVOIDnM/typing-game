import { selector } from "recoil";
import { quizIndexState, wordIndexState } from "./atoms";
import { dictionary } from "../utils/dictionary";

export const typingWordState = selector({
  key: "typingWordState",
  get: ({ get }) => {
    const quizIndex = get(quizIndexState);
    // const word = dictionary[quizIndex];
    const word =
      dictionary[Math.floor(Math.random() * dictionary.length)];
    return word;
  },
});

export const characterConditionState = selector({
  key: "characterConditionState",
  get: ({ get }) => {
    const word = get(typingWordState);
    const index = get(wordIndexState);
    return {
      past: word.romaji.slice(0, index),
      current: word.romaji[index],
      upcoming: word.romaji.slice(index + 1, word.length),
    };
  },
});
