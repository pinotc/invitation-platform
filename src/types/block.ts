import { EventData, TemplateConfig } from "./invitation";

export type BlockType =
  | "hero"
  | "story"
  | "calendar"
  | "countdown"
  | "gallery"
  | "video"
  | "gift"
  | "location"
  | "rsvp"
  | string;

export interface BlockSettings {
  [key: string]: any;
}

// Cấu trúc dữ liệu của 1 Block lưu trong Database
export interface BlockInstance {
  id: string;
  type: BlockType;
  settings?: BlockSettings;
}

// Props truyền xuống cho mỗi Block khi Render
export interface BlockProps {
  data: EventData; // Dữ liệu chung (Tên, Ngày...)
  theme: string;
  config: TemplateConfig; 
  invitationId: string;
  images?: any[];
  settings?: BlockSettings; // Cấu hình riêng của Block đó
}

// Cấu trúc định nghĩa 1 Block trong Registry
export interface BlockDefinition {
  type: BlockType;
  meta: {
    title: string;
    description: string;
    category: "header" | "content" | "media" | "action";
  };
  defaultSettings: BlockSettings;
  Component: React.FC<BlockProps>;
}