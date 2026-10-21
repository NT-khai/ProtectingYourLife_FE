"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/firefighter.jpg",
    title: "Protecting Your Life",
    description:
      "Trang bị kiến thức phòng cháy chữa cháy và các kỹ năng ứng phó khẩn cấp.",
  },
  {
    id: 2,
    image: "/images/rescue-team.jpg",
    title: "An Toàn Là Trên Hết",
    description:
      "Nâng cao nhận thức cộng đồng về thiên tai, tai nạn và cứu hộ cứu nạn.",
  },
  {
    id: 3,
    image: "/images/first-aid.jpg",
    title: "Sẵn Sàng Trong Mọi Tình Huống",
    description:
      "Học các kỹ năng sơ cứu để bảo vệ bản thân và những người xung quanh.",
  },
];

export default function SlideHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                }}
                className="max-w-3xl"
              >
                <span className="inline-block bg-red-600 px-4 py-2 rounded-full text-sm font-medium mb-5">
                  Emergency • Safety • Rescue
                </span>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  {slides[current].title}
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-200 leading-8">
                  {slides[current].description}
                </p>

                <div className="flex gap-4 mt-8">
                  <Link
                    href="/about"
                    className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition"
                  >
                    Tìm Hiểu Thêm
                  </Link>

                  <Link
                    href="/contact"
                    className="bg-yellow-400 text-black hover:bg-yellow-300 px-8 py-4 rounded-xl font-semibold transition"
                  >
                    Liên Hệ Ngay
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              current === index ? "w-10 bg-yellow-400" : "w-3 bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Floating Effect */}
      <div className="absolute top-24 right-20 hidden lg:block">
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="w-20 h-20 bg-red-500/20 rounded-full blur-xl"
        />
      </div>
    </section>
  );
}
