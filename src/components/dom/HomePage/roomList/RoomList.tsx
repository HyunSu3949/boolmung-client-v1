import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { RoomInfo } from "src/types/index";
import { getAllRoom } from "src/apis/room/getAllRoom";

export function RoomList() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["roomList"],
    queryFn: async () => {
      const response = await getAllRoom();
      return response.data.data.data;
    },
  });

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러남</div>;

  return (
    <div className="flex w-full">
      <ul className="flex w-full">
        {data.map((room: RoomInfo) => (
          <li key={room._id} className="w-full">
            <Link
              to={`room/${room._id}`}
              className="flex justify-between w-full"
            >
              <h2 className="mr-5">{room.title}</h2>
              <p className="roomInfo">
                {room.participants.length}/{room.max}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
