/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().trim().required("This field is required"),
    description: Yup.string().trim().required("This field is required"),
    code: Yup.string().trim().required("This field is required"),
  });
