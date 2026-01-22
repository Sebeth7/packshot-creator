export default function CreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="section-creation"
      style={
        {
          "--section-primary": "var(--primary-creation)",
          "--section-primary-hover": "var(--accent-coral)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
