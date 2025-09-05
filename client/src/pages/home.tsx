import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import CategoryMenu from "@/components/category-menu";

export default function Home() {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const handleExploreMenu = () => {
    setShowCategoryMenu(true);
  };

  const handleCloseCategoryMenu = () => {
    setShowCategoryMenu(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection onExploreMenu={handleExploreMenu} />
      <CategoryMenu isOpen={showCategoryMenu} onClose={handleCloseCategoryMenu} />
    </div>
  );
}
