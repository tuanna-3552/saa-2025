"use client";

import React from "react";

const FONT: React.CSSProperties = { fontFamily: "var(--font-montserrat)" };

const SELECT_STYLE: React.CSSProperties = {
  backgroundColor: "var(--details-container)",
  color: "rgba(255,255,255,0.7)",
  border: "1px solid var(--details-divider)",
  ...FONT,
  outline: "none",
  appearance: "none" as const,
};

const LABEL_STYLE: React.CSSProperties = {
  color: "rgba(255,255,255,0.55)",
  fontSize: "12px",
  fontWeight: 500,
  ...FONT,
};

const LEVEL_OPTIONS = ["Level 1", "Level 2", "Level 3"];

export interface UsersFilterBarProps {
  departments: string[];
  deptFilter: string;
  levelFilter: string;
  roleFilter: string;
  search: string;
  onDeptChange: (v: string) => void;
  onLevelChange: (v: string) => void;
  onRoleChange: (v: string) => void;
  onSearchChange: (v: string) => void;
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span style={LABEL_STYLE}>{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-full rounded-lg px-3 pr-8 text-sm"
          style={SELECT_STYLE}
        >
          {children}
        </select>
        <svg
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "rgba(255,255,255,0.4)" }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

export function UsersFilterBar({
  departments,
  deptFilter,
  levelFilter,
  roleFilter,
  search,
  onDeptChange,
  onLevelChange,
  onRoleChange,
  onSearchChange,
}: UsersFilterBarProps) {
  return (
    <div className="flex items-end gap-3">
      {/* Department */}
      <SelectField label="Department" value={deptFilter} onChange={onDeptChange}>
        <option value="">Chọn phòng ban</option>
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </SelectField>

      {/* Level — static options (not in DB schema, UI-only filter) */}
      <SelectField label="Level" value={levelFilter} onChange={onLevelChange}>
        <option value="">Chọn level</option>
        {LEVEL_OPTIONS.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </SelectField>

      {/* Role */}
      <SelectField label="Role" value={roleFilter} onChange={onRoleChange}>
        <option value="">Chọn Role</option>
        <option value="admin">Admin</option>
        <option value="employee">User</option>
      </SelectField>

      {/* Search */}
      <div className="relative ml-auto w-60">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm..."
          className="h-9 w-full rounded-lg px-3 pr-9 text-sm"
          style={SELECT_STYLE}
        />
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "rgba(255,255,255,0.4)" }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
    </div>
  );
}
