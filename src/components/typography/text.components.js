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

const empty_title = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.body};
`;

const empty_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.button};
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
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.title};
`;

const caption = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.caption};
`;

const label = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.caption};
`;

const date = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.date};
`;

const name = (theme) => `
    font-size: ${theme.fontSizes.body};
    font-family: ${theme.fonts.body_600};
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
  empty_title,
  empty_message
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
