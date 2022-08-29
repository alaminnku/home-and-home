import { atom } from "recoil";

export const firstNameAtom = atom({
  key: "firstname",
  default: "",
});

export const lastNameAtom = atom({
  key: "lastname",
  default: "",
});
