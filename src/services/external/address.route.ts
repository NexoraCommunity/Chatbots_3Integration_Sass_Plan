import { Province, Regency, District, Village } from "@/src/model/external/address.model";

const ADDRESS_API_BASE = "https://pilipscode.github.io/api-wilayah-indonesia/api";

export const getProvinces = async (): Promise<Province[]> => {
  const res = await fetch(`${ADDRESS_API_BASE}/provinces.json`);
  if (!res.ok) throw new Error("Failed to fetch provinces");
  return res.json();
};

export const getRegencies = async (provinceId: string): Promise<Regency[]> => {
  const res = await fetch(`${ADDRESS_API_BASE}/regencies/${provinceId}.json`);
  if (!res.ok) throw new Error("Failed to fetch cities");
  const data: Regency[] = await res.json();
  return data.map(item => ({
    ...item,
    name: item.name
      .replace(/KABUPATEN /gi, "")
      .replace(/KOTA /gi, "")
      .replace(/KAB\. /gi, "")
      .replace(/ADM\. /gi, "")
      .trim()
  }));
};

export const getDistricts = async (regencyId: string): Promise<District[]> => {
  const res = await fetch(`${ADDRESS_API_BASE}/districts/${regencyId}.json`);
  if (!res.ok) throw new Error("Failed to fetch districts");
  return res.json();
};

export const getVillages = async (districtId: string): Promise<Village[]> => {
  const res = await fetch(`${ADDRESS_API_BASE}/villages/${districtId}.json`);
  if (!res.ok) throw new Error("Failed to fetch villages");
  return res.json();
};
