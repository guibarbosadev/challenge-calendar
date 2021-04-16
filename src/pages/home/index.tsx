import React from "react";
import { Redirect } from "react-router";
import { observer } from "mobx-react";
import { ERoutes } from "../../routes";
import { useChallengeStore } from "../../stores/challenge";

export const HomePage = observer(() => {
  const [isLoading, setIsLoading] = React.useState(false);
  const challengeStore = useChallengeStore();

  const getChallenges = () => {
    const shouldLoadChallenges = !challengeStore.didLoadChallenges;
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

  return !challengeStore.didLoadChallenges && isLoading ? (
    <div>Loading...</div>
  ) : challengeStore.challenges.length > 0 ? (
    <div>
      {console.log("one, ", challengeStore.challenges.length)}
      <Redirect to={ERoutes.Calendar} />
    </div>
  ) : (
    <div>
      {console.log("two", challengeStore.challenges.length)}
      <Redirect to={ERoutes.CreateChallenge} />
    </div>
  );
});
