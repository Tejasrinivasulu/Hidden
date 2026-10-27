"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { AnimatedHeadingBlock } from "@/components/shared/AnimatedHeading";
import { useAdmin } from "@/context/AdminContext";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

/** Full contact form used on /contact page only. */
export default function ContactForm() {
  const { addContactMessage } = useAdmin();
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
    await new Promise((resolve) => setTimeout(resolve, 600));
    addContactMessage(data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className="landing-section relative flex min-h-[calc(100vh-76px)] items-start px-[5vw] pt-[calc(76px+7.5rem)] pb-28">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedHeadingBlock>
            <h1 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-[1px] text-[var(--text)]">
              Join the
              <br />
              <span className="text-primary">Community</span>
            </h1>
          </AnimatedHeadingBlock>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="my-6 mb-8 h-[3px] w-[52px] origin-left rounded-sm bg-primary"
          />
          <p className="max-w-md text-base leading-[1.85] text-[var(--muted)]">
            Ready to take your technical skills to the next level? Join ISTE and become
            part of a thriving ecosystem of innovators, leaders, and creators.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="h-full"
        >
          <div className="relative overflow-hidden rounded-2xl bg-[#0c0e12] p-7 shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 bottom-0 h-16 rounded-full bg-primary/40 blur-2xl"
            />

            {isSuccess ? (
              <div className="relative z-10 flex min-h-[300px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Send size={24} />
                </div>
                <h3 className="mb-2 font-display text-2xl text-white">Message Sent!</h3>
                <p className="text-white/55">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 flex h-full flex-col justify-between gap-5"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Your Name"
                      className="w-full rounded-lg border border-white/10 bg-[#f4f6f8] px-4 py-3.5 text-[var(--text)] placeholder:text-[var(--muted)]/60 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
                    />
                    {errors.name && (
                      <span className="mt-1 block font-mono text-sm text-red-400">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      placeholder="Your Email"
                      className="w-full rounded-lg border border-white/10 bg-[#f4f6f8] px-4 py-3.5 text-[var(--text)] placeholder:text-[var(--muted)]/60 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
                    />
                    {errors.email && (
                      <span className="mt-1 block font-mono text-sm text-red-400">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <textarea
                      {...register("message")}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full resize-none rounded-lg border border-white/10 bg-[#f4f6f8] px-4 py-3.5 text-[var(--text)] placeholder:text-[var(--muted)]/60 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/30"
                    />
                    {errors.message && (
                      <span className="mt-1 block font-mono text-sm text-red-400">
                        {errors.message.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-mono text-[0.72rem] font-medium tracking-[3px] text-white uppercase transition duration-300 hover:bg-[#3b6ef0] hover:shadow-[0_10px_28px_rgba(30,79,214,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={16} />}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
