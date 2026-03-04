"use client";
import { Input } from "@/src/components/ui/Input";
import { SearchBar } from "@/src/components/ui/SearchBar";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Button } from "@/src/components/ui/Button";

const AddAgent = () => {
  return (
    <div className="Add-agent p-9 bg-white">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">Add Agent</h1>
        <p className="text-[#655E5E] my-2">
          Make Sure Your Bot Know What He Doing Next
        </p>
        <hr />
      </div>
      {/* Form Input Agent */}
      <div className="form-inputAgent">
        <div className="mt-6">
          <h1 className="mb-2.5">Nama Agent</h1>
          <Input placeholder="Masukkan Nama Agent" variant="secondary" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-16">
        {/* Agent Selection */}
        <div className="agent-model-selection">
          <h1 className="mb-2">Pilih Model Agent</h1>
          <select className="w-full p-5 border rounded-lg text-center">
            <option value="">Pilih Model Agent</option>
            <option value="admin">Agent 1</option>
            <option value="user">Agent 2</option>
          </select>
        </div>

        {/* Upload File */}
        <div className="upload-file-agent flex flex-col">
          <h1 className="mb-2">Upload File</h1>
          <Input
            type="file"
            variant="secondary"
            placeholder=""
            className="h-full"
          />
        </div>
      </div>

      {/* Input Prompt */}
      <div className="input-prompt">
        <h1 className="mb-2">Masukan Prompt</h1>
        <textarea
          className="w-full h-40 p-5 border rounded-lg"
          placeholder="Masukan Prompt Disini..."
        ></textarea>
      </div>

      {/* Search Product */}
      <div className="search-product mt-10 border rounded-lg p-5">
        <SearchBar
          placeholder="Search Product..."
          className="border rounded-lg p-3 w-full"
          variant="miniDefault"
        />
        <div className="image-selection mt-5 grid grid-cols-5 gap-5">
          {/* Image options would go here */}
          <div className="relative w-full h-50 border rounded-xsl flex justify-center items-center bg-muted-foreground">
            <div className="absolute top-1 right-1">
            <Checkbox />
            </div>
          </div>
          <div className="relative w-full h-50 border rounded-xsl flex justify-center items-center bg-muted-foreground">
            <div className="absolute top-1 right-1">
            <Checkbox />
            </div>
          </div>
          <div className="relative w-full h-50 border rounded-xsl flex justify-center items-center bg-muted-foreground">
            <div className="absolute top-1 right-1">
            <Checkbox />
            </div>
          </div>
          <div className="relative w-full h-50 border rounded-xsl flex justify-center items-center bg-muted-foreground">
            <div className="absolute top-1 right-1">
            <Checkbox />
            </div>
          </div>
          <div className="relative w-full h-50 border rounded-xsl flex justify-center items-center bg-muted-foreground">
            <div className="absolute top-1 right-1">
            <Checkbox />
            </div>
          </div>
        </div>

        <div className="selection-all flex justify-end mt-5 items-center gap-2 text-gray-700 font-medium text-xl cursor-pointer">
          <Checkbox /> Pilih Semua
        </div>
      </div>
      <div className="selection-info flex justify-between items-center mt-5 p-5 bg-[#01D2B3] rounded-lg text-gray-500 font-medium">
        <div>3 Produk terpilih</div>
        <div className="flex gap-6">
          <Button variant="custom" label="Batalkan semua" />
          <Button variant="custom" label="Hapus" />
          <Button variant="custom" label="Buat" />
        </div>
      </div>
    </div>
  );
};

export { AddAgent };
