import { atom } from "recoil";

export const firstNameAtom = atom({
  key: "firstname",
  default: "",
});

export const addressAtom = atom({
  key: "address",
  default: "",
});
