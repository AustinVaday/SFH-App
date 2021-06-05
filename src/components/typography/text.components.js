import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const screen_title = (theme) => `
    font-size: ${theme.fontSizes.h2};
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
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const name = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.bold};
`;

const small_title = (theme) => `
color: white;
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.bold};
`;

const title = (theme) => `
    font-size: ${theme.fontSizes.h4};
    font-weight: ${theme.fontWeights.bold};
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
  small_title
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
