import { useCallback, useState } from "react";
import DndProviderWrapper from "../../../../components/dnd/DndProviderWrapper";
import DraggableColumnDiv, {
  type Column,
} from "../../../../components/dnd/DraggableColumnDiv";
import { ALL_COLUMNS } from "../../../../configs/headerPriceBoard";

export default function HeaderColumns() {
  const [columns, setColumns] = useState<Column[]>(() => {
    const saved = localStorage.getItem("clientConfig");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ALL_COLUMNS;
      }
    }
    return ALL_COLUMNS;
  });

  const moveColumn = useCallback(
    (from: number, to: number) => {
      const updated = [...columns];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      setColumns(updated);
    },
    [columns]
  );

  return (
    <DndProviderWrapper>
      <div className="flex border border-background-primary divide-x divide-background-primary w-full">
        {columns.map((col, index) => {
          const content = (
            <div className="flex flex-col w-full">
              {/* Dòng 1: cột cha */}
              <div
                className={`flex items-center justify-center ${
                  col.children ? "border-b border-background-primary" : ""
                } ${col.children ? "h-7" : "h-14"}`}
                style={{ minWidth: col.width }}
              >
                {col.label}
              </div>

              {/* Dòng 2: cột con */}
              {col.children && (
                <div className="flex divide-x divide-background-primary ">
                  {col.children.map((child) => (
                    <div
                      key={child.key}
                      className={`flex-1 text-center h-7 grid place-items-center`}
                      style={{ minWidth: child.width }}
                    >
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

          // Cột không draggable: mark, symbol
          if (col.key === "mark" || col.key === "symbol") {
            return (
              <div
                key={col.key}
                className={`h-[56px] grid place-items-center text-text-body text-xs font-medium select-none bg-DTND-1000`}
                style={{ minWidth: col.width }}
              >
                {content}
              </div>
            );
          }

          // Cột draggable
          return (
            <DraggableColumnDiv
              key={col.key}
              col={col}
              index={index}
              moveColumn={moveColumn}
            >
              {content}
            </DraggableColumnDiv>
          );
        })}
      </div>
    </DndProviderWrapper>
  );
}
