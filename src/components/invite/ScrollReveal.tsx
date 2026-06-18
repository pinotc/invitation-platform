"use client";

import { useEffect, useRef, useState } from "react";

export const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationDone, setAnimationDone] = useState(false); // Thêm trạng thái kiểm soát khi chạy xong hoạt ảnh

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Chỉ chạy hiệu ứng một lần duy nhất
          
          // Sau khi kết thúc hiệu ứng trượt (độ dài duration-1000 là 1s)
          // Đợi thêm 50ms rồi giải phóng hoàn toàn thuộc tính transform/filter
          setTimeout(() => {
            setAnimationDone(true);
          }, 1050);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Nếu hoạt ảnh đã chạy xong, trả về class tĩnh sạch sẽ để cứu vớt position: fixed cho Popup QR
  const appliedClass = animationDone
    ? "opacity-100 w-full"
    : `transition-all duration-1000 transform ease-out w-full ${
        isVisible ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-12 filter blur-sm"
      }`;

  return (
    <div ref={ref} className={appliedClass}>
      {children}
    </div>
  );
};