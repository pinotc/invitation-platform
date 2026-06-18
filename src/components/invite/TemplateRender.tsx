import { TemplateConfig, EventData } from "@/types/invitation";
import { BlockInstance } from "@/types/block";
import { getBlock } from "@/registry/BlockRegistry";
import { BackgroundEffects } from "./BackgroundEffects"; 
import { ScrollReveal } from "./ScrollReveal"; 

interface TemplateRendererProps {
  config: TemplateConfig;
  data: EventData;
  invitationId: string; 
  images?: any[]; 
}

export const TemplateRenderer = ({ config, data, invitationId, images }: TemplateRendererProps) => {

  // Logic chuyển đổi từ định dạng cũ sang định dạng Block mới
  const normalizeBlocks = (sections: any[]): BlockInstance[] => {
    if (!sections || sections.length === 0) return [];
    
    if (typeof sections[0] === "string") {
      return sections.map((type, index) => ({
        id: `blk_legacy_${type}_${index}`,
        type: type as string,
        settings: {}
      }));
    }
    return sections as BlockInstance[];
  };

  const activeBlocks = normalizeBlocks(config.sections);
  const activeEffect = (config as any).effects?.backgroundEffect || "none";
  const styles = config.styles || {};

  return (
    <div 
      className={`theme-${config.theme} w-full max-w-md mx-auto min-h-screen shadow-2xl overflow-x-hidden relative`}
      style={{ 
        '--primary-color': styles.primaryColor || '#8B0000',
        backgroundColor: styles.backgroundColor || '#FFFFFF',
        backgroundImage: styles.backgroundImage ? `url('${styles.backgroundImage}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: styles.fontFamily || 'inherit'
      } as React.CSSProperties}
    >
      <BackgroundEffects type={activeEffect} />

      {/* Render các block theo thứ tự */}
      {activeBlocks.map((block, index) => {
        const blockDef = getBlock(block.type);
        if (!blockDef) return null;

        const BlockComponent = blockDef.Component;
        const blockSettings = { ...blockDef.defaultSettings, ...block.settings };

        return (
          <ScrollReveal key={block.id || `blk_${index}`}>
            <BlockComponent 
              data={data} 
              theme={config.theme} 
              config={config} 
              invitationId={invitationId}
              images={images}
              settings={blockSettings}
            />
          </ScrollReveal>
        );
      })}
    </div>
  );
};