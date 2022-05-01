import { yupResolver } from "@hookform/resolvers/yup";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  createDeviceAction,
  updateDeviceAction,
} from "Pages/Devices/redux/duck";
import { bool, func, any } from "prop-types";
import { useEffect } from "react";
// import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "rtc-ui-library";
import { defaultValues, valueTypes } from "./DeviceParametersModal.constants";
import { validationSchema } from "./DeviceParametersModal.validations";

const DeviceParametersModal = ({ isOpen, handleClose, editParameter }) => {
  const currentUser = useSelector(({ common }) => common.user.user);
  const loading = useSelector(({ devices }) => devices.loading);

  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit = (data) => {
    console.log(data);
    const { id, userID, ...uploadData } = data;
    // if (data.id)
    //   return dispatch(updateDeviceAction(uploadData, data.id, handleClose));
    // dispatch(
    //   createDeviceAction({ ...data, userID: currentUser.id }, handleClose)
    // );
  };

  useEffect(() => {
    if (!isOpen) reset({ ...defaultValues, ...editParameter });
  }, [isOpen, reset, editParameter]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {loading && (
        <CircularProgress sx={{ position: "absolute", right: 10, top: 20 }} />
      )}
      <DialogTitle>
        <Typography fontSize="24px">
          {editParameter ? "Edit" : "New"} parameter
        </Typography>
      </DialogTitle>
      <form id="device-parameter-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ width: "500px" }}>
          <Box display="flex" flexDirection="column" gap="15px">
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Input
                  fullWidth
                  label="Key"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
              name="key"
              control={control}
            />

            <Controller
              render={({ field, fieldState: { error } }) => (
                <Input
                  fullWidth
                  label="Value"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
              name="value"
              control={control}
            />

            <Controller
              render={({ field, fieldState: { error } }) => (
                <Select error={!!error} {...field}>
                  {valueTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                  <MenuItem value={"tye"}>tyes </MenuItem>
                </Select>
              )}
              name="type"
              control={control}
            />
          </Box>
        </DialogContent>
      </form>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="device-parameter-form">
          {editParameter ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeviceParametersModal.propTypes = {
  isOpen: bool,
  handleClose: func,
  editDevice: any,
};

DeviceParametersModal.defaultProps = {
  isOpen: false,
  editParameter: null,
};

export default DeviceParametersModal;
