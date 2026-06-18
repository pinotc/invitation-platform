"use client";

import { useState } from "react";
import { BlockInstance } from "@/types/block";
import { Blocks } from "@/registry/BlockRegistry";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2, Settings, Layout } from "lucide-react";
import { useEffect, useRef } from "react"; // Thêm useRef và useEffect
import { BlockSettingsPanel } from "./BlockSettingPanel"; // Đảm bảo tên file này khớp với file bồ đã tạo

// --- COMPONENT HIỂN THỊ 1 ITEM CÓ THỂ KÉO THẢ TRONG CANVAS ---
const SortableBlockItem = ({ block, isActive, onClick, onRemove }: { block: BlockInstance; isActive: boolean; onClick: () => void; onRemove: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  const blockDef = Blocks[block.type];

  const style = { transform: CSS.Transform.toString(transform), transition };

  if (!blockDef) return null;

  return (
    <div 
      ref={setNodeRef} style={style} 
      className={`relative flex items-center p-3 mb-2 bg-white border rounded-xl shadow-sm transition-all ${isActive ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-200 hover:border-slate-300'}`}
    >
      <div {...attributes} {...listeners} className="p-2 mr-2 cursor-grab text-slate-400 hover:text-slate-600">
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex-1 cursor-pointer" onClick={onClick}>
        <h4 className="text-sm font-bold text-slate-800">{blockDef.meta.title}</h4>
        <p className="text-xs text-slate-500">{blockDef.meta.description}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- MAIN BUILDER COMPONENT ---
interface TemplateBuilderProps {
  initialBlocks: BlockInstance[];
  onChange: (blocks: BlockInstance[]) => void;
}

export const TemplateBuilder = ({ initialBlocks, onChange }: TemplateBuilderProps) => {
  const [blocks, setBlocks] = useState<BlockInstance[]>(initialBlocks);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange(blocks);
  }, [blocks, onChange]);

  // 1. Đưa hàm này vào BÊN TRONG TemplateBuilder để nó đọc được state
  const handleUpdateBlockSettings = (newSettings: any) => {
    if (!activeBlockId) return;
    setBlocks((prev) => prev.map(b => 
      b.id === activeBlockId ? { ...b, settings: newSettings } : b
    ));
  };

  const handleAddBlock = (type: string) => {
    const newBlock: BlockInstance = {
      id: `blk_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type,
      settings: {}
    };
    setBlocks((prev) => [...prev, newBlock]);
    setActiveBlockId(newBlock.id);
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks((prev) => prev.filter(b => b.id !== id));
    if (activeBlockId === id) setActiveBlockId(null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const activeBlock = blocks.find(b => b.id === activeBlockId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
      
      {/* CỘT 1: THƯ VIỆN BLOCK */}
      <div className="lg:col-span-3 space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Layout className="w-4 h-4 text-sky-500" /> Thêm Block
        </h3>
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {Object.values(Blocks).map((def) => (
            <button
              key={def.type}
              type="button"
              onClick={() => handleAddBlock(def.type)}
              className="w-full text-left p-3 bg-white border border-slate-200 rounded-xl hover:border-sky-300 hover:shadow-sm transition group flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-700 group-hover:text-sky-600">{def.meta.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{def.meta.category}</p>
              </div>
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-sky-500" />
            </button>
          ))}
        </div>
      </div>

      {/* CỘT 2: CANVAS KÉO THẢ */}
      <div className="lg:col-span-5 flex flex-col h-[500px]">
        <h3 className="text-sm font-bold text-slate-800 mb-4 px-2">Cấu trúc hiển thị thiệp</h3>
        <div className="flex-1 overflow-y-auto px-2 pb-12">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 text-sm">
                  Chưa có block nào. Hãy thêm từ cột bên trái.
                </div>
              ) : (
                blocks.map((block) => (
                  <SortableBlockItem 
                    key={block.id} 
                    block={block} 
                    isActive={activeBlockId === block.id}
                    onClick={() => setActiveBlockId(block.id)}
                    onRemove={() => handleRemoveBlock(block.id)}
                  />
                ))
              )}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* CỘT 3: SETTINGS BLOCK */}
      <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm h-[500px] overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-slate-500" /> Cấu hình chi tiết
        </h3>
        
        {!activeBlock ? (
          <div className="text-center mt-20 text-slate-400 text-sm italic">
            Chọn một block ở giữa để tùy chỉnh.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Block đang chọn</p>
                <p className="text-sm font-bold text-sky-600 mt-1">{Blocks[activeBlock.type]?.meta.title}</p>
              </div>
              <span className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-mono rounded">
                {activeBlock.type}
              </span>
            </div>
            
            <BlockSettingsPanel 
              activeBlock={activeBlock} 
              onUpdateSettings={handleUpdateBlockSettings} 
            />
          </div>
        )}
      </div>

    </div>
  );
};