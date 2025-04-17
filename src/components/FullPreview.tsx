import { Portfolio } from "../types/Portfolio";

const FullPreview = ({ data }: { data: Portfolio }) => {
  const template = data.template || "clean";

  const textClass =
  template === "bold"
    ? "text-yellow-800"
    : template === "minimal"
    ? "text-gray-600"
    : template === "classic"
    ? "text-gray-900 font-serif"
    : template === "terminal"
    ? "text-green-500 font-mono"
    : template === "modern"
    ? "text-indigo-700"
    : template === "soft"
    ? "text-pink-700"
    : "text-gray-800";

const headingClass =
  template === "bold"
    ? "text-4xl font-extrabold text-blue-800"
    : template === "classic"
    ? "text-4xl font-semibold font-serif"
    : template === "terminal"
    ? "text-3xl font-bold font-mono"
    : template === "modern"
    ? "text-5xl font-bold text-indigo-700"
    : template === "soft"
    ? "text-3xl font-medium text-pink-700"
    : template === "minimal"
    ? "text-3xl font-light text-gray-700"
    : "text-4xl font-bold text-gray-900";

const tagClass =
  template === "bold"
    ? "bg-yellow-100 text-yellow-800"
    : template === "classic"
    ? "bg-gray-200 text-gray-800 font-serif"
    : template === "terminal"
    ? "bg-black text-green-500 font-mono border border-green-500"
    : template === "modern"
    ? "bg-indigo-100 text-indigo-700"
    : template === "soft"
    ? "bg-pink-100 text-pink-700"
    : template === "minimal"
    ? "bg-gray-200 text-gray-700"
    : "bg-gray-100 text-gray-800";
    
  return (
    <div className="space-y-16 bg-white p-8 shadow rounded">
      <section>
        <h1 className={headingClass}>{data.name}</h1>
        <h2 className="text-xl text-gray-500">{data.title}</h2>
        <p className={`mt-4 ${textClass}`}>{data.about}</p>
      </section>

      {data.technologies.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-2">Technologies</h3>
          <ul className="flex flex-wrap gap-2">
            {data.technologies.map((tech) => (
              <li key={tech} className={`px-3 py-1 rounded-full ${tagClass}`}>
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.projects.length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-4">Projects</h3>
          <div className="space-y-6">
            {data.projects.map((project) => (
              <div key={project.title}>
                <h4 className="text-xl font-semibold text-blue-700">
                  {project.title}
                </h4>
                <p className={textClass}>{project.description}</p>
                <ul className="flex gap-2 mt-2 flex-wrap text-sm">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className={`px-2 py-1 rounded ${tagClass}`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};


export default FullPreview;
