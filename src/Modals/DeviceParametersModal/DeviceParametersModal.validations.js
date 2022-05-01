/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const validationSchema = () =>
  Yup.object().shape({
    key: Yup.string().trim().required("This field is required"),
    value: Yup.string().trim().required("This field is required"),
  });
