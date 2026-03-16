import { Button } from "@/src/components/ui/Button";

const page = () => {
  return (
    <div className="mt-6 p-9 bg-white">
      <div className="header">
        <h1 className="text-4xl font-medium text-[#01D2B3]">
          Website Integration
        </h1>
        <p className="text-[#655E5E] my-2">
          Make Sure Your Bot Know What He Doing Next
        </p>
        <hr />
      </div>

      <div className="mt-6">
        <h1 className="mb-2.5">URL</h1>
      </div>

      <div className="flex items-center w-full rounded-lg border border-[#575555] px-6 py-4">
        <div className="w-40 text-gray-500 font-medium">https://ajksbjagsuyavhas.com</div>
      </div>
      <div className="selection-info flex items-center justify-end mt-5 p-5 bg-[#01D2B3] rounded-lg text-gray-500 font-medium">
        <div className="flex">
          <Button variant="custom" label="Tambahkan Konfigurasi" />
        </div>
      </div>
    </div>
  )
}

export default page