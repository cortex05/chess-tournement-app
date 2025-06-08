import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { LOCAL_TOURNAMENTS_KEY } from "../../data/keys";

const Saved = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noTournaments, setNoTournaments] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true);
    // check for keys
    const jsonValue = localStorage.getItem(LOCAL_TOURNAMENTS_KEY);
    console.log()
    // const value = jsonValue !== null ? JSON.parse(jsonValue) : null
    if (!jsonValue) {
      setNoTournaments(true)
      // localStorage.setItem(LOCAL_TOURNAMENTS_KEY, LOCAL_TOURNAMENTS_KEY);
    }

    setIsLoading(false)
    // if true -> proceed
    // if not
    // make a new keys
    //   const jsonTournament = JSON.stringify(tournament);
    // localStorage.setItem(key, jsonTournament);
  }, []);
  return (
    <>
      <Header lossCheck={false} />
      <div>
        {isLoading && <div>LOADING</div>}
        {!isLoading && !noTournaments && <section>Main saved content</section>}
        {!isLoading && noTournaments && <section>There are no saved tournaments. Go to the home page and make a new one.</section>}
      </div>
    </>
  );
};

export default Saved;
