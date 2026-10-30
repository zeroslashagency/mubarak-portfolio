"use client";

import HoverCard from "@/components/hover-card";

export default function HoverExamplePage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">3D Hover Effect Example</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: "Blue Glow",
            description:
              "This card uses a blue glow effect with moderate rotation intensity.",
            glowColor: "rgba(59, 130, 246, 0.5)",
            rotateIntensity: 8,
          },
          {
            title: "Orange Highlight",
            description:
              "This card uses the default orange glow with higher intensity rotation.",
            glowColor: "rgba(249, 115, 22, 0.4)",
            rotateIntensity: 12,
          },
          {
            title: "Green Accent",
            description:
              "This card has a green glow effect with a subtle rotation.",
            glowColor: "rgba(16, 185, 129, 0.4)",
            rotateIntensity: 5,
          },
        ].map((card, index) => (
          <HoverCard
            key={index}
            className="p-6 w-full"
            glowColor={card.glowColor}
            rotateIntensity={card.rotateIntensity}
          >
            <h2 className="text-xl font-bold mb-3">{card.title}</h2>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <p className="text-sm text-gray-500">
              Move your mouse across this card to see the 3D rotation and glow
              effect in action.
            </p>
          </HoverCard>
        ))}
      </div>

      <div className="mt-12 max-w-2xl">
        <HoverCard className="p-8" rotateIntensity={5} glowIntensity={20}>
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <p className="mb-4">
            This card uses pure CSS and React state to create a 3D effect that
            follows your mouse movement. The rotation is calculated based on the
            mouse position relative to the card&apos;s center.
          </p>
          <p className="mb-4">
            The glow effect is created using a radial gradient that also follows
            your mouse position, creating the impression of a light source
            moving with your cursor.
          </p>
          <p>
            This approach is more stable than Framer Motion&apos;s rotateX/rotateY
            properties, which can sometimes cause issues with unit conversion.
          </p>
        </HoverCard>
      </div>
    </div>
  );
}
