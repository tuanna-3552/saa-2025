export interface AwardItem {
  id: string;
  /** Key used to look up description/unit/valueNote in awardSystem.awards.* locale */
  awardKey: string;
  label: string;
  qty: string;
  value: string;
  /** Award name image overlay (from /home/award-*-name.png). Combined with award-bg.png. */
  nameImage: string;
  nameImageWidth: number;
  nameImageHeight: number;
}

export const AWARDS: AwardItem[] = [
  {
    id: "top-talent",
    awardKey: "topTalent",
    label: "Top Talent",
    qty: "10",
    value: "7.000.000 VNĐ",
    nameImage: "/home/award-top-talent-name.png",
    nameImageWidth: 221,
    nameImageHeight: 35,
  },
  {
    id: "top-project",
    awardKey: "topProject",
    label: "Top Project",
    qty: "02",
    value: "15.000.000 VNĐ",
    nameImage: "/home/award-top-project-name.png",
    nameImageWidth: 232,
    nameImageHeight: 35,
  },
  {
    id: "top-project-leader",
    awardKey: "topProjectLeader",
    label: "Top Project Leader",
    qty: "03",
    value: "7.000.000 VNĐ",
    nameImage: "/home/award-top-project-leader-name.png",
    nameImageWidth: 232,
    nameImageHeight: 64,
  },
  {
    id: "best-manager",
    awardKey: "bestManager",
    label: "Best Manager",
    qty: "01",
    value: "10.000.000 VNĐ",
    nameImage: "/home/award-best-manager-name.png",
    nameImageWidth: 232,
    nameImageHeight: 30,
  },
  {
    id: "signature-creator",
    awardKey: "signatureCreator",
    label: "Signature 2025 - Creator",
    qty: "01",
    value: "5.000.000 VNĐ",
    nameImage: "/home/award-signature-creator-name.png",
    nameImageWidth: 232,
    nameImageHeight: 54,
  },
  {
    id: "mvp",
    awardKey: "mvp",
    label: "MVP (Most Valuable Person)",
    qty: "01",
    value: "15.000.000 VNĐ",
    nameImage: "/home/award-mvp-name.png",
    nameImageWidth: 116,
    nameImageHeight: 52,
  },
];
