import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body_400};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const screen_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.body};
`;

const list_empty_title = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.body};
    text-align: center;
`;

const list_empty_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.button};
    text-align: center;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.title};
    color: ${theme.colors.text.white};
`;

const caption = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.caption};
    color: ${theme.colors.text.white};
`;

const label = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.caption};
`;

const numbers = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.text.white};
`;

const date = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.date};
    color: ${theme.colors.text.white};
`;

const name = (theme) => `
    font-size: ${theme.fontSizes.button};
    font-family: ${theme.fonts.body_600};
    color: ${theme.colors.text.white};
`;

const follow_name = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-family: ${theme.fonts.body_700};
`;

const comment_name = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-family: ${theme.fonts.body_700};
`;

const notifications_name = (theme) => `
    font-size: ${theme.fontSizes.button};
    font-family: ${theme.fonts.body_600};
`;

const notifications_message = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-family: ${theme.fonts.body_400};
`;

const message_name = (theme) => `
    font-size: ${theme.fontSizes.button};
    font-family: ${theme.fonts.body_600};
`;

const small_title = (theme) => `
    font-size: ${theme.fontSizes.title};
`;

const following_font = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.h3};
`;

const setting_button = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.button};
`;

const setting_title = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.body};
`;

const text_button = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.caption};
`;

const contained_button = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.caption};
    color: ${theme.colors.text.white};
`;

const account_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.h4};
    color: ${theme.colors.text.brand};
    text-align: center;
`;

const account_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.title};
    color: ${theme.colors.text.secondary};
`;

const forgot_password_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.title};
    color: ${theme.colors.text.brand};
`;

const forgot_password_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.text.secondary};
    text-align: center;
`;

const profile_numbers = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.body};
`;

const profile_labels = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.button};
`;

const profile_identify = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.body};
    color: ${theme.colors.text.secondary};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  screen_title,
  name,
  notifications_name,
  notifications_message,
  title,
  small_title,
  following_font,
  date,
  setting_button,
  setting_title,
  message_name,
  list_empty_title,
  list_empty_message,
  text_button,
  contained_button,
  account_title,
  account_message,
  forgot_password_title,
  forgot_password_message,
  numbers,
  follow_name,
  comment_name,
  profile_numbers,
  profile_labels,
  profile_identify
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
