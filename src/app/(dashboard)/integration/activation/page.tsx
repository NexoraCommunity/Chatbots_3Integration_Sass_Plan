"use client";
import { Button } from "@/src/components/ui/Button";
import { Cards } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { useIntegrationStore } from "@/src/store/integration.store";
import { Integration } from "@/src/model/integration.model";

const page = () => {
  const { getAllIntegration } = useIntegrationStore();
  const [integrationData, setIntegrationData] = useState<Integration[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllIntegration();
        setIntegrationData(data?.data || []);
        console.log(data);
      } catch (error) {
        console.error("Error fetching integration data:", error);
      }
    };
    fetchData();
  }, [getAllIntegration]);

  return (
    <div>
      {/* Bot Integration */}
      <p className="mb-2 font-medium">Chat Platform</p>
      <div className="grid grid-cols-3 gap-6 mb-5">
        {integrationData?.filter((integration) => integration.type === "chatPlatform").map((integration) => (
          <Cards className="p-5" key={integration.id}>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
              <div className="row-span-1 col-start-1 row-start-1">
                <IconMap name={integration.name} />
              </div>
              <p className="col-start-2 row-start-1 text-lg font-semibold">
                {integration.name}
              </p>
              <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
                Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
                mengirim pesan otomatis.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="custom"
                label="aktifkan"
                className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
              />
            </div>
          </Cards>
        ))}
      </div>
      <p className="mb-2 font-medium">Payment Gateway</p>
      <div className="grid grid-cols-3 gap-6 mb-5">
        {integrationData?.filter((integration) => integration.type === "paymentGateway").map((integration) => (
          <Cards className="p-5" key={integration.id}>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
              <div className="row-span-1 col-start-1 row-start-1">
                <IconMap name={integration.name} />
              </div>
              <p className="col-start-2 row-start-1 text-lg font-semibold">
                {integration.name}
              </p>
              <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
                Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
                mengirim pesan otomatis.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="custom"
                label="aktifkan"
                className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
              />
            </div>
          </Cards>
        ))}
      </div>
      <p className="mb-2 font-medium">Shipping</p>
      <div className="grid grid-cols-3 gap-6 mb-5">
        {integrationData?.filter((integration) => integration.type === "shipping").map((integration) => (
          <Cards className="p-5" key={integration.id}>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
              <div className="row-span-1 col-start-1 row-start-1">
                <IconMap name={integration.name} />
              </div>
              <p className="col-start-2 row-start-1 text-lg font-semibold">
                {integration.name}
              </p>
              <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
                Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
                mengirim pesan otomatis.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="custom"
                label="aktifkan"
                className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
              />
            </div>
          </Cards>
        ))}
      </div>
    </div>
  );
};

export default page;
// <div className="grid grid-cols-3 gap-6 mb-5">

//   <Cards className="p-5">
//     <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
//       {/* LOGO */}
//       <div className="row-span-1 col-start-1 row-start-1">
//         <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
//           <Icon icon="mdi:whatsapp" width={28} height={28} />
//         </div>
//       </div>
//       {/* TITLE */}
//       <p className="col-start-2 row-start-1 text-lg font-semibold">
//         {}
//       </p>
//       {/* DESCRIPTION */}
//       <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
//         Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
//         mengirim pesan otomatis.
//       </p>
//       {/* BUTTON */}
//     </div>
//     <div className="flex justify-end mt-4">
//       <Button
//         variant="custom"
//         label="aktifkan"
//         className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
//       />
//     </div>
//   </Cards>
//   <Cards className="p-5">
//     <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
//       {/* LOGO */}
//       <div className="row-span-1 col-start-1 row-start-1">
//         <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
//           <Icon icon="mdi:telegram" width={28} height={28} />
//         </div>
//       </div>
//       {/* TITLE */}
//       <p className="col-start-2 row-start-1 text-lg font-semibold">
//         Bot father
//       </p>
//       {/* DESCRIPTION */}
//       <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
//         Aktifkan integrasi Telegram Bot father untuk mulai menerima dan
//         mengirim pesan otomatis.
//       </p>
//       {/* BUTTON */}
//     </div>
//     <div className="flex justify-end mt-4">
//       <Button
//         variant="custom"
//         label="aktifkan"
//         className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
//       />
//     </div>
//   </Cards>
//   <Cards className="p-5">
//     <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
//       {/* LOGO */}
//       <div className="row-span-1 col-start-1 row-start-1">
//         <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-white">
//           <Icon icon="akar-icons:globe" width={28} height={28} />
//         </div>
//       </div>
//       {/* TITLE */}
//       <p className="col-start-2 row-start-1 text-lg font-semibold">
//         Website
//       </p>
//       {/* DESCRIPTION */}
//       <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
//         Aktifkan integrasi Website untuk mulai menerima dan mengirim pesan
//         otomatis.
//       </p>
//       {/* BUTTON */}
//     </div>
//     <div className="flex justify-end mt-4">
//       <Button
//         variant="custom"
//         label="aktifkan"
//         className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
//       />
//     </div>
//   </Cards>
//   <Cards className="p-5">
//     <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 items-center">
//       {/* LOGO */}
//       <div className="row-span-1 col-start-1 row-start-1">
//         <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
//           <Icon icon="mdi:whatsapp" width={28} height={28} />
//         </div>
//       </div>
//       {/* TITLE */}
//       <p className="col-start-2 row-start-1 text-lg font-semibold">
//         Wa Bussines
//       </p>
//       {/* DESCRIPTION */}
//       <p className="col-start-2 row-start-2 text-sm text-gray-500 max-w-md">
//         Aktifkan integrasi WhatsApp baileys untuk mulai menerima dan
//         mengirim pesan otomatis.
//       </p>
//       {/* BUTTON */}
//     </div>
//     <div className="flex justify-end mt-4">
//       <Button
//         variant="custom"
//         label="aktifkan"
//         className="text-white bg-cyan-400 border font-normal px-4 py-1 rounded-lg"
//       />
//     </div>
//   </Cards>
// </div>

export const IconMap = ({ name }: { name: string }) => {
  switch (name) {
    case "whatsapp Bussiness":
      return (
        <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
          <Icon icon="hugeicons:whatsapp-business" width={28} height={28} />
        </div>
      );
    case "baileys":
      return (
        <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white">
          <Icon icon="mdi:whatsapp" width={28} height={28} />
        </div>
      );
    case "botFather":
      return (
        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
          <Icon icon="mdi:telegram" width={28} height={28} />
        </div>
      );
    case "website":
      return (
        <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-white">
          <Icon icon="akar-icons:globe" width={28} height={28} />
        </div>
      );
    case "xendit":
      return (
        <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white">
          <Icon icon="simple-icons:xendit" width={28} height={28} />
        </div>
      );
    case "midtrans":
      return (
        <div className="w-12 h-12 rounded-xl bg-blue-800 flex items-center justify-center text-white">
          <Icon icon="solar:dollar-bold" width={28} height={28} />
        </div>
      );
    case "rajaOngkir":
      return (
        <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center text-white">
          <Icon icon="gridicons:shipping" width={28} height={28} />
        </div>
      );
    default:
      return <></>;
  }
};
