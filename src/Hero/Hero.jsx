import "./Hero.css";

import HeroLeft from "./HeroLeft";
import HeroCenter from "./HeroCenter";
import HeroRight from "./HeroRight";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <HeroLeft />

        <HeroCenter />

        <HeroRight />
      </div>
    </section>
  );
}

export default Hero;
