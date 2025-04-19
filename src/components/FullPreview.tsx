import { ReactNode, useState } from "react";
import { Portfolio, SectionField } from "../types/Portfolio";
import PortfolioNavbar from "./PortfolioNavbar";

const FullPreview = ({ data }: { data: Portfolio }) => {
  const [previewSize, setPreviewSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

  return (
    <div className="space-y-16 bg-white p-8 shadow rounded">
      <PortfolioNavbar sections={data.sections} />
      <div className="flex justify-end gap-2 mb-4">
        {["desktop", "tablet", "mobile"].map((size) => (
          <button
            key={size}
            onClick={() => setPreviewSize(size as typeof previewSize)}
            className={`px-3 py-1 border rounded text-sm capitalize
              ${previewSize === size ? "bg-blue-600 text-white" : "bg-white text-gray-700"}
            `}
          >
            {size}
          </button>
        ))}
      </div>
      {Array.isArray(data.sections) && data.sections.length === 0 ? (
        <p className="text-gray-500 italic">No sections yet. Use the editor to add some!</p>
      ) : (
        <div
          className={`mx-auto transition-all duration-300 
            ${previewSize === "desktop" ? "max-w-5xl" : ""}
            ${previewSize === "tablet" ? "max-w-2xl scale-[97%]" : ""}
            ${previewSize === "mobile" ? "max-w-sm scale-[90%]" : ""}
          `}
        >
          {data.sections.map((section) => (
            <section
              key={section.anchor || section.label}
              {...(section.anchor ? { id: section.anchor } : {})}
              style={{
                backgroundColor: section.bgColor || undefined,
                color: section.textColor || undefined,
                textAlign: section.textAlign || 'left',
              }}
              className={`
                mb-12 p-4 rounded
                ${section.stylePreset === "card" ? "bg-white shadow border" : ""}
                ${section.stylePreset === "highlight" ? "bg-blue-600 text-white" : ""}
              `}
            >
              <h2 className="text-xl font-bold mb-2">{section.label}</h2>
              {section.blocks.map((block, i) => {
                if (block.type === "text" || block.type === "textarea") {
                  return <p key={i} className="mb-2 whitespace-pre-line">{block.content as ReactNode}</p>;
                }
                if (block.type === "tags") {
                  return (
                    <ul key={i} className="flex flex-wrap gap-2">
                      {(block.content as string[]).map((tag, j) => (
                        <li key={j} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "multi-text") {
                  return (
                    <ul key={i} className="space-y-1">
                      {(block.content as SectionField[]).map((field, j) => (
                        <li key={j}><strong>{field.label}:</strong> {field.value}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote key={i} className="italic border-l-4 pl-4 border-blue-400 text-gray-700">
                      {block.content as ReactNode}
                    </blockquote>
                  );
                }
                
                if (block.type === "image") {
                  return (
                    <img
                      key={i}
                      src={block.content as string}
                      alt=""
                      className="max-w-full rounded shadow my-4"
                    />
                  );
                }
                
                if (block.type === "link-list") {
                  return (
                    <ul key={i} className="list-disc pl-4 space-y-1">
                      {(block.content as SectionField[]).map((link, j) => (
                        <li key={j}>
                          <a
                            href={link.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </section>
          ))}
        </div>
      )}
    </div>
  );
};


export default FullPreview;
