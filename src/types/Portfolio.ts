
export type Template =
  | "clean"
  | "bold"
  | "minimal"
  | "classic"
  | "modern"
  | "terminal"
  | "soft";

export type NavbarItem = {
  label: string;
  anchor: string;
};

export type SectionField = {
  label: string;
  value: string;
};

export type BlockType =
  | "text"
  | "textarea"
  | "tags"
  | "multi-text"
  | "quote"
  | "image"
  | "link-list"
  | "skills";

export type SectionBlock = {
  type: BlockType;
  content: string | string[] | SectionField[];
};

export type SectionStylePreset = "plain" | "card" | "highlight";

export type CustomSection = {
  label: string;
  anchor?: string;
  showInNavbar?: boolean;
  blocks: SectionBlock[];
  bgColor?: string;
  textColor?: string;
  textAlign?: "left" | "center" | "right";
  stylePreset?: SectionStylePreset;
};

export type Portfolio = {
  id?: string;
  userId: string;
  name: string;
  title: string;
  template?: string;
  publicId?: string;
  sections: CustomSection[];
  createdAt?: Date;
  updatedAt?: Date;
};
