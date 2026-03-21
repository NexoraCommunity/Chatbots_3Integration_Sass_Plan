import React from "react";
import { Icon } from "@iconify/react";
import { Cards, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import Image from "next/image";
import { OtherContentApi } from "@/src/model/userAgent/userAgent.model";

interface AgentOtherContentProps {
  otherContents: OtherContentApi[];
  isUploading: boolean;
  readOnly?: boolean;
  onAdd?: () => void;
  onRemove?: (index: number) => void;
  onUpdate?: (index: number, field: keyof OtherContentApi, value: any) => void;
  onImageUpload?: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AgentOtherContent = React.memo(({
  otherContents,
  isUploading,
  readOnly = false,
  onAdd,
  onRemove,
  onUpdate,
  onImageUpload,
}: AgentOtherContentProps) => {
  return (
    <Cards>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-7 border-b border-gray-50/50 bg-gray-50/30">
        <div className="flex sm:items-center sm:flex-row flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Icon icon="solar:gallery-wide-bold-duotone" width={28} />
          </div>
          <div>
            <CardTitle className="text-xl poppins-bold text-gray-900">Other Content</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">Manage greetings, FAQs, and extra media</p>
          </div>
        </div>
        {!readOnly && (
          <button
            onClick={onAdd}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 text-white rounded-xl font-black text-sm shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all flex items-center justify-center gap-2 group"
          >
            <Icon icon="solar:add-circle-bold" width={20} className="group-hover:rotate-90 transition-transform" />
            Add Content
          </button>
        )}
      </CardHeader>
      <CardContent className="p-5 sm:p-8 space-y-6">
        {otherContents.map((content, index) => (
          <div key={index} className="p-4 sm:p-6 rounded-3xl border border-gray-100 bg-gray-50/50 space-y-6 animate-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-amber-500/20">
                  {index + 1}
                </div>
                <span className="text-sm font-black text-gray-900 uppercase tracking-wider">Section Details</span>
              </div>
              {!readOnly && content.name !== "Greeting" && (
                <button
                  onClick={() => onRemove?.(index)}
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <Icon icon="solar:trash-bin-minimalistic-bold" width={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-900 ml-1 uppercase">Content Name</label>
                  <Input
                    value={content.name}
                    onChange={(e) => onUpdate?.(index, "name", e.target.value)}
                    placeholder="e.g., Welcome Message, FAQ, Footer"
                    className="h-12 rounded-xl border-gray-200 focus:border-amber-500 transition-all font-bold text-sm"
                    readOnly={readOnly || content.name === "Greeting"}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-900 ml-1 uppercase">Content Text</label>
                  <textarea
                    value={content.text}
                    onChange={(e) => onUpdate?.(index, "text", e.target.value)}
                    placeholder="Enter the content text here..."
                    readOnly={readOnly}
                    className={`w-full h-32 rounded-xl border border-gray-200 bg-white p-4 text-sm font-bold focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5 outline-none resize-none transition-all ${readOnly ? "bg-gray-50/50" : ""}`}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-900 ml-1 uppercase">Media (Optional)</label>
                <div className={`relative group/upload h-[196px] ${readOnly ? "pointer-events-none" : ""}`}>
                  {!readOnly && (
                    <input
                      type="file"
                      onChange={(e) => onImageUpload?.(index, e)}
                      disabled={isUploading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                    />
                  )}
                  <div className="h-full border-2 border-dashed border-amber-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white group-hover/upload:border-amber-500 group-hover/upload:bg-amber-50/50 transition-all overflow-hidden relative">
                    {isUploading ? (
                      <div className="w-full h-full relative group/img animate-in zoom-in duration-300">
                        <Image
                          src="https://api.dicebear.com/7.x/shapes/svg?seed=uploading"
                          alt="Uploading..."
                          fill
                          className="object-cover opacity-40 animate-pulse"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon icon="solar:cloud-upload-bold" width={32} className="text-amber-500 animate-bounce" />
                        </div>
                      </div>
                    ) : content.image ? (
                      <div className="w-full h-full relative group/img animate-in zoom-in duration-300">
                        <Image
                          src={content.image.startsWith("http") ? content.image : `/api-backend/${content.image.replace(/^\//, "")}`}
                          alt={content.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-4">
                          <Icon icon="solar:camera-bold" width={32} className="text-white bg-amber-500 p-2 rounded-full" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 group-hover/upload:translate-y-[-4px] transition-transform duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                          <Icon icon="solar:gallery-add-bold-duotone" width={32} />
                        </div>
                        <p className="text-xs font-black text-gray-500 uppercase">Upload Media</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {otherContents.length === 0 && (
          <div className="p-12 border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400 gap-4">
            <Icon icon="solar:inbox-line-bold-duotone" width={64} />
            <p className="font-bold">No extra content added yet</p>
          </div>
        )}
      </CardContent>
    </Cards>
  );
});

export default AgentOtherContent;
