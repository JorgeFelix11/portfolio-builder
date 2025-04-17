import { Template } from "../types/Portfolio";

type Props = {
  selected: Template;
  onSelect: (template: Template) => void;
};

const TemplateGallery = ({ selected, onSelect }: Props) => {
  const templates: Template[] = [
    "clean",
    "bold",
    "minimal",
    "classic",
    "modern",
    "terminal",
    "soft",
  ];

  const renderStyle = (template: Template) => {
    switch (template) {
      case "clean":
        return "bg-white text-gray-800 border-gray-200";
      case "bold":
        return "bg-yellow-50 text-yellow-800 border-yellow-400";
      case "minimal":
        return "bg-gray-50 text-gray-600 border-gray-300";
      case "classic":
        return "bg-white text-gray-900 font-serif border-gray-400";
      case "modern":
        return "bg-gradient-to-br from-blue-100 to-purple-100 text-indigo-700 border-indigo-300";
      case "terminal":
        return "bg-black text-green-500 font-mono border-green-700";
      case "soft":
        return "bg-pink-50 text-pink-700 border-pink-200 rounded-xl";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {templates.map((template) => (
        <div
          key={template}
          onClick={() => onSelect(template)}
          className={`cursor-pointer border rounded p-4 text-center shadow-sm hover:shadow-md transition ${
            selected === template ? "ring-2 ring-blue-600" : ""
          } ${renderStyle(template)}`}
        >
          <h4 className="text-lg font-bold capitalize">{template}</h4>
          <p className="text-sm mt-1">Click to select</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;
