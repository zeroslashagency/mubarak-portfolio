"use client";

import React from "react";
import AnimatedContainer from "./AnimatedContainer";
import {
  ChevronRight,
  Mail,
  Phone,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

export default function AnimationExample() {
  return (
    <div className="py-12 container mx-auto max-w-6xl px-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        Interactive Animation Examples
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Mouse-Tracking Boxes</h2>
          <p className="text-gray-600 mb-6">
            Hover over these boxes to see 3D rotation and glow effects that
            follow your mouse.
          </p>

          <AnimatedContainer
            className="rounded-xl border border-blue-200 p-6 bg-white shadow-sm"
            rotateAmount={3}
            glowColor="rgba(59, 130, 246, 0.3)"
            enterAnimation="fade"
          >
            <h3 className="text-xl font-semibold mb-2">Card with Blue Glow</h3>
            <p className="text-gray-600">
              This card has a blue glow effect and more pronounced rotation. Try
              moving your mouse around to see how it tracks your movement.
            </p>
          </AnimatedContainer>

          <AnimatedContainer
            className="rounded-xl border border-purple-200 p-6 bg-white shadow-sm"
            rotateAmount={1.5}
            glowColor="rgba(147, 51, 234, 0.3)"
            enterAnimation="slide-up"
            delay={0.1}
          >
            <h3 className="text-xl font-semibold mb-2">
              Card with Purple Glow
            </h3>
            <p className="text-gray-600">
              This card has a subtle rotation effect with a purple glow. The
              animation is more subtle for a refined experience.
            </p>
          </AnimatedContainer>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Interactive Elements</h2>
          <p className="text-gray-600 mb-6">
            These elements have different entrance animations and hover effects.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {["slide-left", "slide-right", "slide-up", "slide-down"].map(
              (animation, index) => (
                <AnimatedContainer
                  key={animation}
                  className="rounded-xl border border-gray-200 p-4 bg-white text-center"
                  enterAnimation={animation as any}
                  delay={index * 0.1}
                  rotateAmount={1}
                  hoverScale={1.05}
                >
                  <p className="font-medium">{animation}</p>
                  <p className="text-sm text-gray-500">Entrance Animation</p>
                </AnimatedContainer>
              ),
            )}
          </div>

          <AnimatedContainer
            className="rounded-xl border border-green-200 p-6 bg-white shadow-sm mt-4"
            rotateAmount={1}
            glowColor="rgba(16, 185, 129, 0.3)"
            enterAnimation="zoom"
            delay={0.3}
          >
            <h3 className="text-xl font-semibold mb-2">Zoom Animation</h3>
            <p className="text-gray-600">
              This card enters with a zoom animation and has a green glow
              effect.
            </p>
          </AnimatedContainer>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Contact Buttons with Animation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Email",
              icon: <Mail className="h-5 w-5" />,
              color: "rgba(239, 68, 68, 0.3)",
              borderColor: "border-red-200",
            },
            {
              name: "Phone",
              icon: <Phone className="h-5 w-5" />,
              color: "rgba(16, 185, 129, 0.3)",
              borderColor: "border-green-200",
            },
            {
              name: "Social",
              icon: <Twitter className="h-5 w-5" />,
              color: "rgba(59, 130, 246, 0.3)",
              borderColor: "border-blue-200",
            },
          ].map((item, index) => (
            <AnimatedContainer
              key={item.name}
              className={`rounded-xl ${item.borderColor} border p-4 bg-white shadow-sm`}
              rotateAmount={1}
              glowColor={item.color}
              enterAnimation="slide-up"
              delay={index * 0.1}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">{item.icon}</div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Social Media Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Twitter",
              icon: <Twitter className="h-6 w-6" />,
              color: "rgba(29, 161, 242, 0.3)",
              bgColor: "bg-[#1DA1F2]/5",
              textColor: "text-[#1DA1F2]",
              borderColor: "border-[#1DA1F2]/20",
            },
            {
              name: "GitHub",
              icon: <Github className="h-6 w-6" />,
              color: "rgba(36, 41, 46, 0.3)",
              bgColor: "bg-[#24292E]/5",
              textColor: "text-[#24292E]",
              borderColor: "border-[#24292E]/20",
            },
            {
              name: "LinkedIn",
              icon: <Linkedin className="h-6 w-6" />,
              color: "rgba(0, 119, 181, 0.3)",
              bgColor: "bg-[#0077B5]/5",
              textColor: "text-[#0077B5]",
              borderColor: "border-[#0077B5]/20",
            },
          ].map((item, index) => (
            <AnimatedContainer
              key={item.name}
              className={`rounded-xl ${item.borderColor} border p-6 ${item.bgColor} shadow-sm`}
              rotateAmount={2}
              glowColor={item.color}
              enterAnimation="slide-up"
              delay={0.2 + index * 0.1}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`p-4 rounded-full ${item.bgColor} ${item.textColor} mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className={`text-xl font-semibold ${item.textColor}`}>
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  Connect with us on {item.name}
                </p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </div>
  );
}
