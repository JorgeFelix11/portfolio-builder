/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Portfolio, Project } from "../types/Portfolio";
import TemplateGallery from "./TemplateGallery";

type Props = {
  data: Portfolio;
  onChange: (data: Portfolio) => void;
};

const Form = ({ data, onChange }: Props) => {
  const [techInput, setTechInput] = useState("");

  const handleChange = (field: keyof Portfolio, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addTechnology = () => {
    if (techInput.trim() && !data.technologies.includes(techInput)) {
      handleChange("technologies", [...data.technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    handleChange(
      "technologies",
      data.technologies.filter((t) => t !== tech)
    );
  };

  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    technologies: [],
  });
  
  const [projTechInput, setProjTechInput] = useState("");
  
  const handleProjectChange = (field: keyof Project, value: string) => {
    setNewProject({ ...newProject, [field]: value });
  };
  
  const addProjectTechnology = () => {
    if (
      projTechInput.trim() &&
      !newProject.technologies.includes(projTechInput.trim())
    ) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, projTechInput.trim()],
      });
      setProjTechInput("");
    }
  };
  
  const removeProjectTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((t) => t !== tech),
    });
  };
  
  const addProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      handleChange("projects", [...data.projects, newProject]);
      setNewProject({ title: "", description: "", technologies: [] });
      setProjTechInput("");
    }
  };
  
  const removeProject = (index: number) => {
    const newProjects = [...data.projects];
    newProjects.splice(index, 1);
    handleChange("projects", newProjects);
  };

  return (
    <div className="space-y-6">

      {/* Datos básicos */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Personal Info</legend>
        <input
          type="text"
          placeholder="Your name"
          value={data.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Your title"
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="About you"
          value={data.about}
          onChange={(e) => handleChange("about", e.target.value)}
          className="w-full border p-2 rounded h-32"
        />
      </fieldset>

      {/* Templates */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Template</legend>
        <TemplateGallery
          selected={data.template || "clean"}
          onSelect={(template) => onChange({ ...data, template })}
        />
      </fieldset>
      {/* Tecnologías */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Technologies</legend>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Add technology"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <ul className="flex flex-wrap gap-2 mt-2">
          {data.technologies.map((tech) => (
            <li
              key={tech}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="text-red-600 text-xs"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="space-y-4">
  <legend className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Projects</legend>

  <input
    type="text"
    placeholder="Project title"
    value={newProject.title}
    onChange={(e) => handleProjectChange("title", e.target.value)}
    className="w-full border p-2 rounded"
  />
  <textarea
    placeholder="Project description"
    value={newProject.description}
    onChange={(e) => handleProjectChange("description", e.target.value)}
    className="w-full border p-2 rounded h-24"
  />

  {/* Tecnologías por proyecto */}
  <div className="flex gap-2">
    <input
      type="text"
      value={projTechInput}
      onChange={(e) => setProjTechInput(e.target.value)}
      placeholder="Add project tech"
      className="w-full border p-2 rounded"
    />
    <button
      type="button"
      onClick={addProjectTechnology}
      className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
    >
      Add
    </button>
  </div>
  <ul className="flex flex-wrap gap-2 mt-1">
    {newProject.technologies.map((tech) => (
      <li
        key={tech}
        className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
      >
        {tech}
        <button
          type="button"
          onClick={() => removeProjectTechnology(tech)}
          className="text-red-600 text-xs"
        >
          ✕
        </button>
      </li>
    ))}
  </ul>

  <button
    type="button"
    onClick={addProject}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Add Project
  </button>

  {/* Lista de proyectos añadidos */}
  <ul className="mt-6 space-y-3">
    {data.projects.map((project, index) => (
      <li key={index} className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold">{project.title}</h4>
            <p className="text-sm text-gray-600">{project.description}</p>
            <ul className="flex flex-wrap gap-2 mt-2 text-xs text-gray-700">
              {project.technologies.map((tech) => (
                <li key={tech} className="bg-gray-100 px-2 py-1 rounded">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => removeProject(index)}
            className="text-red-600 text-sm"
          >
            ✕
          </button>
        </div>
      </li>
    ))}
  </ul>
</fieldset>
    </div>
  );
};

export default Form;
