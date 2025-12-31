import GitHubIcon from "./GitHubIcon.astro";
import LinkedInIcon from "./LinkedInIcon.astro";
import XIcon from "./XIcon.astro";
import YouTubeIcon from "./YouTubeIcon.astro";
import MailIcon from "./MailIcon.astro";

export const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  mail: MailIcon,
} as const;

export type SocialIconKey = keyof typeof socialIcons;
