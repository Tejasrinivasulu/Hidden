"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderGlow from "@/components/ui/BorderGlow";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="contact" className="py-28 px-[5vw] bg-surface2 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
        >
          <span className="font-mono text-[0.6rem] tracking-[5px] text-amber mb-3 block uppercase">
            // 05 — Get in Touch
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] tracking-[2px] uppercase leading-none text-paper">
            Join the
            <br />
            <span className="text-amber">Community</span>
          </h2>
          <div className="w-[50px] h-[2px] bg-gradient-to-r from-amber to-electric my-6 rounded-sm mb-8" />
          <p className="text-base leading-[1.85] text-text-dim max-w-md">
            Ready to take your technical skills to the next level? Join ISTE and become part of a thriving ecosystem of innovators, leaders, and creators.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="h-full"
        >
          <BorderGlow glowColor="232 160 32" className="!p-0 h-full w-full">
            <SpotlightCard spotlightColor="rgba(232, 160, 32, 0.15)" className="bg-ink p-8 rounded border border-border h-full w-full">
              {isSuccess ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-amber/10 text-amber flex items-center justify-center mb-4">
                    <Send size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-paper mb-2">Message Sent!</h3>
                  <p className="text-text-dim">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 h-full justify-between">
                  <div className="flex flex-col gap-5">
                    <div>
                      <input
                        {...register("name")}
                        placeholder="Your Name"
                        className="w-full bg-surface border border-border rounded px-4 py-3 text-paper placeholder:text-text-dim/50 focus:outline-none focus:border-amber transition-colors"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm mt-1 block font-mono">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("email")}
                        placeholder="Your Email"
                        className="w-full bg-surface border border-border rounded px-4 py-3 text-paper placeholder:text-text-dim/50 focus:outline-none focus:border-amber transition-colors"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm mt-1 block font-mono">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <textarea
                        {...register("message")}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full bg-surface border border-border rounded px-4 py-3 text-paper placeholder:text-text-dim/50 focus:outline-none focus:border-amber transition-colors resize-none"
                      />
                      {errors.message && (
                        <span className="text-red-500 text-sm mt-1 block font-mono">
                          {errors.message.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-mono text-[0.72rem] tracking-[3px] uppercase w-full py-4 bg-amber text-ink rounded font-medium transition-all duration-300 hover:bg-[#ffbe45] hover:shadow-[0_10px_25px_rgba(232,160,32,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send size={16} />}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </BorderGlow>
        </motion.div>
      </div>
    </section>
  );
}
