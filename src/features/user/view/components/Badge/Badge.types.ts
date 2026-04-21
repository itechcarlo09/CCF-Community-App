import { DGroupStatus } from "src/types/enums/DGroupStatus";

export interface BadgeProps {
	type: DGroupStatus;
	dleader?: string | null;
}
