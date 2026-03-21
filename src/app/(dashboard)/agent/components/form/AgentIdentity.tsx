import React from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/src/components/ui/Input";
import { Cards, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Cards";

interface AgentIdentityProps {
  name: string;
  agent: string;
  filePath: string;
  uploadedFileName: string;
  isUploading: boolean;
  readOnly?: boolean;
  status?: string;
  onNameChange?: (value: string) => void;
  onAgentChange?: (value: string) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile?: () => void;
}

const getStatusBadge = (status?: string) => {
  const s = status?.toUpperCase() || "UNKNOWN";
  if (s === "UNKNOWN") return null;

  switch (s) {
    case "READY":
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-xl border border-green-100 font-black text-[10px] uppercase tracking-wider shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Ready
        </div>
      );
    case "PROCESSING":
    case "PENDING":
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 font-black text-[10px] uppercase tracking-wider shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
          Processing
        </div>
      );
    case "FAILED":
      return (
        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-xl border border-red-100 font-black text-[10px] uppercase tracking-wider shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
          Failed
        </div>
      );
    default:
      return null;
  }
};

const AgentIdentity = React.memo(({
  name,
  agent,
  filePath,
  uploadedFileName,
  isUploading,
  readOnly = false,
  status,
  onNameChange,
  onAgentChange,
  onFileChange,
  onRemoveFile,
}: AgentIdentityProps) => {
  return (
    <Cards>
      <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center  gap-6 pb-7 border-b border-gray-50/50 bg-gray-50/30">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Icon icon="solar:document-bold-duotone" className="text-primary w-7 h-7" />
        </div>
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
          <div>
            <CardTitle className="text-xl poppins-bold text-gray-900">Identity & Knowledge</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">Define your agent's persona and core data</p>
          </div>
          {getStatusBadge(status)}
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 ml-1">Agent Name</label>
            <Input
              value={name}
              onChange={(e) => onNameChange?.(e.target.value)}
              placeholder="e.g., Nexora Support Specialist"
              className="h-14 rounded-2xl border-gray-200 focus:border-primary focus:ring-primary/20 transition-all font-medium text-base"
              readOnly={readOnly}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 ml-1">Agent Role</label>
            <div className="relative group">
              <select
                value={agent}
                onChange={(e) => onAgentChange?.(e.target.value)}
                disabled={readOnly}
                className={`w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-base font-medium transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none appearance-none ${readOnly ? "cursor-default opacity-80" : "cursor-pointer group-hover:border-primary/50"}`}
              >
                <option value="customer-service">Customer Service</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                <Icon icon="solar:alt-arrow-down-bold" width={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-black text-gray-900 ml-1">Upload Reference Data</label>
          <div className="relative">
            {!readOnly && (
              <input
                type="file"
                onChange={onFileChange}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                id="file-upload"
              />
            )}
            <div className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center gap-4 transition-all duration-300 relative overflow-hidden group ${isUploading ? 'bg-gray-50 border-gray-200' :
              readOnly ? 'bg-gray-50/50 border-gray-100' : 'bg-white border-primary/20 hover:border-primary hover:bg-primary/[0.02]'
              }`}>
              {isUploading ? (
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <p className="text-primary font-black text-lg">Uploading Data...</p>
                </div>
              ) : filePath ? (
                <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center text-green-600 shadow-xl shadow-green-100/50">
                    <Icon icon="solar:document-bold-duotone" width={40} />
                  </div>
                  <div className="text-center">
                    <p className="text-green-700 font-black text-lg">Data Secured!</p>
                    <p className="text-sm text-gray-500 font-bold">{uploadedFileName}</p>
                  </div>
                  {!readOnly && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onRemoveFile?.(); }}
                      className="mt-2 text-xs font-black text-red-500 hover:text-red-600 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2 border border-red-100 bg-white shadow-sm"
                    >
                      <Icon icon="solar:trash-bin-trash-bold-duotone" width={16} />
                      Remove Reference
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-5 text-center transition-transform group-hover:scale-105 duration-300">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-xl shadow-primary/10 group-hover:rotate-6 transition-transform">
                    <Icon icon="solar:document-add-bold-duotone" width={44} />
                  </div>
                  <div>
                    <p className="text-gray-900 font-black text-xl mb-1">Upload Reference Data</p>
                    <p className="text-sm text-gray-500 font-bold max-w-[300px] leading-relaxed">
                      PDF, DOCX, or TXT files that contain your business knowledge
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 group-hover:bg-primary/90 transition-all">
                    <Icon icon="solar:add-circle-bold-duotone" width={20} />
                    Choose File
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Cards>
  );
});

export default AgentIdentity;
