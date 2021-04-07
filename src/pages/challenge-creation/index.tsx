import React from "react";
import ChallengeCreationForm, {
  IValues,
} from "./components/challenge-creation-form";

export default function ChallengeCreationPage() {
  function handleSubmit(values: IValues) {
    // TODO: create challenge
  }

  return (
    <div>
      <ChallengeCreationForm handleSubmit={handleSubmit} />
    </div>
  );
}
