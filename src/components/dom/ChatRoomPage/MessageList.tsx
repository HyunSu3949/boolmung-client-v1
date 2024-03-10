import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from "react-virtualized";

import Message from "src/components/dom/ChatRoomPage/Message";
import { RootState } from "src/redux/store";

export function MessageList() {
  const messageList = useSelector(
    (state: RootState) => state.reducer.socketReducer.messageList,
  );
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToRow(messageList.length - 1);
    }
  }, [messageList.length]);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 72,
  });

  function rowRenderer({ index, key, parent, style }: any) {
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {() => (
          <div style={style}>
            <Message message={messageList[index]} />
          </div>
        )}
      </CellMeasurer>
    );
  }

  return (
    <div className="w-full h-full p-4 bg-gray-800 rounded-lg">
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            width={width}
            height={height}
            rowCount={messageList.length}
            rowHeight={cache.rowHeight}
            // eslint-disable-next-line react/jsx-no-bind
            rowRenderer={rowRenderer}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </div>
  );
}
