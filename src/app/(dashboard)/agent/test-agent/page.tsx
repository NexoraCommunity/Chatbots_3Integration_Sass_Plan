import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Icon } from "@iconify/react";

const page = () => {
  return (
    <div className="mt-6 p-9 bg-white">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">Test Agent</h1>
        <p className="text-[#655E5E] my-2">
          Make Sure Your Bot Know What He Doing Next
        </p>
        <hr />
      </div>
      <div className="flex gap-7 mt-6">
        {/* Bagian Chat nih */}
        <div className="container-chat flex flex-col justify-between border-2 border-black rounded-lg p-4 w-2/3">
          <div className="flex flex-col gap-4">
            <div className="response border border-black rounded-lg p-2.5 w-2/3">
              <span className="flex gap-1 text-xs items-center">
                <Icon icon="mingcute:ai-fill" width={15} />
                <p>Claude-opus-4</p>
              </span>
              <p className="m-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                adipisci molestiae commodi totam. Saepe inventore harum unde
                quam, quidem velit.
              </p>
            </div>
            <div className="your-chat flex flex-col place-self-end border border-black rounded-lg p-2.5 w-2/3">
              <p className="m-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                adipisci molestiae commodi totam. Saepe inventore harum unde
                quam, quidem velit.
              </p>
            </div>
          </div>
          {/* Send message */}
          <div className="flex gap-4 w-full border-black text-white">
            <Input placeholder="" variant="secondary" />
              <Button label="" icon={<Icon icon="prime:send" width={30} />} iconPosition="mid"  variant="default" className="w-15 h-15 flex shrink-0"/>
          </div>
        </div>
        {/* Bagian Model */}
        <div className="flex flex-col w-1/3">
          <div className="mb-6.25">
            <p>Model AI</p>
            <div className="model text-center flex items-center justify-center h-18 rounded-lg mt-2 border">
              <p>claude-opus-4</p>
            </div>
          </div>
          <div className="mb-6.25">
            <p>Agent</p>
            <div className="model text-center flex items-center justify-center h-18 rounded-lg mt-2 border">
              <p></p>
            </div>
          </div>
          <div className="mb-6.25">
            <p>Your Prompt</p>
            <div className="model text-start h-auto rounded-lg mt-2 border p-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                quisquam recusandae cupiditate earum voluptatibus? Debitis
                facilis mollitia atque expedita hic, rem numquam alias ab at
                tenetur, omnis sunt eligendi inventore?
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* futer */}
      <div className="selection-info flex items-center justify-between mt-5 p-5 bg-[#01D2B3] rounded-lg text-gray-500 font-medium">
        <div className="flex gap-1 items-center justify-center py-2.5 px-4.5 bg-white text-green-400 italic rounded-xl">
          <Icon icon="ph:lightning-fill" width={20}/>
          <p>Total Token : 950</p>
        </div>
        <Button label="Selesai" variant="custom"/>
      </div>        
    </div>
  );
};

export default page;
