import { User } from "src/types/index";

type ApiEndpointInfo<P, Q, R> = {
  pathVariables?: P;
  queryParameters?: Q;
  result: R;
};

export type GetApi = {
  getPreSignedurl: ApiEndpointInfo<
    never,
    never,
    { data: { url: string; objectKey: string } }
  >;
};

export type PatchApi = {
  patchUserInfo: ApiEndpointInfo<never, never, { data: { user: User } }>;
};

export type PostApi = {
  createRoom: ApiEndpointInfo<never, never, any>;
};
