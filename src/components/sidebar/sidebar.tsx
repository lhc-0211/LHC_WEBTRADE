import type { SidebarMode } from "../../types/layout";

interface Props {
  mode: string;
  width: number;
  changeModeSidebar: (mode: SidebarMode) => void;
}

export default function Sidebar(props: Props) {
  const { mode, width } = props;

  return (
    <>
      {mode !== "hidden" && (
        <aside
          style={{
            width,
          }}
        >
          Sidebar
        </aside>
      )}
    </>
  );
}
