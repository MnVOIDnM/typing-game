import { atom } from "recoil";

export const wordIndexState = atom({
  key: "wordIndexState",
  default: 0,
});

export const quizIndexState = atom({
  key: "quizIndexState",
  default: 0,
});

export const pressedKeysState = atom({
  key: "pressedKeysState",
  default: [],
});

export const isStartedState = atom({
  key: "isStartedState",
  default: false,
});
