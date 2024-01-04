import * as Yup from "yup";
import i18n from "./i18n";

export default function handleErrors() {}

export const searchSchema = Yup.object({
  query: Yup.string()
    .min(2, i18n.t("validator.search.min"))
    .max(100, i18n.t("validator.search.max"))
    .matches(/([aA-zZ0-9_-])/, i18n.t("validator.search.special")),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email(i18n.t("validator.email.required"))
    .min(8, i18n.t("validator.email.min"))
    .max(255, i18n.t("validator.email.max")),
  password: Yup.string()
    .min(8, i18n.t("validator.password.min"))
    .max(30, i18n.t("validator.password.max")),
});

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(5, i18n.t("validator.username.min"))
    .max(30, i18n.t("validator.username.max")),
  email: Yup.string()
    .email(i18n.t("validator.email.required"))
    .min(8, i18n.t("validator.email.min"))
    .max(255, i18n.t("validator.email.max")),
  password: Yup.string()
    .min(8, i18n.t("validator.password.min"))
    .max(30, i18n.t("validator.password.max")),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    i18n.t("validator.confirmPassword")
  ),
});

export const forgottenSchema = Yup.object({
  email: Yup.string()
    .email(i18n.t("validator.email.required"))
    .min(8, i18n.t("validator.email.min"))
    .max(255, i18n.t("validator.email.max")),
});

export const resetSchema = Yup.object({
  email: Yup.string()
    .email(i18n.t("validator.email.required"))
    .min(8, i18n.t("validator.email.min"))
    .max(255, i18n.t("validator.email.max")),
  password: Yup.string()
    .min(8, i18n.t("validator.password.min"))
    .max(30, i18n.t("validator.password.max")),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    i18n.t("validator.confirmPassword")
  ),
  passwordToken: Yup.string().required(),
});

export const createWatchlistSchema = Yup.object({
  title: Yup.string()
    .min(3, i18n.t("validator.watchlist.title.min"))
    .max(50, i18n.t("validator.watchlist.title.min")),
});

export const updateWatchlistSchema = Yup.object({
  newTitle: Yup.string()
    .min(3, i18n.t("validator.watchlist.title.min"))
    .max(50, i18n.t("validator.watchlist.title.min")),
});

export const createMediaSchema = Yup.object({
  watchlistId: Yup.string().required(i18n.t("validator.media.required")),
});
