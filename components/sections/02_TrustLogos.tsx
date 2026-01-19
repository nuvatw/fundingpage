import Image from 'next/image';

const trustLogos = [
  { src: '/images/logo_trust_0.png', alt: 'Trust Partner 1' },
  { src: '/images/logo_trust_1.png', alt: 'Trust Partner 2' },
  { src: '/images/logo_trust_2.png', alt: 'Trust Partner 3' },
  { src: '/images/logo_trust_3.png', alt: 'Trust Partner 4' },
  { src: '/images/logo_trust_4.png', alt: 'Trust Partner 5' },
  { src: '/images/logo_trust_5.png', alt: 'Trust Partner 6' },
  { src: '/images/logo_trust_6.png', alt: 'Trust Partner 7' },
  { src: '/images/logo_trust_7.png', alt: 'Trust Partner 8' },
  { src: '/images/logo_trust_8.png', alt: 'Trust Partner 9' },
  { src: '/images/logo_trust_9.png', alt: 'Trust Partner 10' },
];

export function TrustLogos() {
  return (
    <>
      <style>
        {`
          @keyframes trust-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .trust-marquee-track {
            animation: trust-marquee 40s linear infinite;
          }
        `}
      </style>
      <section className="py-10 bg-white overflow-hidden">
        <p className="text-center text-zinc-400 text-sm mb-8 tracking-wide">
          受信任的合作夥伴
        </p>

        {/* Marquee container */}
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="flex w-max gap-10 trust-marquee-track">
            {/* First set of logos */}
            {trustLogos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="shrink-0 relative h-12 w-36 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {trustLogos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="shrink-0 relative h-12 w-36 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
