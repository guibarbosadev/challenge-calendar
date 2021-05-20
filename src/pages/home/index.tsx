import React from "react";
import { Redirect } from "react-router";
import { observer } from "mobx-react";
import { ERoutes } from "../../routes";
import ChallengeCreationPage from "../challenge-creation";
import { useRootStore } from "../../stores";

export const HomePage = observer(() => {
  const { challengeStore } = useRootStore();
  const { challenges, didLoadChallenges } = challengeStore;
  const [isLoading, setIsLoading] = React.useState(
    !challengeStore.didLoadChallenges
  );

  const getChallenges = () => {
    const shouldLoadChallenges = !didLoadChallenges;
    const getChallenges = async () => {
      setIsLoading(true);
      await challengeStore.getChallenges();
      setIsLoading(false);
    };

    if (shouldLoadChallenges) {
      getChallenges();
    }
  };

  React.useEffect(getChallenges, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : challenges.length > 0 ? (
    <Redirect to={ERoutes.Calendar} />
  ) : (
    <ChallengeCreationPage />
  );
});
