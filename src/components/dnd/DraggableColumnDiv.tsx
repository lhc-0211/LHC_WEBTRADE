import { useRef, type ReactNode } from "react";
import { useDrag, useDrop, type DropTargetMonitor } from "react-dnd";

export const DRAG_TYPE = "COLUMN_DIV";

export interface Column {
  key: string;
  label: string;
  default?: boolean;
  width?: number;
  children?: Column[];
}

interface DragItem {
  index: number;
  type: string;
}

interface DraggableColumnDivProps {
  col: Column;
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  children?: ReactNode;
}

export default function DraggableColumnDiv({
  col,
  index,
  moveColumn,
  children, // <---- nhận children
}: DraggableColumnDivProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop<DragItem>({
    accept: DRAG_TYPE,

    hover(item, monitor: DropTargetMonitor<DragItem, unknown>) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverRect.right - hoverRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientX = clientOffset.x - hoverRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return;

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="h-[56px] flex-1 grid place-items-center text-text-body text-xs font-medium select-none bg-DTND-1000 "
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
      }}
    >
      {children ?? col.label} {/* nếu không có children thì render col.label */}
    </div>
  );
}
