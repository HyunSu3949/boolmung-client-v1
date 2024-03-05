import { RoomInfo, SignUpFormData, User } from "src/types/index";

type ApiEndpointInfo<P, Q, R> = {
  pathVariables?: P;
  queryParameters?: Q;
  result: R;
};
type PostApiEndpointInfo<B, P, Q, R> = {
  body: B;
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
  getAllRoom: ApiEndpointInfo<
    never,
    { page: number; sortby?: any },
    {
      status: string;
      length: number;
      total: number;
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
      nextPage: number;
      data: {
        _id: number;
        max: number;
        title: string;
        owner: any;
        createdAt: Date;
        participants: {
          user: any;
          joinedAt: Date;
        }[];
        password?: string | undefined;
      }[];
    }
  >;
  joinRoom: ApiEndpointInfo<
    { roomid: string },
    never,
    { status: string; data: RoomInfo }
  >;
  logout: ApiEndpointInfo<never, never, { status: string }>;
};

export type PatchApi = {
  patchUserInfo: ApiEndpointInfo<never, never, { data: { user: User } }>;
};

export type PostApi = {
  createRoom: PostApiEndpointInfo<any, never, never, any>;
  login: PostApiEndpointInfo<
    { email: string; password: string },
    never,
    never,
    {
      status: string;
      token: string;
      data: any;
    }
  >;
  signup: PostApiEndpointInfo<
    SignUpFormData,
    never,
    never,
    {
      status: string;
      token: string;
      data: any;
    }
  >;
};
