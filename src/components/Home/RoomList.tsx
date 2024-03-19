import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { getAllRoom } from "src/utils/apis/getApis";
import { SpinnerWithComponent } from "src/components/common/SpinnerWithComponent";
import RoomItem from "src/components/Home/RoomItem";
import RetryErrorBoundary from "src/components/Error/RetryErrorBoundary";

export function RoomList() {
  const { ref, inView } = useInView();
  const {
    data: roomList,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
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
    refetchInterval: 5000,
  });

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <RetryErrorBoundary>
      <ul className="h-full w-full space-y-2 overflow-y-auto">
        {roomList?.pages.map((group) =>
          group.data.map((room) => <RoomItem item={room} key={room._id} />),
        )}
        <SpinnerWithComponent loading={isFetchingNextPage}>
          <div className="p-20" ref={ref} />
        </SpinnerWithComponent>
      </ul>
    </RetryErrorBoundary>
  );
}
