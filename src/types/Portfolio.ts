
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

export type BlockType = "text" | "textarea" | "tags" | "multi-text" | "quote" | "image" | "link-list"

export type SectionBlock = {
  type: BlockType;
  content: string | string[] | SectionField[];
};

export type CustomSection = {
  stylePreset?: SectionStylePreset;
  textAlign: CanvasTextAlign;
  textColor: string;
  bgColor: string;
  label: string;
  anchor?: string;
  showInNavbar?: boolean; 
  blocks: SectionBlock[];
};

export type Portfolio = {
  name: string;
  title: string;
  template?: string;
  sections: CustomSection[];
};

export type SectionStylePreset = "plain" | "card" | "highlight";