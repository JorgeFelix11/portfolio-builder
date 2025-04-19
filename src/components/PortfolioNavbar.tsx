import { CustomSection } from "../types/Portfolio";

const PortfolioNavbar = ({ sections }: { sections: CustomSection[] }) => {
  const visibleLinks = sections.filter(
    (s) => s.showInNavbar && s.anchor
  );

  return (
    <nav className="sticky top-0 z-40 bg-white shadow px-6 py-3 flex gap-6">
      {visibleLinks.map((s) => (
        <a
          key={s.anchor}
          href={`#${s.anchor}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
};

export default PortfolioNavbar;