import React from "react";
import { Icon } from "@iconify/react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
const page = () => {
  return (
    <div className="Add-product flex flex-col gap-1 w-full h-full items-center border-2">
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
        <div className="flex flex-col w-1/4 bg-white py-4">
          <div className="flex justify-end px-4">
            <Icon icon="material-symbols:search" width={30} />
            <Icon icon="mdi:filter" width={30} />
          </div>

          <div className="flex flex-col my-2 mx-2 px-4">
            <div className="my-2 border-b border-black">
              <h1>Bayu</h1>
              <p>Lorem ipsum dolor sit</p>
            </div>
            <div className="my-2  border-b border-black">
              <h1>Bayu</h1>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
        </div>
        {/* Bagian Chat */}
        <div className="w-3/4 flex flex-col bg-white p-4 gap-4">
          {/* response */}
          <div className="w-3/5 rounded bg-[#F3F3F3] px-4 pt-4">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
              nihil optio odio vero delectus ullam minus sit nemo provident
              praesentium.
            </p>
            <p className="text-end">12:00</p>
          </div>
          {/* chat */}
          <div className="w-3/5 self-end rounded bg-[#A4F5A6] px-4 pt-4">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
              nihil optio odio vero delectus ullam minus sit nemo provident
              praesentium.
            </p>
            <p className="text-end">12:00</p>
          </div>
          <div className="flex gap-4 w-full mt-10 border-black text-white items-center">
            <Input placeholder="" variant="secondary" />
            <Button
              label=""
              icon={<Icon icon="prime:send" width={30} />}
              iconPosition="mid"
              variant="default"
              className="w-15 h-15 flex shrink-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
