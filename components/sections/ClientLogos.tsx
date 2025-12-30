export default function ClientLogos() {
  const logos = [
    { name: 'Europart', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228ae9f6de0d7511956d_Europart.svg' },
    { name: 'Chanel', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751195b7_Chanel_logo_interlocking_cs.svg' },
    { name: 'Intersport', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228ae9f6de0d75119598_Intersport_logo.svg' },
    { name: 'Lidl', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228ae9f6de0d75119545_Lidl_logo.svg' },
    { name: 'GS1', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d751195e5_GS1_logo.svg' },
    { name: 'Jagermeister', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d75119616_J%C3%A4germeister_Logo.svg' },
    { name: 'Bosch', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d75119647_Bosch_logo.svg' },
    { name: 'Sandro', src: 'https://cdn.prod.website-files.com/6682a557f105555299d5aeae/6753228be9f6de0d75119678_Sandro_Paris_logo.svg' }
  ];

  return (
    <section className="py-12 px-4 bg-neutral-lighter">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, idx) => (
            <div key={idx} className="h-12 flex items-center">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-full w-auto max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
