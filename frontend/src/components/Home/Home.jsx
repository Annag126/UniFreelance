import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
        {isAuthorized && (
          <>
            {/* Add any authenticated-only content here */}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
