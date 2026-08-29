import { SignalFieldHero } from "@/components/SignalField/SignalFieldHero";
import { HomeHappening } from "@/components/Home/HomeHappening";
import { HomeDiscovery } from "@/components/Home/HomeDiscovery";
import { HomeBuilds } from "@/components/Home/HomeBuilds";
import { HomeRemembers } from "@/components/Home/HomeRemembers";
import { HomeAchievements } from "@/components/Home/HomeAchievements";
import { HomeMedia } from "@/components/Home/HomeMedia";
import { HomeCommunity } from "@/components/Home/HomeCommunity";
import { HomeNetwork } from "@/components/Home/HomeNetwork";
import { HomeContact } from "@/components/Home/HomeContact";

/**
 * IEEE SVCE — Public Flagship Homepage (The Signal Field)
 *
 * Sequence of 10 Flagship Sections:
 * 01. SIGNAL FIELD HERO
 * 02. WHAT'S HAPPENING (Upcoming & active symposiums)
 * 03. DISCOVER (Semantic discovery filters)
 * 04. WHAT IEEE SVCE BUILDS (Living Lab R&D prototypes)
 * 05. WHAT IEEE SVCE REMEMBERS (Historical & archival records since 1994)
 * 06. ACHIEVEMENTS (Section & regional honors)
 * 07. MEDIA / VISUAL MEMORY (Photographic light table)
 * 08. COMMUNITY (Hall of Fame & industry connect)
 * 09. PARTNERS / NETWORK (Section governance & industry sponsors)
 * 10. CONTACT (Institutional coordinates & transmission desks)
 */
export default function HomePage() {
  return (
    <>
      {/* 01. SIGNAL FIELD HERO */}
      <SignalFieldHero />

      {/* 02. WHAT'S HAPPENING */}
      <HomeHappening />

      {/* 03. DISCOVER */}
      <HomeDiscovery />

      {/* 04. WHAT IEEE SVCE BUILDS */}
      <HomeBuilds />

      {/* 05. WHAT IEEE SVCE REMEMBERS */}
      <HomeRemembers />

      {/* 06. ACHIEVEMENTS */}
      <HomeAchievements />

      {/* 07. MEDIA / VISUAL MEMORY */}
      <HomeMedia />

      {/* 08. COMMUNITY */}
      <HomeCommunity />

      {/* 09. PARTNERS / NETWORK */}
      <HomeNetwork />

      {/* 10. CONTACT */}
      <HomeContact />
    </>
  );
}
