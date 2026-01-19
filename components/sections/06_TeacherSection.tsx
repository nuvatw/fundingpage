'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const TEACHER_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/images/teacher_image_${i}.png`
);

// 預載圖片的 hook
function usePreloadImages(images: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const imageElements: HTMLImageElement[] = [];

    const preloadAll = async () => {
      const promises = images.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          imageElements.push(img);
          img.onload = () => resolve();
          img.onerror = () => resolve(); // 即使失敗也繼續
          img.src = src;
        });
      });

      await Promise.all(promises);
      if (isMounted) setLoaded(true);
    };

    preloadAll();

    return () => {
      isMounted = false;
    };
  }, [images]);

  return loaded;
}

export function TeacherSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // 預載所有講師圖片
  usePreloadImages(TEACHER_IMAGES);

  const goToNext = useCallback(() => {
    setShouldAnimate(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TEACHER_IMAGES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setShouldAnimate(true);
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + TEACHER_IMAGES.length) % TEACHER_IMAGES.length
    );
  }, []);

  const goToImage = (index: number) => {
    setShouldAnimate(false);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldAnimate ? (dir > 0 ? '100%' : '-100%') : 0,
      opacity: shouldAnimate ? 0 : 1,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: shouldAnimate ? (dir > 0 ? '-100%' : '100%') : 0,
      opacity: shouldAnimate ? 0 : 1,
    }),
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      goToNext();
    } else if (info.offset.x > threshold) {
      goToPrev();
    }
  };

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <section id="instructor" className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900">
            講師介紹
          </h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
        >
          {/* Teacher Image Carousel */}
          <div className="w-full lg:w-2/5 flex-shrink-0">
            <div
              className="relative aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={goToNext}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={TEACHER_IMAGES[currentIndex]}
                    alt="林上哲 - AI 創作鬼才"
                    fill
                    className="object-cover object-top pointer-events-none"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center lg:justify-start gap-2 mt-4 max-w-sm mx-auto lg:mx-0">
              {TEACHER_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 w-6'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`查看圖片 ${index + 1}`}
                />
              ))}
            </div>

            {/* Name & Title */}
            <div className="mt-4 text-center lg:text-left max-w-sm mx-auto lg:mx-0">
              <h3 className="text-xl font-semibold text-neutral-900">林上哲</h3>
              <p className="text-sm text-primary-600 font-medium mt-1">
                AI 創作鬼才 · nuva 創辦人
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="w-full lg:w-3/5 space-y-5">
            <p className="text-neutral-700 leading-loose">
              林上哲常被學員稱為
              <span className="font-semibold text-primary-600">
                「AI 創作鬼才」
              </span>
              。不是工程師出身，卻跨界自學 AI 的兩年內，帶領 6000+
              位學員從零到一掌握 AI 應用，並為
              7-11、南山人壽、現代汽車等多家上市櫃企業，提供 AI
              教學與內訓服務。2025 年，他更
              <span className="font-semibold text-primary-600">
                與 NVIDIA 攜手打造聯名 AI 體驗營
              </span>
              ，將 AI 學習從「聽懂」推進到「做得到、用得上」。
            </p>

            <p className="text-neutral-700 leading-loose">
              他的起點很特別 ——{' '}
              <span className="font-semibold text-primary-600">
                Fine Dining 私人廚師
              </span>
              。長年訓練的不是寫程式，而是如何設計體驗、安排節奏、把複雜流程做成讓人願意完成的路徑。也因此，他的課程不靠艱深術語，而是用高密度的故事與任務設計，讓你在實作中自然掌握
              AI 的應用與實際的第一線導入。
            </p>

            <p className="text-neutral-700 leading-loose">
              他
              <span className="font-semibold text-primary-600">
                最懂新手的焦慮
              </span>
              與卡關：不知道從哪開始、學了卻用不出來、工具一多就混亂。這趟旅程把
              AI 變成你可立即上手的生產力，讓你邊學就能邊用！
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
