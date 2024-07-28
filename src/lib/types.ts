import {
  type SelectBoard,
  type SelectCompany,
  type SelectFeedback,
} from "~/server/db/schema";

export type ExtendedSelectFeedback = SelectFeedback & {
  board: SelectBoard & {
    company: SelectCompany;
  };
};
