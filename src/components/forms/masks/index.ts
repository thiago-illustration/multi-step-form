import { ChangeEventHandler } from "react";

type Handler = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const currency: Handler = (e) => {
  let value = e.currentTarget.value;

  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e.currentTarget.value = "$ " + value;
  return e;
};

const date: Handler = (e) => {
  return e;
};

const phone: Handler = (e) => {
  return e;
};

export const masks = {
  currency,
  date,
  phone,
};
