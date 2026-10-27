"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { AnimatedHeadingBlock } from "@/components/shared/AnimatedHeading";
import { useAdmin } from "@/context/AdminContext";

/** Landing CTA — Contact Us + WhatsApp community (replaces form section). */
export default function Contact() {
  const { profile } = useAdmin();
  const whatsapp =
    profile.whatsappCommunityLink ||
    "https://chat.whatsapp.com/KZNAUM1o7Qw0skVB5LA88T";

  return (
    <section id="contact" className="landing-section relative px-[5vw] py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <AnimatedHeadingBlock>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold uppercase leading-[1.08] tracking-[1px] text-[var(--text)]">
            Join the <span className="text-primary">Community</span>
          </h2>
        </AnimatedHeadingBlock>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto my-6 h-[3px] w-[52px] origin-center rounded-sm bg-primary"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-10 max-w-xl text-base leading-[1.85] text-[var(--muted)]"
        >
          Ready to take your technical skills to the next level? Join ISTE and
          become part of a thriving ecosystem of innovators, leaders, and
          creators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="flex w-full flex-col items-stretch justify-center gap-4 sm:w-auto sm:flex-row sm:items-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-[0.92rem] font-semibold text-white shadow-[0_8px_24px_rgba(30,79,214,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3b6ef0]"
          >
            Contact Us
            <Send size={17} />
          </Link>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-[#25D366]/40 bg-[#25D366] px-8 py-3.5 text-[0.92rem] font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,0.28)] transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
