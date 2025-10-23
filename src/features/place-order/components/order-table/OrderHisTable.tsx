import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

type Order = {
  time: string;
  side: string;
  symbol: string;
  price: string;
  volume: string;
  total: string;
  status: string;
};

const data: Order[] = [
  {
    time: "10:23:45",
    side: "Mua",
    symbol: "FPT",
    price: "89,000",
    volume: "100",
    total: "8,900,000",
    status: "Chờ khớp",
  },
];

const columns: ColumnDef<Order>[] = [
  {
    header: "LOẠI LỆNH",
    columns: [
      { header: "Thời gian đặt", accessorKey: "time" },
      { header: "Lệnh", accessorKey: "side" },
      { header: "Mã", accessorKey: "symbol" },
    ],
  },
  {
    header: "CHI TIẾT LỆNH",
    columns: [
      { header: "Giá đặt", accessorKey: "price" },
      { header: "KL đặt", accessorKey: "volume" },
      { header: "Giá trị đặt (₫)", accessorKey: "total" },
      { header: "Trạng thái", accessorKey: "status" },
    ],
  },
  {
    header: "THAO TÁC",
    columns: [
      {
        header: "Thao tác",
        id: "action",
        cell: ({ row }) => {
          const order = row.original;
          const canEdit = order.status === "Chờ khớp";
          const canCancel = order.status !== "Đã khớp";

          return (
            <div className="flex items-center justify-center gap-4">
              {canEdit && (
                <button
                  onClick={() => console.log("Sửa:", order)}
                  className="text-text-title hover:text-text-subtitle"
                  title="Sửa lệnh"
                >
                  <FaPen size={14} />
                </button>
              )}
              {canCancel && (
                <button
                  onClick={() => console.log("Hủy:", order)}
                  className="text-red-400 hover:text-red-300"
                  title="Hủy lệnh"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          );
        },
      },
    ],
  },
];

function OrderHisTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full h-[448px] overflow-auto rounded-md text-text-title text-xs">
      <table className="w-full border-collapse">
        <thead>
          {/* --- Hàng đầu: nhóm header --- */}
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr
              key={headerGroup.id}
              className={index === 0 ? "mb-[10px]" : "h-10 "}
            >
              {headerGroup.headers.map((header) => {
                const headerText = String(header.column.columnDef.header);
                const groupClass =
                  headerText === "LOẠI LỆNH"
                    ? "bg-surface text-text-title text-[10px] font-medium rounded-md h-[22px]"
                    : headerText === "CHI TIẾT LỆNH"
                    ? "bg-surface text-text-title text-[10px] font-medium rounded-md h-[22px]"
                    : headerText === "THAO TÁC"
                    ? "bg-surface text-text-title text-[10px] font-medium rounded-md h-[22px]"
                    : "";

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={`border-none px-2 py-1 text-center`}
                  >
                    <div
                      className={`${groupClass} flex items-center justify-center`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className=" hover:bg-surface">
              {row.getVisibleCells().map((cell) => {
                const accessorKey = (
                  cell.column.columnDef as { accessorKey?: keyof Order }
                )?.accessorKey;
                const value = cell.getValue();

                let customClass = "";

                switch (accessorKey) {
                  case "side":
                    customClass =
                      value === "MUA"
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold";
                    break;

                  case "status":
                    customClass =
                      value === "Chờ khớp"
                        ? "text-yellow-400 font-semibold"
                        : "text-red-400 font-semibold";
                    break;

                  default:
                    break;
                }

                return (
                  <td
                    key={cell.id}
                    className={`px-2 h-9 text-center ${customClass}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(OrderHisTable);
