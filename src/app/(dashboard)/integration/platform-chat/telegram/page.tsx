"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { AddBotFatherModal } from "../../../../../components/ui/modal/AddBotFatherModal";


const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="mt-6 p-9 bg-white">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">
          Telegram Integration
        </h1>
        <p className="text-[#655E5E] my-2">
          Make Sure Your Bot Know What He Doing Next
        </p>
        <hr />
      </div>

      <div className="mt-6">
        <h1 className="mb-2.5">Bot Father</h1>
      </div>

      <div className="flex items-center w-full rounded-lg border border-[#575555] px-6 py-4">
        <div className="w-40 text-gray-500 font-medium">Nama Bot</div>
        <div className="h-6 w-px bg-gray-500 mx-7"></div>
        <div className="flex-1 text-gray-500">ajkgd adiuechehn</div>
      </div>
      <div className="selection-info flex items-center justify-end mt-5 p-5 bg-[#01D2B3] rounded-lg text-gray-500 font-medium">
        <div className="flex">
          <Button variant="custom" label="Tambahkan Token" onClick={() => setOpenModal(true)} />
          <AddBotFatherModal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
      </div>
    </div>
  );
};

export default Page;
