import React from "react";
import ChallengeCreationForm, {
  IValues,
} from "./components/challenge-creation-form";
import { add, format } from "date-fns";
import { useRootStore } from "../../stores";

export default function ChallengeCreationPage() {
  const { challengeStore } = useRootStore();

  function handleSubmit({ name, duration }: IValues) {
    const date = new Date();
    const dateFormat = "dd-MM-yyyy";
    const startDate = format(date, dateFormat);
    const days = Math.round(Number(duration));
    const endDate = format(add(date, { days }), dateFormat);

    challengeStore.createChallenge({ name, startDate, endDate });
  }

  return <ChallengeCreationForm handleSubmit={handleSubmit} />;
}
