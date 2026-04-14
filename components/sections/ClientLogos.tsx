import Image from 'next/image';

export default function ClientLogos() {
  const logos = [
    { name: 'Amazon', src: '/logos/clients/amazon.avif', width: 409, height: 123 },
    { name: 'Essilor', src: '/logos/clients/essilor.avif', width: 600, height: 66 },
    { name: 'Leclaireur', src: '/logos/clients/leclaireur.avif', width: 311, height: 162 },
    { name: 'Castel', src: '/logos/clients/castel.avif', width: 424, height: 119 },
    { name: 'Europart', src: '/logos/clients/europart.avif', width: 363, height: 139 },
    { name: 'Chanel', src: '/logos/clients/chanel.avif', width: 225, height: 225 },
    { name: 'Lidl', src: '/logos/clients/lidl.avif', width: 177, height: 168 },
    { name: 'GS1', src: '/logos/clients/gs1.avif', width: 245, height: 206 },
    { name: 'Safran', src: '/images/logos/client-safran.avif', width: 994, height: 228 },
    { name: 'Sandro', src: '/logos/clients/sandro.avif', width: 390, height: 100 },
    { name: 'Seiko', src: '/logos/clients/seiko.avif', width: 508, height: 99 },
    { name: 'Valentino', src: '/logos/clients/valentino.avif', width: 320, height: 157 },
    { name: 'Würth', src: '/logos/clients/wurth.avif', width: 485, height: 104 },
    { name: 'Zoomalia', src: '/logos/clients/zoomalia.avif', width: 225, height: 225 },
  ];

  return (
    <section className="py-12 px-4 bg-neutral-lighter">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-x-10 sm:gap-x-14 animate-marquee w-max">
            {[...logos, ...logos].map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="w-[90px] h-[34px] sm:w-[120px] sm:h-[40px] flex-shrink-0 flex items-center justify-center opacity-60">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  sizes="120px"
                  className="w-full h-full object-contain grayscale"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
