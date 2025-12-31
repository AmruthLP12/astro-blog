import type { SocialIconKey } from "@/components/icons";

export const socials: {
  name: string;
  href: string;
  aria: string;
  icon: SocialIconKey;
}[] = [
  {
    name: "GitHub",
    href: "https://github.com/AmruthLP12",
    aria: "GitHub",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/amruthlp",
    aria: "LinkedIn",
    icon: "linkedin",
  },
  {
    name: "X",
    href: "https://x.com/AmruthLP12",
    aria: "X (Twitter)",
    icon: "x",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@CodeWithAmruth",
    aria: "YouTube",
    icon: "youtube",
  },
  {
    name: "Email",
    href: "mailto:amruthlp12@gmail.com",
    aria: "Email",
    icon: "mail",
  },
];
