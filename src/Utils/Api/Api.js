import axios from "axios";

const apiRoutes = {
  getProfile: "/profile",
  getDepartments: "/departments",
  getDepartment: "/departments/:id",
  updateDepartment: "/departments/:id",
  addDepartment: "/departments",
  getForms: "/forms",
  getForm: "/form",
  getFields: "/fields",
  getField: "/field",
};

const apiClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    accept: "application/json",
  },
});

const setAxiosTokenInterceptor = async (accessToken) => {
  if (accessToken) {
    apiClient.defaults.headers.common["Authorization"] = accessToken;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

const api = {
  get: (url, params) => apiClient.get(url),
  post: (url, data) => apiClient.post(url, data, {}),
  patch: (url, data) => apiClient.patch(url, data, {}),
  put: (url, data) => apiClient.put(url, data, {}),
  delete: (url) => apiClient.delete(url, {}),
};

export { apiRoutes, api, setAxiosTokenInterceptor };
