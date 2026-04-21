import { getAcronym } from "src/utils/stringUtils";
import { SpeakerDTO } from "../model/Speaker";
import { SpeakerItemUI } from "../model/SpeakerItemUI";

export const mapSpeakerToUI = (speaker: SpeakerDTO): SpeakerItemUI => {
	return {
		id: speaker.id,
		name: speaker.name,
		fallbackName: getAcronym(undefined, speaker.name),
		image: "",
	};
};
