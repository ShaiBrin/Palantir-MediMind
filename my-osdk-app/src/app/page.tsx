"use client";
import useAuthenticated from "@/lib/useAuthenticated";
import HomePageButtons from "./components/ui/HomePageButtons";

function Home() {
  const authenticated = useAuthenticated();

  if (!authenticated) {
    return null;
  }


  return (
      <HomePageButtons />
  );
}

export default Home;