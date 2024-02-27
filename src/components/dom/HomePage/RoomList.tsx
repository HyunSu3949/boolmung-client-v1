import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import { getAllRoom } from "src/apis/getApis";
import { SpinnerWithText } from "src/components/dom/common/SpinnerWithText";

export function RoomList() {
  const fetchRooms = async ({ pageParam }: { pageParam: number }) => {
    const response = await getAllRoom({ queryParameters: { page: pageParam } });
    return response;
  };
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["roomList"],
    queryFn: fetchRooms,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    refetchInterval: 5000,
  });

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage, inView]);

  return (
    <ul className="w-full h-full space-y-2 overflow-y-auto">
      {data?.pages.map((group) =>
        group.data.map((room) => (
          <li key={room._id} className="w-full">
            <Link
              to={`room/${room._id}`}
              className="flex items-center justify-between w-full p-6 bg-gray-700 rounded-md hover:bg-gray-600"
            >
              <h2 className="mr-5 text-lg text-white">{room.title}</h2>
              <p className="text-gray-300 roomInfo">
                {room.participants.length}/{room.max}
              </p>
            </Link>
          </li>
        )),
      )}

      <SpinnerWithText loading={status === "pending" || isFetchingNextPage}>
        <div className="p-20" ref={ref} />
      </SpinnerWithText>
    </ul>
  );
}
