export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="section-blog"
      style={
        {
          "--section-primary": "var(--primary-blog)",
          "--section-primary-hover": "#b5d144", // Lime plus foncé
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
