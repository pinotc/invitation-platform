import { 
  Playfair_Display, 
  Lora, 
  Montserrat, 
  Be_Vietnam_Pro 
} from 'next/font/google';

// 1. Font Serif (Có chân - Sang trọng, Cổ điển)
export const playfair = Playfair_Display({ 
  subsets: ['vietnamese'], 
  display: 'swap',
});

export const lora = Lora({ 
  subsets: ['vietnamese'], 
  display: 'swap',
});

// 2. Font Sans-serif (Không chân - Hiện đại, Thanh lịch)
export const montserrat = Montserrat({ 
  subsets: ['vietnamese'], 
  display: 'swap',
});

export const beVietnam = Be_Vietnam_Pro({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['vietnamese'], 
  display: 'swap',
});

// Object dùng để map giá trị lưu trong Database ra class CSS của Next.js
export const fontMap: Record<string, string> = {
  'playfair': playfair.className,
  'lora': lora.className,
  'montserrat': montserrat.className,
  'be-vietnam': beVietnam.className,
};

// Mảng data dùng để render ra giao diện chọn (Radio button / Select)
export const fontOptions = [
  { value: 'playfair', label: 'Playfair Display (Sang trọng)' },
  { value: 'lora', label: 'Lora (Cổ điển, mềm mại)' },
  { value: 'montserrat', label: 'Montserrat (Hiện đại, tối giản)' },
  { value: 'be-vietnam', label: 'Be Vietnam (Chuẩn Việt Nam)' },
];