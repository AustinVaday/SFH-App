export const APP_NAME = "Signs of Humanity";

export const USERNAME_MAX_LENGTH = 25;
export const DISPLAYNAME_MAX_LENGTH = 30;
export const PASSWORD_MAX_LENGTH = 30;

export const VALIDATE_PASSWORD_LETTER = /^(?=.*[a-zA-Z])/;
export const VALIDATE_PASSWORD_NUMBER = /^(?=.*[0-9])/;
export const VALIDATE_PASSWORD_SPECIAL_CHAR = /^(?=.*[!@+=<>~,.:;()\/\-\?\|\\\_\[\]#\$%\^&\*])/;
export const VALIDATE_PASSWORD_ALL = /^[a-zA-Z0-9!@+=<>~,.:;()\/\-\?\|\\\_\[\]#\$%\^&\*]+$/;

export const VALIDATE_DISPLAYNAME = /^[a-zA-Z\s]+$/;

export const VALIDATE_USERNAME = /^[a-zA-Z\s]+$/;
export const VALIDATE_USERNAME_LETTER = /^(?=.*[a-zA-Z])/;

export const BIO_ROW_LIMIT = 4;
export const BIO_MAX_LENGTH = 80;

export const EXPO_NOTIFICATION_API = "https://exp.host/--/api/v2/push/send";