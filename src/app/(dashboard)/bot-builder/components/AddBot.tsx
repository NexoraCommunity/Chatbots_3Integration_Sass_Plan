import { Cards } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/src/components/ui/Checkbox";

const AddBot = () => {
  return (
    <div className="Add-agent p-9 bg-white">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">Add Bot</h1>
        <p className="text-[#655E5E] my-2">
          Make Sure Your Bot Know What He Doing Next
        </p>
        <hr />
      </div>
      {/* Form Input Agent */}
      <div className="form-inputAgent">
        <div className="mt-6">
          <h1 className="mb-2.5">Nama Bot</h1>
          <Input placeholder="Masukkan Nama Bot" variant="secondary" />
        </div>
        <div className="mt-6">
          <h1 className="mb-2.5">Pilih Agent yang akan digunakan !</h1>
          <div className="checklist-agent grid grid-cols-3 gap-4">
            <Cards className="border border-[#575555]">
              <div className="headerAgentCard flex justify-between py-3 px-3.5 items-center">
                <p className="text-[16px] font-normal">Customer Services</p>
                <Checkbox />
              </div>
              <div className="AgentCardDescription h-40 p-2.5 mx-3.5 bg-gray-200 rounded-lg overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Temporibus praesentium pariatur molestias cum assumenda quis
                voluptate ex asperiores consectetur adipisci.
              </div>
              <div className="agentAction flex justify-between py-3 px-3.5 items-center">
                <option className="p-1 bg-gray-100 rounded-lg">Claude</option>
              </div>
            </Cards>
            <Cards className="border border-[#575555]">
              <div className="headerAgentCard flex justify-between py-3 px-3.5 items-center">
                <p className="text-[16px] font-normal">Customer Services</p>
                <Checkbox />
              </div>
              <div className="AgentCardDescription h-40 p-2.5 mx-3.5 bg-gray-200 rounded-lg overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Temporibus praesentium pariatur molestias cum assumenda quis
                voluptate ex asperiores consectetur adipisci.
              </div>
              <div className="agentAction flex justify-between py-3 px-3.5 items-center">
                <option className="p-1 bg-gray-100 rounded-lg">Claude</option>
              </div>
            </Cards>
            <Cards className="border border-[#575555]">
              <div className="headerAgentCard flex justify-between py-3 px-3.5 items-center">
                <p className="text-[16px] font-normal">Customer Services</p>
                <Checkbox />
              </div>
              <div className="AgentCardDescription h-40 p-2.5 mx-3.5 bg-gray-200 rounded-lg overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Temporibus praesentium pariatur molestias cum assumenda quis
                voluptate ex asperiores consectetur adipisci.
              </div>
              <div className="agentAction flex justify-between py-3 px-3.5 items-center">
                <option className="p-1 bg-gray-100 rounded-lg">Claude</option>
              </div>
            </Cards>
          </div>

          {/* Platform */}
          <div className="platform mt-6">
            <h1 className="mb-2.5">Pilih Platform yang akan digunakan !</h1>
            <div className="grid grid-cols-4 gap-4 h-20">
              <Cards className="flex items-center justify-center gap-5 border border-[#575555]">
                  <Icon icon="logos:whatsapp-icon" width={40} />
                <p>WhatsApp</p>
              </Cards>
              <Cards className="flex items-center justify-center gap-5 border border-[#575555]">
                <div className="flex text-white bg-blue-500 rounded-full items-center w-10 h-10 justify-center">
                  <Icon icon="mdi:telegram" width={24} />
                </div>
                <p>Telegram</p>
              </Cards>
              <Cards className="flex items-center justify-center gap-5 border border-[#575555]">
                  <Icon icon="akar-icons:globe" width={40} className="text-amber-300"/>
                <p>Web Chat</p>
              </Cards>
              <Cards className="flex items-center justify-center gap-5 border border-[#575555]">
                  <Icon icon="logos:whatsapp-icon" width={40} />
                <p>WhatsApp Bussines</p>
              </Cards>
            </div>
          </div>
          <div className="selection-info sticky bottom-2 flex items-center justify-end mt-5 p-5 bg-[#01D2B3] rounded-lg text-gray-500 font-medium">
            <div className="flex">
              <Button variant="custom" label="Tambahkan Bot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddBot };
