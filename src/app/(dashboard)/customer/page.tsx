import React from "react";
import { Icon } from "@iconify/react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
const page = () => {
  return (
    <div className="Add-product flex flex-col gap-1 w-full h-full items-center border-2 text-[#655E5E]">
      <div className="flex w-full gap-1 items-center">
        <div className="flex justify-around items-center w-1/4 h-full bg-white py-4 px-6">
          <h1 className="font-bold">
            Admin
            <span className="ml-1 rounded-full p-0.5 text-white bg-red-500 text-xs">
              10
            </span>
          </h1>
          <h1>bot</h1>
        </div>
        <div className="w-3/4 h-full bg-white p-4 flex justify-between">
          <h1>Bayu</h1>
          <div className="flex items-center gap-2">
            <p>Auto</p>
            <Switch />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-1 grow">
        <div className="flex flex-col w-1/4 bg-white pb-4">
          <div className="flex justify-end p-2 border-b-4 border-[#F5F5F9]">
            <Icon icon="material-symbols:search" width={30} />
            <Icon icon="mdi:filter" width={30} />
          </div>

          <div className="flex flex-col my-2 mx-2 px-4">
            <div className="my-2 border-b border-black">
              <h1 className="ml-2">Bayu</h1>
              <p className="ml-2 text-sm">Lorem ipsum dolor sit</p>
            </div>
            <div className="my-2  border-b border-black">
              <h1 className="ml-2">Bayu</h1>
              <p className="ml-2 text-sm">Lorem ipsum dolor sit</p>
            </div>
          </div>
        </div>
        {/* Bagian Chat */}
        <div className="w-3/4 flex flex-col bg-white border">
          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {/* chat */}
            <div className="w-fit max-w-[60%] self-end rounded-lg bg-[#A4F5A6] px-4 py-3">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className="text-end text-xs text-gray-600 mt-1">12:00</p>
            </div>

            {/* response */}
            <div className="w-fit max-w-[60%] rounded-lg bg-[#F3F3F3] px-4 py-3">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className="text-end text-xs text-gray-500 mt-1">12:00</p>
            </div>
            <div className="flex gap-2 w-full items-center justify-center">
              <span className="border border-black w-full"></span>
              <p className="text-xs w-20">hari ini</p> 
              <span className="border border-black w-full"></span>
            </div>
            <div className="w-fit max-w-[60%] self-end rounded-lg bg-[#A4F5A6] px-4 py-3">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className="text-end text-xs text-gray-600 mt-1">12:00</p>
            </div>
          </div>

          {/* INPUT AREA */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-4 items-center">
              <Input
                placeholder="Type a message..."
                variant="secondary"
                className="flex-1"
              />
              <Button
                label=""
                icon={<Icon icon="prime:send" width={24} />}
                iconPosition="mid"
                variant="default"
                className="w-12 h-12 flex shrink-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
