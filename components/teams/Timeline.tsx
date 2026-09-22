"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const timelineEvents = [
  { year: "2019", title: "Club Formation", description: "The inception of the ISTE MBU Student Chapter with a small group of passionate students." },
  { year: "2020", title: "First Major Event", description: "Successfully hosted our first inter-college technical symposium." },
  { year: "2021", title: "100+ Members Milestone", description: "Grew our community significantly, establishing core specialized teams." },
  { year: "2022", title: "National Level Tech Fest", description: "Organized a massive 3-day technical festival with participants nationwide." },
  { year: "2024", title: "Digital Ecosystem Launch", description: "Revamped our digital presence and expanded our technical outreach." },
];

export default function Timeline() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 px-[5vw] bg-[#071120] relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-white">
            Our <span className="text-[#4ADE80]">Journey</span>
          </h2>
        </div>

        <div className="relative border-l-2 border-[rgba(255,255,255,0.1)] ml-4 md:ml-1/2 md:translate-x-[calc(50vw_-_min(50vw,36rem))] md:border-none">
          {/* Desktop Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.1)] -translate-x-1/2" />

          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-[-2px] md:left-1/2 top-0 w-[2px] bg-[#4ADE80] shadow-[0_0_15px_#4ADE80] md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-12">
            {timelineEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.3 }}
                  className={`relative pl-8 md:pl-0 flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[-5px] md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-3 h-3 bg-[#071120] border-2 border-[#4ADE80] rounded-full z-10 shadow-[0_0_10px_#4ADE80]" />

                  {/* Content */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <span className="font-mono text-xl font-bold text-[#4ADE80] mb-2 block">
                      {event.year}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-[#B8C7D9] text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


