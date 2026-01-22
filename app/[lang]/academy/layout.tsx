export default function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="section-formation"
      style={
        {
          // Utiliser une version plus foncée pour un meilleur contraste avec texte blanc
          // #8585ee au lieu de #cdcdfd pour respecter WCAG AA (4.5:1)
          "--section-primary": "#8585ee",
          "--section-primary-hover": "#7070d9", // Variant encore plus foncé pour hover
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
