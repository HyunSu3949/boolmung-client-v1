import { GetApi } from "src/types/apiTypes";
import { axiosInstance, axiosPublic } from "src/utils/apis/instance";
import { getQueryString, getPathWhitPathVariable } from "src/utils/apis/utils";

const getApiEndPoints = {
  getPreSignedurl: "/s3/url",
  getAllRoom: "/rooms",
  joinRoom: "/rooms/:roomid",
  logout: "/users/logout",
};

const generateGetApiFunction = (() => {
  const apiFunction = <K extends keyof GetApi>(key: K, noNeedToken = false) => {
    return async ({
      pathVariables,
      queryParameters,
    }: {
      pathVariables?: GetApi[K]["pathVariables"];
      queryParameters?: GetApi[K]["queryParameters"];
    }): Promise<GetApi[K]["result"]> => {
      let path = getApiEndPoints[key];

      if (pathVariables) {
        path = getPathWhitPathVariable(path, pathVariables);
      }
      if (queryParameters) {
        path += getQueryString(queryParameters);
      }

      let result;
      if (noNeedToken) {
        result = await axiosPublic.get(path);
      } else {
        result = await axiosInstance.get(path);
      }
      return result.data;
    };
  };
  return apiFunction;
})();

export const getPreSignedUrl = generateGetApiFunction("getPreSignedurl");
export const getAllRoom = generateGetApiFunction("getAllRoom");
export const joinRoom = generateGetApiFunction("joinRoom");
export const logout = generateGetApiFunction("logout");