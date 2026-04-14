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
    { name: 'Safran', src: '/images/logos/client-safran.avif', width: 960, height: 340 },
    { name: 'Sandro', src: '/logos/clients/sandro.avif', width: 390, height: 100 },
    { name: 'Seiko', src: '/logos/clients/seiko.avif', width: 508, height: 99 },
    { name: 'Valentino', src: '/logos/clients/valentino.avif', width: 320, height: 157 },
    { name: 'Würth', src: '/logos/clients/wurth.avif', width: 485, height: 104 },
    { name: 'Zoomalia', src: '/logos/clients/zoomalia.avif', width: 225, height: 225 },
  ];

  return (
    <section className="py-12 px-4 bg-neutral-lighter">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, idx) => (
            <div key={idx} className="h-12 flex items-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
