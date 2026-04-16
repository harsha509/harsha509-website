/**
 * A calm, reading-friendly background used on blog pages.
 * Same faint grid as NeuralBackground, minus the Tron canvas, spotlight and glow.
 */
export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Soft vignette so long-form text stays legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(96, 165, 250, 0.06), transparent 60%)',
        }}
      />
    </div>
  );
}
