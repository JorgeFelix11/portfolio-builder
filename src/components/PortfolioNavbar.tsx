import { CustomSection } from "../types/Portfolio";

const PortfolioNavbar = ({
  sections,
  portfolioName,
}: {
  sections: CustomSection[];
  portfolioName: string;
}) => {
  const visibleLinks = sections.filter((s) => s.showInNavbar && s.anchor);

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow px-6 py-3 flex justify-between items-center">
      {/* Nombre del portfolio a la izquierda */}
      <span className="text-lg font-semibold text-gray-800 dark:text-white">
        {portfolioName}
      </span>

      {/* Navegación a la derecha */}
      <div className="flex gap-6">
        {visibleLinks.map((s) => (
          <a
            key={s.anchor}
            href={`#${s.anchor}`}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default PortfolioNavbar;
