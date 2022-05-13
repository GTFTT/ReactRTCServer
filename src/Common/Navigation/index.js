//vendor
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { TitleText } from "rtc-ui-library";
import LogoutIcon from "@mui/icons-material/Logout";

//proj

//own
import logo from "./logo.svg";
import Styles from "./styles.module.css";
import navigationConfiguration from "./config";
import NavigationButton from "./components/NavigationButton";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  selectEditDevice,
  getDeviceByIdAction,
} from "../../Pages/Devices/redux/duck";
// proj
import {
  selectAuthToken,
  logOut,
  getErrorsListAction,
  selectErrors,
} from "Common/redux/duck";
import SpeechMicrophone from "Components/SpeechMicrophone/SpeechMicrophone";
import { Box } from "@mui/system";
import Deepgram from "utils/deepgram";
import Voice from "utils/voice";

import { fetchAPI } from "utils";
import SoundWave from "Components/SoundWave/SoundWave";
import { CircularProgress } from "@mui/material";

/**
 * Central navigation file, contains controls and commonly used stuff.
 * To configure available nav buttons visit config.js file.
 */
const selector = createSelector(
  selectAuthToken,
  selectEditDevice,
  selectErrors,
  (token, editDevice, errorsList) => ({
    token,
    editDevice,
    errorsList,
  })
);

const Navigation = ({ children }) => {
  const { token, editDevice, errorsList } = useSelector(selector);
  const dispatch = useDispatch();
  const [micActive, setMicActive] = useState(false);
  const [voiceCmdLoading, setVoiceCmdLoading] = useState(false);
  const navigationConfig = navigationConfiguration({ token });

  const deepgramRecorder = useMemo(() => new Deepgram(), []);
  const voicePlayer = useMemo(() => new Voice(), []);

  deepgramRecorder.setOnTextCallback((commandText) => {
    setVoiceCmdLoading(true);
    fetchAPI("POST", "/processTextCommand", null, {
      commandText,
    })
      .then((res) => {
        setVoiceCmdLoading(false);
        if (res.ok && editDevice?.id) {
          dispatch(getDeviceByIdAction(editDevice.id));
          // voicePlayer.speak("Success");
        }
      })
      .catch((err) => {
        const voiceError = errorsList.find(
          (error) => error.code === err?.response?.errorCode
        );
        voicePlayer.speak(voiceError?.voice);
        setVoiceCmdLoading(false);
      });
  });

  useEffect(() => {
    dispatch(getErrorsListAction());
  }, [dispatch]);

  useEffect(() => {
    if (micActive) return deepgramRecorder.startRecording();
    deepgramRecorder.stopRecording();
  }, [micActive, deepgramRecorder]);

  return (
    <div className={Styles.mainCont}>
      <div className={Styles.navigationAndHeaderPanel}>
        <header className={Styles.header}>
          <Box display="flex">
            <img src={logo} className={Styles.logo} alt="logo" />
            <div className={Styles.title}> RTC </div>
          </Box>
          <Box position="relative" display="flex" alignItems="center">
            <SpeechMicrophone
              checked={micActive}
              onChange={() => setMicActive(!micActive)}
            />
            {micActive && <SoundWave />}
            {voiceCmdLoading && (
              <CircularProgress
                size="20px"
                sx={{ position: "absolute", top: 10 }}
              />
            )}
            {/* <Box ref={micRef} /> */}
          </Box>
          <div className={Styles.logOutCont}>
            <TitleText
              className={Styles.logOutButton}
              onClick={() => dispatch(logOut())}
            >
              <LogoutIcon />
            </TitleText>
          </div>
        </header>
        <div className={Styles.sideMenu}>
          <div className={Styles.sideMenuContent}>
            {navigationConfig &&
              _.map(navigationConfig, ({ title, path, visible }) => {
                if (visible === false) return null;
                return (
                  <NavigationButton label={title} path={path} key={path} />
                );
              })}
          </div>
        </div>
      </div>
      <div className={Styles.children}>{children}</div>
    </div>
  );
};

export default Navigation;
