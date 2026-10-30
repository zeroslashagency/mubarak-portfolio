"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBox from "./animated-box";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    }, 1500);
  }

  return (
    <section id="contact" className="py-12">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedBox
            className="p-8"
            rotateAmount={1.5}
            glowIntensity={15}
            glowColor="rgba(224, 122, 95, 0.4)"
            borderColor="rgba(224, 122, 95, 0.2)"
          >
            {/* Animated sketchy circles */}
            <div className="absolute w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="absolute inset-0 border-2 border-[#E07A5F] rounded-full animate-[spin_20s_linear_infinite] [transform-origin:51%_49%]"
                style={{
                  clipPath:
                    "polygon(50% 0%, 53% 8%, 60% 15%, 65% 25%, 70% 35%, 72% 45%, 73% 55%, 72% 65%, 70% 75%, 65% 85%, 55% 92%, 45% 95%, 35% 92%, 25% 85%, 20% 75%, 15% 65%, 13% 55%, 12% 45%, 15% 35%, 20% 25%, 25% 15%, 32% 8%, 40% 3%)",
                }}
              />

              <div
                className="absolute inset-0 border-2 border-[#F4A261] rounded-full animate-[spin_15s_linear_infinite_reverse] [transform-origin:49%_51%]"
                style={{
                  clipPath:
                    "polygon(50% 0%, 55% 5%, 63% 12%, 68% 22%, 72% 32%, 74% 42%, 75% 52%, 74% 62%, 72% 72%, 67% 82%, 57% 89%, 47% 92%, 37% 89%, 27% 82%, 22% 72%, 17% 62%, 15% 52%, 14% 42%, 17% 32%, 22% 22%, 27% 12%, 34% 5%, 42% 0%)",
                }}
              />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <motion.div
                className="mb-2 text-sm tracking-[0.2em] text-gray-400 uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Introducing
              </motion.div>
              <div className="relative">
                <motion.h2
                  className="font-sans text-6xl font-black tracking-tight text-gray-400/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  CONTACT
                </motion.h2>
              </div>
              <div className="relative mt-4">
                <motion.h3
                  className="font-sans text-5xl font-black tracking-tight text-gray-400/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  US
                </motion.h3>
              </div>
              <motion.p
                className="font-sans text-gray-400 max-w-[300px] mx-auto text-xl mt-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                It is very important for us to keep in touch with you, so we are
                always ready to answer any question that interests you. Shoot!
              </motion.p>
            </div>
          </AnimatedBox>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <AnimatedBox
                key="success"
                className="p-8"
                rotateAmount={1}
                glowIntensity={20}
                glowColor="rgba(39, 174, 96, 0.3)"
              >
                <div className="relative">
                  <motion.div
                    className="h-20 w-20 rounded-full bg-gradient-to-br from-[#E07A5F] to-[#F4A261] flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <motion.h3
                    className="font-['Satisfy'] text-3xl text-center mb-3 bg-gradient-to-r from-[#E07A5F] to-[#F4A261] text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Message Sent!
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Thank you for reaching out. I'll get back to you soon.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full border-[#E07A5F]/20 hover:bg-gradient-to-r hover:from-[#E07A5F]/10 hover:to-[#F4A261]/10 font-['Satisfy'] text-lg transition-all duration-300"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                </div>
              </AnimatedBox>
            ) : (
              <AnimatedBox
                key="form"
                className="p-8"
                rotateAmount={1}
                glowIntensity={15}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative"
                >
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative mb-1">
                                <div className="font-sans text-2xl font-black tracking-tight text-gray-400/80">
                                  NAME
                                </div>
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  {...field}
                                  className="h-12 px-4 rounded-xl border-[#E07A5F]/20 bg-background/50 focus:border-[#F4A261]/50 focus:ring-[#F4A261]/20 font-sans text-lg transition-all duration-300 placeholder:text-gray-400/50"
                                />
                              </FormControl>
                              <FormMessage className="font-sans text-lg pl-1" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative mb-1">
                                <div className="font-sans text-2xl font-black tracking-tight text-gray-400/80">
                                  EMAIL
                                </div>
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="Your email"
                                  {...field}
                                  className="h-12 px-4 rounded-xl border-[#E07A5F]/20 bg-background/50 focus:border-[#F4A261]/50 focus:ring-[#F4A261]/20 font-sans text-lg transition-all duration-300 placeholder:text-gray-400/50"
                                />
                              </FormControl>
                              <FormMessage className="font-sans text-lg pl-1" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative mb-1">
                                <div className="font-sans text-2xl font-black tracking-tight text-gray-400/80">
                                  SUBJECT
                                </div>
                              </div>
                              <FormControl>
                                <Input
                                  placeholder="Message subject"
                                  {...field}
                                  className="h-12 px-4 rounded-xl border-[#E07A5F]/20 bg-background/50 focus:border-[#F4A261]/50 focus:ring-[#F4A261]/20 font-sans text-lg transition-all duration-300 placeholder:text-gray-400/50"
                                />
                              </FormControl>
                              <FormMessage className="font-sans text-lg pl-1" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative mb-1">
                                <div className="font-sans text-2xl font-black tracking-tight text-gray-400/80">
                                  MESSAGE
                                </div>
                              </div>
                              <FormControl>
                                <Textarea
                                  placeholder="Your message"
                                  className="min-h-[150px] p-4 rounded-xl resize-none border-[#E07A5F]/20 bg-background/50 focus:border-[#F4A261]/50 focus:ring-[#F4A261]/20 font-sans text-lg transition-all duration-300 placeholder:text-gray-400/50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="font-sans text-lg pl-1" />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow:
                              "0 10px 25px -5px rgba(224, 122, 95, 0.2), 0 10px 10px -5px rgba(244, 162, 97, 0.1)",
                          }}
                        >
                          <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-[#E07A5F] to-[#F4A261] text-white hover:opacity-90 font-['Satisfy'] text-xl rounded-xl transition-all duration-300"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2 justify-center">
                                <svg
                                  className="animate-spin h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                <span>Sending...</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-2 justify-center">
                                Send Message
                                <Send className="h-5 w-5" />
                              </span>
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </form>
                  </Form>
                </motion.div>
              </AnimatedBox>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
