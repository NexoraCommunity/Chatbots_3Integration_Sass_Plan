import { Cards } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import { DropdownMenuActions } from "@/src/components/ui/DropdownMenu";

const BotList = () => {
  return (
    <div className="agent-list flex gap-5 mt-6">
      <div className="flex-2">
        <div className="grid grid-cols-2 gap-5">
          <Cards className="p-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center justify-center">
                <Icon icon="bx:bot" width={24} />
                <p>Bot 1</p>
              </div>
              <DropdownMenuActions />
            </div>

            <div className="describe bg-[#EFEFEF] rounded-lg p-2 mt-4 text-[16px] text-[#655E5E] h-39.75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              officia cupiditate modi voluptate perspiciatis velit ipsam a
              ratione blanditiis neque!
            </div>
            <div className="flex justify-end">Toggle</div>
          </Cards>
          
          <Cards className="p-3 flex flex-col justify-center items-center cursor-pointer text-[#655E5E] ">
                <Icon icon="fontisto:plus-a" width={50} /> 
                <p>ADD NEW BOT</p>
          </Cards>
        </div>
      </div>
      <div className="flex-1">
        <Cards className="p-4">History Log</Cards>
      </div>
    </div>
  );
};

export { BotList };
