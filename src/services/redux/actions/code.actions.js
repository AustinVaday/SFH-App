import { codeAction } from "../constants";

import { MAILGUNAPIKEY, MAILGUNDOMAIN } from "@env";

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: MAILGUNDOMAIN, key: MAILGUNAPIKEY });

export const sendConfirmationCode = (email, codeType) => (dispatch) => {
  let code = Math.floor(100000 + Math.random() * 900000);

  mg.messages
    .create(MAILGUNDOMAIN, {
      from: "SFH <sfh@support.com>",
      to: email,
      subject: "Here is your code " + code,
      html: "<h1>To verify your account, enter this code:\n" + code + "</h1>",
    })
    .then(() => {
      dispatch({
        type: codeAction.CONFIRMATION_CODE_SUCCESS,
        codeType,
        code,
      });
      dispatch(startTimer());
    })
    .catch(() => {
      dispatch({
        type: codeAction.CONFIRMATION_CODE_FAILURE,
        error: "Unable to send the code.",
      });
    });
};

export const confirmedCodeSuccess = () => (dispatch) => {
  dispatch({
    type: codeAction.CONFIRMATION_CODE_SUCCESS,
    codeType: "",
    code: "",
  });
};

export const startTimer = () => (dispatch, getState) => {
  let countdown = null;
  clearInterval(countdown);

  dispatch({ type: codeAction.START_TIMER });

  countdown = setInterval(() => {
    dispatch({ type: codeAction.TIMER_TICKING });
    const { timer } = getState().code;

    if (timer === 0) {
      clearInterval(countdown);

      dispatch({ type: codeAction.STOP_TIMER });
    }
  }, 1000);
};

export const resetTimer = () => (dispatch) => {
  dispatch({ type: codeAction.RESETTIMER });
};
