import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const screen_title = (theme) => `
    font-family: ${theme.fonts.body_bold};
    font-size: ${theme.fontSizes.h3};
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

const caption = (theme) => `
font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
`;

const name = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-family: ${theme.fonts.body_medium};
`;

const small_title = (theme) => `
    font-size: ${theme.fontSizes.title};
`;

const title = (theme) => `
    font-family: ${theme.fonts.body_medium};
    font-size: ${theme.fontSizes.h4};
`;

const following_font = (theme) => `
font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.h3};
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  screen_title,
  name,
  title,
  small_title,
  following_font,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
