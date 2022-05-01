import { yupResolver } from "@hookform/resolvers/yup";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
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
import { defaultValues } from "./NewDeviceModal.constants";
import { validationSchema } from "./NewDeviceModal.validations";

const NewDeviceModal = ({ isOpen, handleClose, editDevice }) => {
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
    const { id, userID, ...uploadData } = data;
    if (data.id)
      return dispatch(updateDeviceAction(uploadData, data.id, handleClose));
    dispatch(
      createDeviceAction({ ...data, userID: currentUser.id }, handleClose)
    );
  };

  useEffect(() => {
    reset({ ...defaultValues, ...editDevice });
  }, [isOpen, reset, editDevice]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {loading && (
        <CircularProgress sx={{ position: "absolute", right: 10, top: 20 }} />
      )}
      <DialogTitle>
        <Typography fontSize="24px">
          {editDevice ? "Edit" : "New"} device
        </Typography>
      </DialogTitle>
      <form id="device-form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ width: "500px" }}>
          <Box display="flex" flexDirection="column" gap="15px">
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Input
                  fullWidth
                  label="Name"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
              name="name"
              control={control}
            />
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Input
                  multiline
                  fullWidth
                  minRows={3}
                  label="Description"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
              name="description"
              control={control}
            />
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Input
                  fullWidth
                  label="Code"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
              name="code"
              control={control}
            />
          </Box>
        </DialogContent>
      </form>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="device-form">
          {editDevice ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NewDeviceModal.propTypes = {
  isOpen: bool,
  handleClose: func,
  editDevice: any,
};

NewDeviceModal.defaultProps = {
  isOpen: false,
  editDevice: null,
};

export default NewDeviceModal;
