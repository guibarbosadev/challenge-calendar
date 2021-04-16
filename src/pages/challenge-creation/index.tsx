import React from "react";
import { useChallengeStore } from "../../stores/challenge";
import ChallengeCreationForm, {
  IValues,
} from "./components/challenge-creation-form";
import { add, format } from "date-fns";

export default function ChallengeCreationPage() {
  const challengeStore = useChallengeStore();
  function handleSubmit(values: IValues) {
    const date = new Date();
    const startDate = format(date, "dd-MM-yyyy");
    const endDate = format(
      add(date, { days: Math.round(Number(values.duration)) }),
      "dd-MM-yyyy"
    );
    challengeStore.createChallenge({
      name: values.name,
      startDate,
      endDate,
    });
  }

  return (
    <div>
      <ChallengeCreationForm handleSubmit={handleSubmit} />
    </div>
  );
}
