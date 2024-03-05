import { PatchApi } from "src/apis/apiTypes";
import { axiosInstance, axiosPublic } from "src/apis/instance";
import { getQueryString, getPathWhitPathVariable } from "src/apis/utils";

const patchApiEndPoints = {
  patchUserInfo: "/users/update",
};

const generatePatchApiFunction = (() => {
  const apiFunction = <K extends keyof PatchApi>(
    key: K,
    noNeedToken = false,
  ) => {
    return async ({
      pathVariables,
      queryParameters,
      body,
    }: {
      pathVariables?: PatchApi[K]["pathVariables"];
      queryParameters?: PatchApi[K]["queryParameters"];
      body: any;
    }): Promise<PatchApi[K]["result"]> => {
      let path = patchApiEndPoints[key];

      if (pathVariables) {
        path = getPathWhitPathVariable(path, pathVariables);
      }
      if (queryParameters) {
        path += getQueryString(queryParameters);
      }

      let result;
      if (noNeedToken) {
        result = await axiosPublic.patch(path, body);
      } else {
        result = await axiosInstance.patch(path, body);
      }
      return result.data;
    };
  };
  return apiFunction;
})();

export const patchUserInfo = generatePatchApiFunction("patchUserInfo");
