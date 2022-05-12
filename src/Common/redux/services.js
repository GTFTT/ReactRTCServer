import { fetchAPI } from "utils";

export const getErrorsListService = async (id) => {
  const resp = await fetchAPI("GET", "/errors");
  return resp.list;
};
