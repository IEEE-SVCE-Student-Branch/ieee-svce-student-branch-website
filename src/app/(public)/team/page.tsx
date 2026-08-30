import type { Metadata } from "next";
import { TeamPageClient } from "@/components/Team/TeamPageClient";

export const metadata: Metadata = {
  title: "Team & Executive Committee | IEEE SVCE",
  description:
    "Official organizational people network of IEEE SVCE Student Branch (STB 28051): Core Executive Committee, Technical, Design, Content, Social Media, Outreach, Photography, and Executive Members.",
};

export default function TeamPage() {
  return <TeamPageClient />;
}
