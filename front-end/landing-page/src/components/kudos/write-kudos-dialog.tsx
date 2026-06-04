"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { ContentEditor, HashtagField, ImageField, FM } from "./write-kudos-form-fields";
import { useTranslation } from "@/hooks/use-translation";

export interface WriteKudosDialogProps { onClose: () => void; }

const BD = "1px solid #998C5F";
const TP = "#00101A";
const INPUT: React.CSSProperties = {
  ...FM,
  border: BD,
  borderRadius: "8px",
  background: "#FFF",
  padding: "16px 24px",
  fontSize: "16px",
  lineHeight: "24px",
  color: TP,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", flexShrink: 0 }}>
      <span style={{ ...FM, fontSize: "22px", lineHeight: "28px", color: TP }}>{text}</span>
      {required && <span style={{ fontFamily: "Noto Sans JP, sans-serif", fontWeight: 700, fontSize: "16px", color: "#CF1322", lineHeight: "20px" }}>*</span>}
    </div>
  );
}

export default function WriteKudosDialog({ onClose }: WriteKudosDialogProps) {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [nickname, setNickname] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const addHashtag = () => {
    const tag = hashtagInput.trim();
    if (!tag || hashtags.length >= 5) return;
    setHashtags((p) => [...p, tag.startsWith("#") ? tag : `#${tag}`]);
    setHashtagInput("");
  };

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files).slice(0, 5 - images.length).forEach((f) => {
      setImages((p) => [...p, URL.createObjectURL(f)]);
    });
    e.target.value = "";
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.6)" }} />

      {/* Modal */}
      <div role="dialog" aria-modal="true" aria-label={t("kudos.writeDialog.ariaLabel")}
        style={{ position: "fixed", zIndex: 9999, top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "752px", maxHeight: "90vh", overflowY: "auto", background: "rgba(255,248,225,1)", borderRadius: "24px", padding: "40px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Title */}
        <h2 style={{ margin: 0, ...FM, fontSize: "32px", lineHeight: "40px", color: TP, textAlign: "center" }}>
          {t("kudos.writeDialog.heading")}
        </h2>

        {/* Người nhận — dropdown with Figma chevron icon */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
          <FieldLabel text={t("kudos.writeDialog.recipientLabel")} required />
          <div style={{ flex: 1, position: "relative" }}>
            <input type="text" placeholder={t("kudos.writeDialog.recipientPlaceholder")} value={recipient} onChange={(e) => setRecipient(e.target.value)}
              style={{ ...INPUT, paddingRight: "48px" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kudos/icons/chevron-down.svg" alt="" aria-hidden width={24} height={24}
              style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
        </div>

        {/* Danh hiệu */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
            <FieldLabel text={t("kudos.writeDialog.titleLabel")} required />
            <input type="text" placeholder={t("kudos.writeDialog.titlePlaceholder")} value={title} onChange={(e) => setTitle(e.target.value)}
              style={{ ...INPUT, flex: 1 }} />
          </div>
          <p style={{ margin: "8px 0 0 155px", ...FM, fontSize: "16px", lineHeight: "24px", color: "#999", letterSpacing: "0.15px" }}>
            {t("kudos.writeDialog.titleExample")}<br />
            {t("kudos.writeDialog.titleHint")}
          </p>
        </div>

        {/* Rich text editor */}
        <ContentEditor content={content} onChange={setContent} />

        {/* Hashtag */}
        <HashtagField hashtags={hashtags} input={hashtagInput} onInputChange={setHashtagInput} onAdd={addHashtag}
          onRemove={(i) => setHashtags((p) => p.filter((_, idx) => idx !== i))} />

        {/* Image upload */}
        <ImageField images={images} onAdd={() => fileRef.current?.click()}
          onRemove={(i) => setImages((p) => p.filter((_, idx) => idx !== i))} />
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImages} style={{ display: "none" }} />

        {/* Anonymous checkbox — unchecked: border #999 (grey); label: #999 per Figma spec */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
            <button type="button" onClick={() => setAnonymous((v) => !v)}
              style={{ width: "24px", height: "24px", border: anonymous ? BD : "1px solid #999", borderRadius: "4px", background: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px", boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }}>
              {anonymous && <div style={{ width: "16px", height: "16px", borderRadius: "2px", background: "#998C5F" }} />}
            </button>
            <span style={{ ...FM, fontSize: "22px", lineHeight: "28px", color: "#999" }}>{t("kudos.writeDialog.anonymous")}</span>
          </div>
          {anonymous && (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
              <FieldLabel text={t("kudos.writeDialog.nicknameLabel")} required />
              <input type="text" placeholder={t("kudos.writeDialog.nicknamePlaceholder")} value={nickname} onChange={(e) => setNickname(e.target.value)}
                style={{ ...INPUT, flex: 1 }} />
            </div>
          )}
        </div>

        {/* Action buttons — Hủy + Close icon, Gửi 22px + Send icon */}
        <div style={{ display: "flex", flexDirection: "row", gap: "24px", alignItems: "stretch" }}>
          <button type="button" onClick={onClose}
            style={{ border: BD, background: "rgba(255,234,158,0.10)", borderRadius: "4px", padding: "16px 40px", ...FM, fontSize: "16px", color: TP, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
            {t("kudos.writeDialog.cancel")}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kudos/icons/close.svg" alt="" aria-hidden width={24} height={24} />
          </button>
          <button type="button"
            style={{ flex: 1, height: "60px", background: "#FFEA9E", border: "none", borderRadius: "8px", ...FM, fontSize: "22px", lineHeight: "28px", color: TP, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            {t("kudos.writeDialog.send")}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/kudos/icons/send.svg" alt="" aria-hidden width={24} height={24} />
          </button>
        </div>
      </div>
    </>
  );
}
