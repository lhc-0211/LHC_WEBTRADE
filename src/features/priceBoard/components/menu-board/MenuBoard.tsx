import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PRICE_BOARD_MENU } from "../../../../configs/priceBoardMenu";

export default function MenuBoard({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const [hoverGroup, setHoverGroup] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-1">
      {PRICE_BOARD_MENU.map((group) => {
        const { key, label, items } = group;
        const isHovered = hoverGroup === key;

        // Nếu chỉ có 1 item => hiển thị luôn nút đó
        if (items.length === 1) {
          const item = items[0];
          return (
            <button
              key={item.id}
              className={`px-2 py-1 rounded-[26px] text-text-title text-sm flex items-center ${
                active === item.id ? "bg-DTND-500 " : ""
              }`}
              onClick={() => onChange(item.id)}
            >
              {item.name}
            </button>
          );
        }

        // Nếu có >= 2 item => hiển thị popup khi hover
        return (
          <div
            key={key}
            className="relative"
            onMouseEnter={() => setHoverGroup(key)}
            onMouseLeave={() => setHoverGroup(null)}
          >
            {(() => {
              const activeItem = items.find((item) => item.id === active);
              const displayName = activeItem ? activeItem.name : label;

              return (
                <button
                  className={`px-3 py-1 rounded text-sm flex items-center gap-1  ${
                    activeItem ? "rounded-[46px] bg-DTND-500" : ""
                  }`}
                >
                  {displayName}
                  <IoIosArrowDown />
                </button>
              );
            })()}

            {isHovered && (
              <div className="absolute top-full left-0 px-2 pb-2 bg-dark-blue rounded-xl shadow-lg z-50 min-w-[180px] animate-fadeInDown">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 cursor-pointer rounded-lg mt-2 text-sm ${
                      active === item.id
                        ? "bg-DTND-500"
                        : "hover:bg-DTND-500 hover:translate-x-[2px]"
                    }`}
                    onClick={() => {
                      onChange(item.id);
                      setHoverGroup(null);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
