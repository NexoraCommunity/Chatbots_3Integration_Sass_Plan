import { create } from 'zustand';
import * as addressService from '@/src/services/external/address.route';
import { Province, Regency, District, Village } from '@/src/model/external/address.model';

interface AddressState {
  provinces: Province[];
  regencies: Regency[];
  districts: District[];
  villages: Village[];
  isLoading: boolean;
  
  fetchProvinces: () => Promise<void>;
  fetchRegencies: (provinceId: string) => Promise<void>;
  fetchDistricts: (regencyId: string) => Promise<void>;
  fetchVillages: (districtId: string) => Promise<void>;
  
  resetRegencies: () => void;
  resetDistricts: () => void;
  resetVillages: () => void;
  resetAll: () => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  provinces: [],
  regencies: [],
  districts: [],
  villages: [],
  isLoading: false,

  fetchProvinces: async () => {
    set({ isLoading: true });
    try {
      const data = await addressService.getProvinces();
      set({ provinces: data });
    } catch (error) {
      console.error(error);
      set({ provinces: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRegencies: async (provinceId: string) => {
    if (!provinceId) return;
    set({ isLoading: true });
    try {
      const data = await addressService.getRegencies(provinceId);
      set({ regencies: data });
    } catch (error) {
      console.error(error);
      set({ regencies: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDistricts: async (regencyId: string) => {
    if (!regencyId) return;
    set({ isLoading: true });
    try {
      const data = await addressService.getDistricts(regencyId);
      set({ districts: data });
    } catch (error) {
      console.error(error);
      set({ districts: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchVillages: async (districtId: string) => {
    if (!districtId) return;
    set({ isLoading: true });
    try {
      const data = await addressService.getVillages(districtId);
      set({ villages: data });
    } catch (error) {
      console.error(error);
      set({ villages: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  resetRegencies: () => set({ regencies: [], districts: [], villages: [] }),
  resetDistricts: () => set({ districts: [], villages: [] }),
  resetVillages: () => set({ villages: [] }),
  resetAll: () => set({ provinces: [], regencies: [], districts: [], villages: [] }),
}));
