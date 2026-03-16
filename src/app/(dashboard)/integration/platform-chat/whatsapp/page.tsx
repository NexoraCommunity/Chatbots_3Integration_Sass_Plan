"use client";
import { useState } from "react";
import { Input } from "@/src/components/ui/Input";
import { Cards } from "@/src/components/ui/Cards";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { AddWhatsappNumberModal } from "../../../../../components/ui/modal/AddWhatsappNumberModal";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="p-9 min-h-full flex flex-col relative bg-white">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">
          Whatsapp Bussiness Integration
        </h1>
        <p className="text-[#655E5E] my-2">
          Make Sure Your Bot Know What He Doing Next
        </p>
        <hr />
      </div>

      <div className="form-inputAgent">
        <div className="mt-6">
          <h1 className="mb-2.5">Akses Token</h1>
          <Input placeholder="Masukkan Akses Token" variant="secondary" />
        </div>
      </div>

      <div className="mt-6 grow">
        <h1 className="mb-2.5">Pilih Platform yang akan digunakan !</h1>
        <div className="grid grid-cols-3 gap-6 mb-5">
          <Cards className="p-5 border border-[#575555]">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
              {/* LOGO */}
              <div className="row-span-1 col-start-1 row-start-1">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
                  <Icon icon="mdi:whatsapp" width={28} height={28} />
                </div>
              </div>
              {/* TITLE */}
              <p className="col-start-2 row-start-1 text-lg font-semibold">
                082198217823
              </p>
              {/* DESCRIPTION */}
              <div className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
                <p>
                  Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
                  mengirim pesan otomatis.
                </p>
                <p className="mt-4">
                  Status :{" "}
                  <span className="font-semibold text-green-600">
                    Terhubung
                  </span>
                </p>
              </div>
              {/* BUTTON */}
            </div>
          </Cards>
        </div>
      </div>
      <div className="selection-info sticky bottom-0 z-tinggi flex items-center justify-end mt-5 p-5 bg-[#01D2B3] rounded-lg text-gray-500 font-medium">
        <div className="flex">
          <Button
            variant="custom"
            label="Tambahkan Nomor"
            onClick={() => setOpenModal(true)}
          />
          <AddWhatsappNumberModal
            open={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
