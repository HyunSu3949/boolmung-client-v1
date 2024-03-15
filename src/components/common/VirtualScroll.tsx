import React, { useEffect, useRef } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from "react-virtualized";

type Props<T> = {
  list: T[];
  ItemComponent: React.ComponentType<{ item: T }>;
};

export function VirtualScroll<T>({ list, ItemComponent }: Props<T>) {
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToRow(list.length - 1);
    }
  }, [list.length]);

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 72,
  });

  function rowRenderer({ index, key, parent, style }: any) {
    const item = list[index];

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
            <ItemComponent item={item} />
          </div>
        )}
      </CellMeasurer>
    );
  }

  return (
    <div className="h-full w-full rounded-lg bg-gray-800 p-4">
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            width={width}
            height={height}
            rowCount={list.length}
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
