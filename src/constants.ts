interface LinkDefinition {
  name: string;
  link: string;
  alt: string;
}

export const LINK_DEFINITIONS: Record<string, LinkDefinition> = {
  about: {
    name: "about",
    link: "#about",
    alt: "about me",
  },
  portfolio: {
    name: "portfolio",
    link: "#portfolio",
    alt: "portfolio",
  },
  blog: {
    name: "blog",
    link: "#blog",
    alt: "blog Profile",
  },
  twitter: {
    name: "twitter",
    link: "https://x.com/ljunit25",
    alt: "My X Profile",
  },
  github: {
    name: "github",
    link: "https://github.com/loflodev",
    alt: "My Github Profile",
  },
  linkedin: {
    name: "linkedin",
    link: "https://www.linkedin.com/in/ljunit25/",
    alt: "My LinkedIn Profile",
  },
  instagram: {
    name: "instagram",
    link: "https://www.instagram.com/louis_thereborn/",
    alt: "My Instagram Profile",
  },
  facebook: {
    name: "facebook",
    link: "https://www.instagram.com/louis_thereborn/",
    alt: "My Facebook Profile",
  },
};
