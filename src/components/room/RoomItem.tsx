import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { openModal } from "src/redux/features/modalSlice";
import { RoomInfo } from "src/types/index";

type Props = {
  item: RoomInfo;
};

export default function RoomItem({ item }: Props) {
  const { _id, title, max, participants } = item;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (participants.length < max) {
      navigate(`/room/${_id}`);
    } else {
      dispatch(
        openModal({
          componentId: "confirmModal",
          props: { message: "인원이 가득 찼습니다." },
        }),
      );
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center justify-between rounded-md bg-gray-700 p-6 hover:bg-gray-600"
    >
      <li key={_id} className="flex w-full items-start justify-between">
        <p className="mr-5 w-4/5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg text-white">
          {title}
        </p>
        <p className="roomInfo w-1/5 text-center text-gray-300">
          {participants.length}/{max}
        </p>
      </li>
    </div>
  );
}
