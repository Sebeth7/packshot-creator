import Image from 'next/image';

export default function ClientLogos() {
  const logos = [
    { name: 'Amazon', src: '/logos/clients/amazon.svg', width: 409, height: 123 },
    { name: 'Essilor', src: '/logos/clients/essilor.svg', width: 600, height: 66 },
    { name: 'Leclaireur', src: '/logos/clients/leclaireur.svg', width: 311, height: 162 },
    { name: 'Castel', src: '/logos/clients/castel.svg', width: 424, height: 119 },
    { name: 'Europart', src: '/logos/clients/europart.svg', width: 363, height: 139 },
    { name: 'Chanel', src: '/logos/clients/chanel.svg', width: 225, height: 225 },
    { name: 'Lidl', src: '/logos/clients/lidl.svg', width: 177, height: 168 },
    { name: 'GS1', src: '/logos/clients/gs1.svg', width: 245, height: 206 },
    { name: 'Jägermeister', src: '/logos/clients/jagermeister.svg', width: 187, height: 167 },
    { name: 'Bosch', src: '/logos/clients/bosch.svg', width: 462, height: 109 },
    { name: 'Sandro', src: '/logos/clients/sandro.svg', width: 390, height: 100 },
    { name: 'Seiko', src: '/logos/clients/seiko.svg', width: 508, height: 99 },
    { name: 'Valentino', src: '/logos/clients/valentino.svg', width: 320, height: 157 },
    { name: 'Würth', src: '/logos/clients/wurth.svg', width: 485, height: 104 },
    { name: 'Zoomalia', src: '/logos/clients/zoomalia.svg', width: 225, height: 225 },
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
