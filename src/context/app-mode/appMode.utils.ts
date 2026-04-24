import { AppMode } from "@features/profile/components/ModeCard";

export const isSuperAdmin = (mode: AppMode) => mode === AppMode.SuperAdmin;
export const isManagement = (mode: AppMode) => mode === AppMode.Management;
export const isMemberMode = (mode: AppMode) => mode === AppMode.MemberMode;
