import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body_400};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const search_username = (theme) => `
    flex: 1;
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.large};
`;

const trending_post_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.text.white};
`;

const profile_display_name = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.xlarge};
`;

const screen_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.large};
`;

const list_empty_title = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.large};
    text-align: center;
`;

const list_empty_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.medium};
    text-align: center;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.large};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.large};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.xlarge};
    color: ${theme.colors.text.white};
    text-shadow-color: black;
    text-shadow-radius: 0.5px;
`;

const caption = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.text.white};
    text-shadow-color: black;
    text-shadow-radius: 0.5px;
`;

const label = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
`;

const numbers = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.text.white};
`;

const date = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.xsmall};
    color: ${theme.colors.text.white};
    text-shadow-color: black;
    text-shadow-radius: 0.5px;
`;

const name = (theme) => `
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body_600};
    color: ${theme.colors.text.white};
    text-shadow-color: black;
    text-shadow-radius: 0.5px;
`;

const follow_name = (theme) => `
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.body_700};
`;

const comment_name = (theme) => `
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.body_700};
    color: ${theme.colors.text.black};
`;

const comment_date = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.xsmall};
    color: ${theme.colors.text.black};
`;

const comment_votes = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.text.black};
`;

const comment_header = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.text.black};
`;

const comment = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.text.black};
`;

const notifications_name = (theme) => `
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body_600};
`;

const notifications_message = (theme) => `
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.body_400};
`;

const message_name = (theme) => `
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body_600};
`;

const small_title = (theme) => `
    font-size: ${theme.fontSizes.xlarge};
`;

const following_font = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.h3};
`;

const setting_button = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.medium};
`;

const setting_title = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.large};
`;

const text_button = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
`;

const contained_button = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
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
    font-size: ${theme.fontSizes.xlarge};
    color: ${theme.colors.text.secondary};
`;

const forgot_password_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.xlarge};
    color: ${theme.colors.text.brand};
`;

const forgot_password_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.text.secondary};
    text-align: center;
`;

const profile_numbers = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.large};
`;

const profile_labels = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.medium};
`;

const profile_identify = (theme) => `
    font-family: ${theme.fonts.body_700};
    font-size: ${theme.fontSizes.large};
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
  profile_identify,
  trending_post_title,
  profile_display_name,
  search_username,
  comment_date,
  comment,
  comment_votes,
  comment_header
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
