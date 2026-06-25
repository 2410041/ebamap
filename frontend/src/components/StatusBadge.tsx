import type { InventoryStatus } from "../types";

export function StatusBadge({ status }: { status: InventoryStatus }) {
  const toneClass =
    status === "在庫あり"
      ? "in-stock"
      : status === "残りわずか"
        ? "few-left"
        : status === "在庫なし"
          ? "out-of-stock"
          : "checking";

  return <span className={`status-badge ${toneClass}`}>{status}</span>;
}
