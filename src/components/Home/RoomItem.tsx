import { Link } from "react-router-dom";

import { RoomInfo } from "src/types/index";

type Props = {
  item: RoomInfo;
};

export default function RoomItem({ item }: Props) {
  const { _id, title, max, participants } = item;
  return (
    <div>
      <li key={_id} className="w-full">
        <Link
          to={`room/${_id}`}
          className="flex w-full items-center justify-between rounded-md bg-gray-700 p-6 hover:bg-gray-600"
        >
          <h2 className="mr-5 text-lg text-white">{title}</h2>
          <p className="roomInfo text-gray-300">
            {participants.length}/{max}
          </p>
        </Link>
      </li>
    </div>
  );
}
