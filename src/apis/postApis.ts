import { PostApi } from "src/apis/types";
import { axiosInstance, axiosPublic } from "src/apis/instance";
import { getQueryString, getPathWhitPathVariable } from "src/apis/utils";
import { CreateRoomFormData } from "src/types/index";

const postApiEndPoints = {
  createRoom: "/rooms",
};

const generatePostApiFunction = (() => {
  const apiFunction = <K extends keyof PostApi>(
    key: K,
    noNeedToken = false,
  ) => {
    return async ({
      pathVariables,
      queryParameters,
      body,
    }: {
      pathVariables?: PostApi[K]["pathVariables"];
      queryParameters?: PostApi[K]["queryParameters"];
      body: CreateRoomFormData;
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
