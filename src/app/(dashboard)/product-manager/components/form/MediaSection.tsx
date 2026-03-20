"use client";

import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface MediaSectionProps {
  image: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MediaSection = ({ image, onImageUpload }: MediaSectionProps) => {
  return (
    <Cards>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="solar:gallery-bold-duotone" className="text-primary" />
          Product Media
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div
          className="group relative aspect-square rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50 items-center justify-center flex flex-col gap-4 cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 overflow-hidden"
          onClick={() => document.getElementById("main-image-upload")?.click()}
        >
          {image ? (
            <Image
              src={image.startsWith('http') || image.startsWith('blob:') ? image : `/api-backend/${image.startsWith('/') ? image.substring(1) : image}`}
              alt="Product"
              fill
              className="object-cover"
            />
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                <Icon icon="solar:cloud-upload-bold-duotone" width={32} />
              </div>
              <div className="text-center">
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Click to upload</p>
                <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">PNG, JPG up to 10MB</p>
              </div>
            </>
          )}
          <input
            id="main-image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onImageUpload}
          />
        </div>
      </CardContent>
    </Cards>
  );
};
