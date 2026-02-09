import { Button } from "@/src/components/ui/Button";
import { Cards } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import React from "react";

const page = () => {
  return (
    <div>
      {/* Bot Integration */}
      <p className="mb-2 font-medium">Bot Integration</p>
      <div className="grid grid-cols-3 gap-6 mb-5">
        <Cards className="p-5">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
            {/* LOGO */}
            <div className="row-span-1 col-start-1 row-start-1">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
                <Icon icon="mdi:whatsapp" width={28} height={28} />
              </div>
            </div>
            {/* TITLE */}
            <p className="col-start-2 row-start-1 text-lg font-semibold">
              Baileys
            </p>
            {/* DESCRIPTION */}
            <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
              Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
              mengirim pesan otomatis.
            </p>
            {/* BUTTON */}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="custom"
              label="aktifkan"
              className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
            />
          </div>
        </Cards>
        <Cards className="p-5">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
            {/* LOGO */}
            <div className="row-span-1 col-start-1 row-start-1">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                <Icon icon="mdi:telegram" width={28} height={28} />
              </div>
            </div>
            {/* TITLE */}
            <p className="col-start-2 row-start-1 text-lg font-semibold">
              Bot father
            </p>
            {/* DESCRIPTION */}
            <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
              Aktifkan integrasi Telegram Bot father untuk mulai menerima dan
              mengirim pesan otomatis.
            </p>
            {/* BUTTON */}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="custom"
              label="aktifkan"
              className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
            />
          </div>
        </Cards>
        <Cards className="p-5">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
            {/* LOGO */}
            <div className="row-span-1 col-start-1 row-start-1">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-white">
                <Icon icon="akar-icons:globe" width={28} height={28} />
              </div>
            </div>
            {/* TITLE */}
            <p className="col-start-2 row-start-1 text-lg font-semibold">
              Website
            </p>
            {/* DESCRIPTION */}
            <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
              Aktifkan integrasi Website untuk mulai menerima dan mengirim pesan
              otomatis.
            </p>
            {/* BUTTON */}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="custom"
              label="aktifkan"
              className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
            />
          </div>
        </Cards>
        <Cards className="p-5">
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
            {/* LOGO */}
            <div className="row-span-1 col-start-1 row-start-1">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
                <Icon icon="mdi:whatsapp" width={28} height={28} />
              </div>
            </div>
            {/* TITLE */}
            <p className="col-start-2 row-start-1 text-lg font-semibold">
              Wa Bussines
            </p>
            {/* DESCRIPTION */}
            <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
              Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
              mengirim pesan otomatis.
            </p>
            {/* BUTTON */}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="custom"
              label="aktifkan"
              className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
            />
          </div>
        </Cards>
      </div>


    </div>
  );
};

export default page;
