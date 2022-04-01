import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.black};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const home_logo = (theme) => `
  font-family: ${theme.fonts.home_logo};
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.text.primary};
`;

const appintro_next = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.primary};
  text-align: center;
`;

const appintro_done = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const appintro_title = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.xxlarge};
  color: ${theme.colors.text.primary};
  text-align: center;
`;

const appintro_description = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.gray};
  text-align: center;
`;

const word_title = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 3px;
`;

const word_description = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 3px;
`;

const word_numbers = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 3px;
`;

const slash = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const word_username = (theme) => `
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.body_600};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 3px;
`;

const word_date = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.xsmall};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 3px;
`;

const bottomsheet_item = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.large};
`;

const bottomsheet_item_delete = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.error};
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
  font-size: ${theme.fontSizes.xlarge};
  text-align: center;
`;

const list_empty_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.gray};
  text-align: center;
`;

const search_username = (theme) => `
  flex: 1;
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
`;

const discover_word_title = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 3px;
`;

const profile_display_name = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.xlarge};
`;

const profile_bio = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  text-align: center;
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
  color: ${theme.colors.text.primary};
`;

const navbar_title = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.large};
`;

const editprofile_label = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
`;

const editprofile_empty_label = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.gray};
`;

const dialog_title = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  text-align: center;
  align-self: center;
`;

const dialog_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  text-align: center;
  align-self: center;
  padding-top: 10px;
`;

const dialog_negative = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.darkgray};
`;

const dialog_positive = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.error};
`;

const dialog_buttonText = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.darkgray};
`;

const dialog_cancel = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.large};
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

const profile_tab_word_title = (theme) => `
  font-family: ${theme.fonts.body_800};
  font-size: ${theme.fontSizes.large};
  color: ${theme.colors.text.secondary};
  text-shadow-color: black;
  text-shadow-radius: 0.5px;
`;

const video_duration = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
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
`;

const discover_list_title = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.xxlarge};
  padding-top: 5px;
  padding-left: 18px;
`;

const uploadword_word_button = (theme) => `
  font-family: ${theme.fonts.body_700};
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

const emailSent_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.secondary};
`;

const pw_requirement_title = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
`;

const pw_requirement_item = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
`;

const input_invalid = (theme) => `
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

const emailSent_title = (theme) => `
    font-family: ${theme.fonts.body_800};
    font-size: ${theme.fontSizes.xxxlarge};
    color: ${theme.colors.text.black};
    text-align: center;
`;

const emailSent_message = (theme) => `
    font-family: ${theme.fonts.body_400};
    font-size: ${theme.fontSizes.large};
    color: ${theme.colors.text.darkgray};
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

const profile_info = (theme) => `
    font-family: ${theme.fonts.body_600};
    font-size: ${theme.fontSizes.medium};
    color: ${theme.colors.text.black};
`;

const code_title = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.xlarge};
  padding-bottom: 10px;
`;

const code_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.gray};
`;

const code_resend_button = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
`;

const code_timer = (theme) => `
  font-family: ${theme.fonts.body_600};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.darkgray};
`;

const reauthenticate_title = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.xlarge};
`;

const reauthenticate_message = (theme) => `
  font-family: ${theme.fonts.body_400};
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.darkgray};
`;

const profile_tab_label = (theme) => `
  font-family: ${theme.fonts.body_700};
  font-size: ${theme.fontSizes.small};
`;

const variants = {
  home_logo,
  appintro_next,
  appintro_done,
  appintro_title,
  appintro_description,
  emailSent_button,
  emailSent_title,
  emailSent_message,
  video_duration,
  word_title,
  word_description,
  word_numbers,
  word_username,
  word_date,
  bottomsheet_item,
  bottomsheet_item_delete,
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
  profile_info,
  discover_word_title,
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
  dialog_title,
  dialog_message,
  dialog_negative,
  dialog_positive,
  dialog_buttonText,
  dialog_cancel,
  settings_version,
  following_textbutton,
  following_username,
  follow_textbutton,
  followers_username,
  profile_tab_word_title,
  permissions_title,
  permissions_message,
  uploadword_word_button,
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
  input_invalid,
  signup_info,
  newconversation_label,
  sender_message,
  chats_lastmessage,
  info_message,
  slash,
  discover_list_title,
  code_title,
  code_message,
  code_resend_button,
  code_timer,
  reauthenticate_title,
  reauthenticate_message,
  editprofile_empty_label,
  profile_tab_label,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
