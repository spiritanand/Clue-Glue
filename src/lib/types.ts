import {
  type SelectBoard,
  type SelectCompany,
  type SelectFeedback,
  type SelectUser,
} from "~/server/db/schema";

export type ExtendedSelectFeedback = SelectFeedback & {
  user: SelectUser;
  board: SelectBoard & {
    company: SelectCompany;
  };
};
