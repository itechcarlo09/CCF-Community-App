// account.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "@features/member/model/user";

interface AccountState {
	account: UserDTO | null;
	setAccount: (account: UserDTO) => void;
	clearAccount: () => void;
}

export const useAccountStore = create<AccountState>()(
	persist(
		(set) => ({
			account: null,
			setAccount: (account) => set({ account }),
			clearAccount: () => set({ account: null }),
		}),
		{
			name: "account-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
