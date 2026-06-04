"use client";

import { useTranslation } from "@/hooks/use-translation";

// SecretBoxDialog: placeholder modal for "Mở Secret Box" CTA.
// Per clarification: placeholder only — "Tính năng mở quà sẽ sớm ra mắt."

interface SecretBoxDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SecretBoxDialog({ open, onClose }: SecretBoxDialogProps) {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secret Box"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#00070C",
          border: "1px solid #998C5F",
          borderRadius: "17px",
          padding: "40px 48px",
          maxWidth: "480px",
          width: "90%",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          style={{
            margin: 0,
            fontSize: "20px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            color: "#FFEA9E",
            lineHeight: "32px",
          }}
        >
          {t("kudos.secretBox.comingSoon")}
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: "24px",
            padding: "12px 32px",
            background: "#FFEA9E",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontWeight: 700,
            color: "#00101A",
            cursor: "pointer",
          }}
        >
          {t("kudos.secretBox.close")}
        </button>
      </div>
    </div>
  );
}
