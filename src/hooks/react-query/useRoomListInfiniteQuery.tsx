import { useInfiniteQuery } from "@tanstack/react-query";

import { getAllRoom } from "src/utils/apis/getApis";

export default function useRoomListInfiniteQuery() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["roomList"],
      queryFn: async ({ pageParam }: { pageParam: number }) => {
        const response = await getAllRoom({
          queryParameters: { page: pageParam },
        });
        return response;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : undefined,
      refetchInterval: 3000,
      throwOnError: true,
    });

  return {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
