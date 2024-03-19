import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { SpinnerWithComponent } from "src/components/common/SpinnerWithComponent";
import RoomItem from "src/components/room/RoomItem";
import useRoomListInfiniteQuery from "src/hooks/react-query/useRoomListInfiniteQuery";

export function RoomList() {
  const { ref, inView } = useInView();
  const {
    data: roomList,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useRoomListInfiniteQuery();

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <ul className="h-full w-full space-y-2 overflow-y-auto">
      {roomList?.pages.map((group) =>
        group.data.map((room) => <RoomItem item={room} key={room._id} />),
      )}
      <SpinnerWithComponent loading={isFetchingNextPage}>
        <div className="p-20" ref={ref} />
      </SpinnerWithComponent>
    </ul>
  );
}
