"use client";
import { useState } from "react";
import { 
  DndContext, closestCenter, closestCorners 
} from "@dnd-kit/core";
import { 
  arrayMove, SortableContext, useSortable, rectSortingStrategy 
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import Image from "next/image";
import { updateImageOrder, deleteImage } from "@/app/actions/image";

// Component cho từng tấm ảnh có thể kéo thả
const SortableImage = ({ image, onDelete }: { image: any, onDelete: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group w-full aspect-square rounded-lg overflow-hidden border border-slate-200">
      <Image src={image.url} alt="Gallery" fill className="object-cover" />
      {/* Nút xóa */}
      <button 
        onClick={() => onDelete(image.id)}
        className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      {/* Nút nắm kéo */}
      <div {...attributes} {...listeners} className="absolute top-1 left-1 p-1.5 bg-black/50 text-white rounded cursor-grab">
        <GripVertical className="w-4 h-4" />
      </div>
    </div>
  );
};

export const GalleryManager = ({ initialImages }: { initialImages: any[] }) => {
  const [images, setImages] = useState(initialImages);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      const newOrder = arrayMove(images, oldIndex, newIndex);
      
      setImages(newOrder);
      // Gọi server action để lưu thứ tự mới
      await updateImageOrder(newOrder.map((img: any) => img.id));
    }
  };

  const handleDelete = async (id: string) => {
    await deleteImage(id);
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        <SortableContext items={images} strategy={rectSortingStrategy}>
          {images.map((img) => (
            <SortableImage key={img.id} image={img} onDelete={handleDelete} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};