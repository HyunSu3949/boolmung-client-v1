import { PostApi } from "src/types/apiTypes";
import { axiosInstance, axiosPublic } from "src/utils/apis/instance";
import { getQueryString, getPathWhitPathVariable } from "src/utils/apis/utils";
import { CreateRoomFormData } from "src/types/index";

const postApiEndPoints = {
  createRoom: "/rooms",
  login: "/users/login",
  signup: "/users/signup",
};

const generatePostApiFunction = (() => {
  const apiFunction = <K extends keyof PostApi>(
    key: K,
    noNeedToken = false,
  ) => {
    return async ({
      body,
      pathVariables,
      queryParameters,
    }: {
      body: PostApi[K]["body"];
      pathVariables?: PostApi[K]["pathVariables"];
      queryParameters?: PostApi[K]["queryParameters"];
    }): Promise<PostApi[K]["result"]> => {
      let path = postApiEndPoints[key];

      if (pathVariables) {
        path = getPathWhitPathVariable(path, pathVariables);
      }
      if (queryParameters) {
        path += getQueryString(queryParameters);
      }

      let result;
      if (noNeedToken) {
        result = await axiosPublic.post(path, body);
      } else {
        result = await axiosInstance.post(path, body);
      }
      return result.data;
    };
  };
  return apiFunction;
})();

export const createRoom = generatePostApiFunction("createRoom");
export const login = generatePostApiFunction("login");
export const signup = generatePostApiFunction("signup");
