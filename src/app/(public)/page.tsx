import { SignalFieldHero } from "@/components/SignalField/SignalFieldHero";
import { SignalFieldSwitch } from "@/components/SignalField/SignalFieldSwitch";
import { CuriosityConstellation } from "@/components/SignalField/CuriosityConstellation";

/**
 * IEEE SVCE — Public Homepage (The Signal Field)
 *
 * Visual shell composing:
 * 1. SignalFieldHero (Interactive primary viewport with discovery filters & magnetic ROLL THE SIGNAL)
 * 2. SignalFieldSwitch (NOW | MEMORY central state switch transforming the active signal field)
 * 3. CuriosityConstellation (Gateways into the Page Worlds: Blueprint, Living Lab, Time Machine, Constellation)
 */
export default function HomePage() {
  return (
    <>
      {/* 1. Primary Interactive Signal Field Hero */}
      <SignalFieldHero />

      {/* 2. NOW | MEMORY Central State Switch */}
      <SignalFieldSwitch />

      {/* 3. Gateways into the Page Worlds */}
      <CuriosityConstellation />
    </>
  );
}
