import { fetchAPI } from "utils";

export const createDeviceService = async (data) => {
  const resp = await fetchAPI("PUT", "/createDevice", data);
  return resp;
};

export const updateDeviceService = async (id, data) => {
  const resp = await fetchAPI("POST", `/updateDevice/${id}`, data);
  return resp;
};

export const getDeviceByIdService = async (id) => {
  const resp = await fetchAPI("GET", `/getDevice/${id}`);
  return resp;
};

export const getDeviceParametersService = async (id) => {
  const resp = await fetchAPI("GET", `/devices/${id}/getAllDeviceParameters`, {
    page: 1,
  });
  return resp;
};
