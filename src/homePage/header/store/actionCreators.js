import * as constants from './constants';

export const handleChangeFlag = () => ({
  type: constants.CHANGE_COUNTDOWN_FLAG,
});

export const setFloatWindowFlag = (Flag) => ({
  type: constants.CHANGE_FLOAT_WINDOW_FLAG,
  data:Flag
});
