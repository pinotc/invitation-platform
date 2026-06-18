import { BlockInstance } from "./block";

export interface TemplateConfig {
  theme: string;
  openingAnimation?: string;
  sections: (string | BlockInstance)[]; 
  styles?: {
    primaryColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
    backgroundImage?: string;
  };
  effects?: {
    backgroundEffect?: "hearts" | "snow" | "none";
  };
}

export interface EventData {
  eventName: string;
  brideName?: string;
  groomName?: string;
  eventDate: string;
  eventTime?: string;
  location: string;
  googleMapsUrl?: string;
  hostName?: string;
  bankAccount?: string;
  bankId?: string;
  bankName?: string;
  storyText?: string;
  videoUrl?: string;
  groomFatherName?: string;
  groomMotherName?: string;
  groomAddress?: string;
  brideFatherName?: string;
  brideMotherName?: string;
  brideAddress?: string;
}

// Bổ sung interface này để fix triệt để lỗi báo đỏ ở các Section con
export interface SectionProps {
  data: EventData;
  theme: string;
  config: TemplateConfig;
  invitationId: string;
  images?: {
    id: string;
    url: string;
    publicId: string;
    type: string;
  }[];
  settings?: any; 
  }