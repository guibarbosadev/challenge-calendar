import React from "react";
import ChallengeCreationForm from "./components/challenge-creation-form";
import { IValues } from "./components/challenge-creation-form/index";

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
