import React, { useEffect, useState } from "react";

import { getAllRoom } from "src/apis/room/getAllRoom";

export default function useRoomList() {
  const [list, setList] = useState();
  console.log("hookMount");

  useEffect(() => {
    const fetchList = async () => {
      const res = await getAllRoom();
      setList(res.data.data);
    };
    fetchList();
    console.log("hook Effect Mount");
  }, []);

  return { list };
}
