import type { Metadata } from "next";
import { StoryFilm } from "@/components/site/story-film";

export const metadata: Metadata = { title: "My story" };

export default function Me() {
  return <StoryFilm />;
}
