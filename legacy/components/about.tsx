"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <div className="mb-2 text-sm tracking-[0.2em] text-gray-400 uppercase">
            Introducing
          </div>
          <div className="relative">
            <h2 className="font-sans text-6xl font-black tracking-tight text-gray-400/80">
              ABOUT
            </h2>
          </div>
          <div className="relative mt-4">
            <h3 className="font-sans text-5xl font-black tracking-tight text-gray-400/80">
              ME
            </h3>
          </div>
          <p className="font-sans text-gray-400 max-w-[300px] mx-auto text-xl mt-8 leading-relaxed">
            I'm a passionate developer with expertise in creating beautiful and
            functional web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E07A5F] to-[#F4A261] rounded-full blur-3xl opacity-20" />

              <div className="relative rounded-full overflow-hidden border-4 border-[#E07A5F]/20">
                <Image
                  src="/profile.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative p-8 rounded-xl border border-[#E07A5F]/20 bg-background/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E07A5F]/5 to-[#F4A261]/5 rounded-xl" />

              <div className="relative space-y-6">
                <div className="space-y-4">
                  <div className="relative mb-1">
                    <div className="font-sans text-2xl font-black tracking-tight text-gray-400/80">
                      SOFTWARE ENGINEER
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I started my journey in web development with a passion for
                    creating beautiful and functional websites. Over the years,
                    I've worked on various projects ranging from small business
                    websites to complex web applications.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative mb-1">
                    <div className="font-sans text-2xl font-black tracking-tight text-gray-400/80">
                      PROFESSIONAL JOURNEY
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "Python",
                      "UI/UX Design",
                    ].map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full border border-[#E07A5F]/20 bg-background/50 text-gray-300 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative mb-1">
                    <div className="font-sans text-2xl font-black tracking-tight text-gray-400/80">
                      EDUCATION
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-[#E07A5F]/20 bg-background/50 backdrop-blur-sm">
                    <div className="font-sans text-xl font-black tracking-tight text-gray-400/80">
                      Electronics and Communication Engineering
                    </div>
                    <p className="text-gray-300">
                      Anna University • 2020 - 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
