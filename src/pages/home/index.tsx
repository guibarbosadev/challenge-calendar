import { observer } from "mobx-react";
import React from "react";

export const HomePage = observer(() => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    // TODO: get challenges
  }, []);
  return <div>HomePage</div>;
});
