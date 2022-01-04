import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.black};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const post_title = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const post_description = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const post_numbers = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const post_username = (theme) => `
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body_600};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const post_date = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const comment_list_empty_title = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  text-align: center;
`;

const comment_list_empty_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  text-align: center;
`;

const swipe_delete = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
`;

const chats_date = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.text.darkgray};
`;

const chats_name = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
`;

const chats_lastmessage = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.darkgray};
`;

const android_bottomsheet_delete = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.error};
`;

const android_bottomsheet_cancel = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
`;

const list_empty_title = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  text-align: center;
  padding-bottom: 20px;
`;

const list_empty_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  text-align: center;
`;

const search_username = (theme) => `
  flex: 1;
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
`;

const discover_post_title = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const profile_display_name = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.large};
`;

const profile_bio = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
`;

const profile_following_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.primary}
`;

const profile_follow_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.secondary}
`;

const profile_message_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.primary}
`;

const profile_editprofile_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.primary}
`;

const navbar_title = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.large};
`;

const editprofile_label = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
`;

const settings_dialog_title = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  align-self: center;
  padding: 30px;
`;

const settings_dialog_cancel = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.primary};
`;

const settings_dialog_logout = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.error};
`;

const settings_version = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.darkgray};
`;

const info_message = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
`;

const following_textbutton = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.primary};
`;

const following_username = (theme) => `
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body_700};
`;

const follow_textbutton = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.secondary};
`;

const followers_username = (theme) => `
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body_700};
`;

const profile_tab_post_title = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const permissions_title = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.xlarge};
  text-align: center;
  padding-bottom: 20px;
`;

const permissions_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.large};
  text-align: center;
  padding-bottom: 100px;
`;

const uploadpost_post_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary}
`;

const authentications_title = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.xxxlarge};
  color: ${theme.colors.text.primary};
  text-align: center;
`;

const authentications_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.text.darkgray};
`;

const authentications_text_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
`;

const fb_google_textbutton = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
`;

const login_info_signup = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
`;

const login_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
`;

const signup_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
`;

const forgot_password_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
`;

const pw_requirement_title = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
`;

const pw_requirement_item = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
`;

const signup_invalid = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.error};
  padding-top: 5px;
`;

const signup_info = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.darkgray};
  padding-top: 10px;
`;

const newconversation_label = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.darkgray};
`;

const sender_message = (theme) => `
  color: ${theme.colors.text.secondary};
`;

const body = () => `
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
    color: ${theme.colors.text.secondary};
    text-shadow-color: black;
    text-shadow-radius: 0.5px;
`;

const caption = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.text.secondary};
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
    color: ${theme.colors.text.secondary};
`;

const date = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.xsmall};
`;

const name = (theme) => `
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body_600};
    color: ${theme.colors.text.secondary};
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
`;

const comment_header = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.medium};
`;

const comment = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
`;

const activity_username = (theme) => `
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body_600};
`;

const activity_message = (theme) => `
    font-size: ${theme.fontSizes.small};
    font-family: ${theme.fonts.body_400};
`;

const activity_date = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.xsmall};
    color: ${theme.colors.text.darkgray};
`;

const activity_textbutton = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.text.secondary};
`;

const newconversation_name = (theme) => `
    font-size: ${theme.fontSizes.medium};
    font-family: ${theme.fonts.body_600};
`;

const small_title = (theme) => `
    font-size: ${theme.fontSizes.xlarge};
`;

const following_font = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.xxxxlarge};
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
    color: ${theme.colors.text.secondary};
`;

const account_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.xxxlarge};
    color: ${theme.colors.text.primary};
    text-align: center;
`;

const account_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.xlarge};
    color: ${theme.colors.text.darkgray};
`;

const forgot_password_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.text.black};
`;

const forgot_password_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.text.darkgray};
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
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.text.darkgray};
`;

const variants = {
  post_title,
  post_description,
  post_numbers,
  post_username,
  post_date,
  comment_list_empty_title,
  comment_list_empty_message,
  list_empty_title,
  list_empty_message,
  body,
  label,
  caption,
  error,
  hint,
  name,
  activity_username,
  activity_message,
  activity_date,
  activity_textbutton,
  title,
  small_title,
  following_font,
  date,
  setting_button,
  setting_title,
  newconversation_name,
  chats_date,
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
  discover_post_title,
  profile_display_name,
  profile_bio,
  profile_following_button,
  profile_follow_button,
  profile_message_button,
  profile_editprofile_button,
  search_username,
  comment_date,
  comment,
  comment_votes,
  comment_header,
  navbar_title,
  swipe_delete,
  chats_name,
  android_bottomsheet_delete,
  android_bottomsheet_cancel,
  editprofile_label,
  settings_dialog_title,
  settings_dialog_cancel,
  settings_dialog_logout,
  settings_version,
  following_textbutton,
  following_username,
  follow_textbutton,
  followers_username,
  profile_tab_post_title,
  permissions_title,
  permissions_message,
  uploadpost_post_button,
  authentications_title,
  authentications_message,
  authentications_text_button,
  fb_google_textbutton,
  login_info_signup,
  forgot_password_button,
  signup_button,
  login_button,
  pw_requirement_title,
  pw_requirement_item,
  signup_invalid,
  signup_info,
  newconversation_label,
  sender_message,
  chats_lastmessage,
  info_message
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
