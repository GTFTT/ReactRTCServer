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
  FormControl,
  InputLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  createParameterAction,
  selectDevicesLoading,
  selectEditDevice,
  updateParameterAction,
} from "Pages/Devices/redux/duck";
import { bool, func, any } from "prop-types";
import { useEffect } from "react";
// import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Button, Input } from "rtc-ui-library";
import { defaultValues, valueTypes } from "./DeviceParametersModal.constants";
import { validationSchema } from "./DeviceParametersModal.validations";

const selector = createSelector(
  selectDevicesLoading,
  selectEditDevice,
  (loading, device) => ({ loading, device })
);

const DeviceParametersModal = ({ isOpen, handleClose, editParameter }) => {
  const { loading, device } = useSelector(selector);

  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit = (data) => {
    const { id, deviceID, ...uploadData } = data;
    // dispatch(createParameterAction(uploadData, device.id, handleClose));
    if (data.id)
      return dispatch(
        updateParameterAction(uploadData, data.id, device.id, handleClose)
      );
    dispatch(createParameterAction(uploadData, device.id, handleClose));
  };

  useEffect(() => {
    reset({ ...defaultValues, ...editParameter });
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
                <FormControl size="small">
                  <InputLabel
                    sx={{ color: "#c1f4ff!important" }}
                    id="type-select"
                  >
                    Type
                  </InputLabel>
                  <Select
                    labelId="type-select"
                    label="Type"
                    size="small"
                    error={!!error}
                    {...field}
                  >
                    {valueTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              name="type"
              control={control}
            />
            <Controller
              render={({ field, fieldState: { error } }) => (
                <Input
                  fullWidth
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
                  label="Name"
                  error={!!error}
                  helperText={error?.message}
                  {...field}
                />
              )}
              name="name"
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
