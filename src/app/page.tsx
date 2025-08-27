import Header from "./components/header";
import HeroSection from "./components/hero-section";
import { LatestArticles } from "./components/latest-articles";
import { PopularArticles } from "./components/popular-articles";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <PopularArticles />
      <LatestArticles />
    </>
  );
}
