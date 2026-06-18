import { BlockDefinition } from "@/types/block";

// Import tạm thời các Component cũ để tái sử dụng 100%
import { HeroSection } from "@/components/invite/sections/HeroSection";
import { CountdownSection } from "@/components/invite/sections/CountdownSection";
import { LocationSection } from "@/components/invite/sections/LocationSection";
import { RsvpSection } from "@/components/invite/sections/RsvpSection";
import { GallerySection } from "@/components/invite/sections/GallerySection";
import { GiftSection } from "@/components/invite/sections/GiftSection";
import { CalendarSection } from "@/components/invite/sections/CalendarSection";
import { StorySection } from "@/components/invite/sections/StorySection";
import { VideoSection } from "@/components/invite/sections/VideoSection";
import { FamilyInfoBlock } from "@/components/invite/sections/FamilyInfoBlock";
import { TimelineBlock } from "@/components/invite/sections/TimelineBlock";
import { GuestbookBlock } from "@/components/invite/sections/GuestbookBlock";

export const Blocks: Record<string, BlockDefinition> = {
  hero: {
    type: "hero",
    meta: { title: "Ảnh bìa (Hero)", description: "Ảnh lớn đầu trang", category: "media" },
    defaultSettings: {},
    Component: HeroSection, 
  },
  story: {
    type: "story",
    meta: { title: "Câu chuyện tình yêu", description: "Đoạn trích dẫn hoặc câu chuyện", category: "content" },
    defaultSettings: {},
    Component: StorySection,
  },
  calendar: {
    type: "calendar",
    meta: { title: "Lịch sự kiện", description: "Lịch đánh dấu ngày cưới", category: "content" },
    defaultSettings: {},
    Component: CalendarSection,
  },
  countdown: {
    type: "countdown",
    meta: { title: "Đếm ngược", description: "Đồng hồ đếm ngược đến sự kiện", category: "content" },
    defaultSettings: {},
    Component: CountdownSection,
  },
  gallery: {
    type: "gallery",
    meta: { title: "Thư viện ảnh", description: "Hiển thị danh sách ảnh", category: "media" },
    defaultSettings: { columns: 2 }, // Ví dụ cấu hình riêng cho block
    Component: GallerySection,
  },
  video: {
    type: "video",
    meta: { title: "Video sự kiện", description: "Phát video từ Youtube/Vimeo", category: "media" },
    defaultSettings: {},
    Component: VideoSection,
  },
  location: {
    type: "location",
    meta: { title: "Bản đồ", description: "Hiển thị vị trí cưới", category: "content" },
    defaultSettings: {},
    Component: LocationSection,
  },
  gift: {
    type: "gift",
    meta: { title: "Hòm mừng cưới", description: "Thông tin ngân hàng và mã QR", category: "action" },
    defaultSettings: {},
    Component: GiftSection,
  },
  rsvp: {
    type: "rsvp",
    meta: { title: "Xác nhận tham dự", description: "Form gửi xác nhận", category: "action" },
    defaultSettings: {},
    Component: RsvpSection,
  },
  family_info: {
    type: "family_info",
    meta: { title: "Thông tin gia đình", description: "Hiển thị nhà trai, nhà gái", category: "content" },
    defaultSettings: { layout: "classic" },
    Component: FamilyInfoBlock,
  },
  timeline: {
    type: "timeline",
    meta: { title: "Lịch trình ngày cưới", description: "Các mốc thời gian trong ngày", category: "content" },
    defaultSettings: {},
    Component: TimelineBlock,
  },
  guestbook: {
    type: "guestbook",
    meta: { title: "Sổ lưu bút", description: "Khách mời để lại lời chúc", category: "action" },
    defaultSettings: {},
    Component: GuestbookBlock,
  },
};

export const getBlock = (type: string): BlockDefinition | undefined => Blocks[type];