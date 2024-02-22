import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { RoomInfo } from "src/types/index";
import { getAllRoom } from "src/apis/room/getAllRoom";

export function RoomList() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["roomList"],
    queryFn: async () => {
      const response = await getAllRoom();
      return response.data.data.data;
    },
  });

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러남</div>;

  return (
    <div className="flex w-full bg-gray-800 p-4">
      <ul className="flex w-full flex-col space-y-2">
        {data.map((room: RoomInfo) => (
          <li key={room._id} className="w-full">
            <Link
              to={`room/${room._id}`}
              className="flex w-full items-center justify-between rounded-md bg-gray-700 p-6 hover:bg-gray-600"
            >
              <h2 className="mr-5 text-lg text-white">{room.title}</h2>
              <p className="roomInfo text-gray-300">
                {room.participants.length}/{room.max}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
