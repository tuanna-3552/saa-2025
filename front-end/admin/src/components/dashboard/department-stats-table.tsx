"use client";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

export interface DepartmentStat {
  id: string;
  name: string;
  totalMember: number;
  totalSentKudos: number;
  totalReceivedKudos: number;
  totalUserWithKudos: number;
  totalReceivedSecretBox: number;
}

interface Column {
  key: string;
  label: string;
  width: string;
}

function getCellValue(col: Column, row: DepartmentStat, index: number): string | number {
  switch (col.key) {
    case "no":
      return index + 1;
    case "unit":
      return row.name;
    case "totalMember":
      return row.totalMember;
    case "totalSentKudos":
      return row.totalSentKudos;
    case "totalReceivedKudos":
      return row.totalReceivedKudos;
    case "totalUserWithKudos":
      return row.totalUserWithKudos;
    case "totalReceivedSecretBox":
      return row.totalReceivedSecretBox;
    default:
      return "";
  }
}

interface DepartmentStatsTableProps {
  stats: DepartmentStat[];
  loading?: boolean;
}

export function DepartmentStatsTable({
  stats,
  loading,
}: DepartmentStatsTableProps) {
  const { t } = useTranslation();

  const columns: Column[] = [
    { key: "no",                    label: t("dashboard.table.no"),                    width: "w-[60px]" },
    { key: "unit",                  label: t("dashboard.table.unit"),                  width: "flex-1 min-w-[140px]" },
    { key: "totalMember",           label: t("dashboard.table.totalMember"),           width: "w-[140px]" },
    { key: "totalSentKudos",        label: t("dashboard.table.totalSentKudos"),        width: "w-[160px]" },
    { key: "totalReceivedKudos",    label: t("dashboard.table.totalReceivedKudos"),    width: "w-[180px]" },
    { key: "totalUserWithKudos",    label: t("dashboard.table.totalUserWithKudos"),    width: "w-[220px]" },
    { key: "totalReceivedSecretBox", label: t("dashboard.table.totalReceivedSecretBox"), width: "w-[200px]" },
  ];

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-white/60 font-[var(--font-montserrat)] text-sm">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max">
        {/* Header row */}
        <div
          className="flex items-center"
          style={{ backgroundColor: "var(--details-container)" }}
        >
          {columns.map((col) => (
            <div
              key={col.key}
              className={cn(
                "flex h-12 shrink-0 items-center border-b px-3",
                "font-[var(--font-montserrat)] font-medium text-sm tracking-[0.1px] text-white",
                col.width
              )}
              style={{ borderColor: "var(--details-divider)" }}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {stats.map((row, index) => {
          const isEven = index % 2 === 0;
          const rowBg = isEven
            ? "var(--details-container-2)"
            : "var(--details-container)";

          return (
            <div
              key={row.id}
              className="flex items-center"
              style={{ backgroundColor: rowBg }}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={cn(
                    "flex h-12 shrink-0 items-center border-b px-3",
                    "font-[var(--font-montserrat)] font-normal text-sm tracking-[0.25px] text-white",
                    col.width
                  )}
                  style={{ borderColor: "var(--details-divider)" }}
                >
                  {getCellValue(col, row, index)}
                </div>
              ))}
            </div>
          );
        })}

        {stats.length === 0 && (
          <div
            className="flex h-12 items-center justify-center text-sm text-white/60 font-[var(--font-montserrat)]"
            style={{ backgroundColor: "var(--details-container-2)" }}
          >
            {t("dashboard.table.noData")}
          </div>
        )}
      </div>
    </div>
  );
}
