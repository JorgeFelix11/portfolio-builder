import { BlockType, Portfolio, SectionField, SectionStylePreset } from "../types/Portfolio";

type Props = {
  data: Portfolio;
  onChange: (data: Portfolio) => void;
};

const Form = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Navbar Items</legend>
        {Array.isArray(data.sections) &&
          data.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded p-4 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={section.label}
                  onChange={(e) => {
                    const updated = [...data.sections];
                    updated[sectionIndex].label = e.target.value;
                    onChange({ ...data, sections: updated });
                  }}
                  placeholder="Section Label"
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  value={section.anchor || ""}
                  onChange={(e) => {
                    const updated = [...data.sections];
                    updated[sectionIndex].anchor = e.target.value;
                    onChange({ ...data, sections: updated });
                  }}
                  placeholder="Anchor ID (optional)"
                  className="border p-2 rounded w-1/2"
                />
                <label className="text-sm ml-2 flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={section.showInNavbar || false}
                    onChange={(e) => {
                      const updated = [...data.sections];
                      updated[sectionIndex].showInNavbar = e.target.checked;
                      onChange({ ...data, sections: updated });
                    }}
                  /> Show in Navbar
                </label>
          
                <label className="text-sm ml-4">
                  Theme:
                  <select
                    value={section.stylePreset || "plain"}
                    onChange={(e) => {
                      const updated = [...data.sections];
                      updated[sectionIndex].stylePreset = e.target.value as SectionStylePreset;
                      onChange({ ...data, sections: updated });
                    }}
                    className="ml-2 border rounded p-1"
                  >
                    <option value="plain">Plain</option>
                    <option value="card">Card</option>
                    <option value="highlight">Highlight</option>
                  </select>
                </label>
          
                {/* reorder section buttons */}
                <button
                  type="button"
                  disabled={sectionIndex === 0}
                  onClick={() => {
                    if (sectionIndex === 0) return;
                    const updated = [...data.sections];
                    [updated[sectionIndex - 1], updated[sectionIndex]] = [updated[sectionIndex], updated[sectionIndex - 1]];
                    onChange({ ...data, sections: updated });
                  }}
                  className="text-gray-600 text-sm"
                >↑</button>
                <button
                  type="button"
                  disabled={sectionIndex === data.sections.length - 1}
                  onClick={() => {
                    if (sectionIndex === data.sections.length - 1) return;
                    const updated = [...data.sections];
                    [updated[sectionIndex + 1], updated[sectionIndex]] = [updated[sectionIndex], updated[sectionIndex + 1]];
                    onChange({ ...data, sections: updated });
                  }}
                  className="text-gray-600 text-sm"
                >↓</button>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...data.sections];
                    updated.splice(sectionIndex, 1);
                    onChange({ ...data, sections: updated });
                  }}
                  className="text-red-600 text-sm"
                >✕</button>
              </div>
          
              {section.blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex gap-2 items-center">
                    <select
                      value={block.type}
                      onChange={(e) => {
                        const updatedBlocks = [...section.blocks];
                        const newType = e.target.value as BlockType;
                        updatedBlocks[blockIndex] = {
                          type: newType,
                          content:
                            newType === "tags" ? [] :
                            newType === "multi-text" ? [{ label: "", value: "" }] : "",
                        };
                        const updated = [...data.sections];
                        updated[sectionIndex].blocks = updatedBlocks;
                        onChange({ ...data, sections: updated });
                      }}
                      className="border p-1 rounded"
                    >
                      <option value="text">Text</option>
                      <option value="textarea">Textarea</option>
                      <option value="tags">Tags</option>
                      <option value="multi-text">Multi-Text</option>
                    </select>
          
                    {/* reorder block buttons */}
                    <button
                      type="button"
                      disabled={blockIndex === 0}
                      onClick={() => {
                        if (blockIndex === 0) return;
                        const updated = [...data.sections];
                        const blocks = [...updated[sectionIndex].blocks];
                        [blocks[blockIndex - 1], blocks[blockIndex]] = [blocks[blockIndex], blocks[blockIndex - 1]];
                        updated[sectionIndex].blocks = blocks;
                        onChange({ ...data, sections: updated });
                      }}
                      className="text-gray-600 text-sm"
                    >↑</button>
                    <button
                      type="button"
                      disabled={blockIndex === section.blocks.length - 1}
                      onClick={() => {
                        if (blockIndex === section.blocks.length - 1) return;
                        const updated = [...data.sections];
                        const blocks = [...updated[sectionIndex].blocks];
                        [blocks[blockIndex + 1], blocks[blockIndex]] = [blocks[blockIndex], blocks[blockIndex + 1]];
                        updated[sectionIndex].blocks = blocks;
                        onChange({ ...data, sections: updated });
                      }}
                      className="text-gray-600 text-sm"
                    >↓</button>
                  </div>

                  {/* Render block content */}
                  {block.type === "text" && (
                    <input
                      type="text"
                      value={block.content as string}
                      onChange={(e) => {
                        const updated = [...data.sections];
                        updated[sectionIndex].blocks[blockIndex].content = e.target.value;
                        onChange({ ...data, sections: updated });
                      }}
                      className="border p-2 rounded w-full"
                    />
                  )}

                  {block.type === "textarea" && (
                    <textarea
                      value={block.content as string}
                      onChange={(e) => {
                        const updated = [...data.sections];
                        updated[sectionIndex].blocks[blockIndex].content = e.target.value;
                        onChange({ ...data, sections: updated });
                      }}
                      className="border p-2 rounded w-full"
                      rows={4}
                    />
                  )}

                  {block.type === "tags" && (
                    <input
                      type="text"
                      value={(block.content as string[]).join(", ")}
                      onChange={(e) => {
                        const updated = [...data.sections];
                        updated[sectionIndex].blocks[blockIndex].content = e.target.value
                          .split(",")
                          .map((tag) => tag.trim());
                        onChange({ ...data, sections: updated });
                      }}
                      placeholder="Comma-separated tags"
                      className="border p-2 rounded w-full"
                    />
                  )}

                  {block.type === "multi-text" && (
                    <div className="space-y-1">
                      {(block.content as SectionField[]).map((field, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => {
                              const updated = [...data.sections];
                              (updated[sectionIndex].blocks[blockIndex].content as SectionField[])[i].label = e.target.value;
                              onChange({ ...data, sections: updated });
                            }}
                            placeholder="Field label"
                            className="border p-2 rounded w-1/2"
                          />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => {
                              const updated = [...data.sections];
                              (updated[sectionIndex].blocks[blockIndex].content as SectionField[])[i].value = e.target.value;
                              onChange({ ...data, sections: updated });
                            }}
                            placeholder="Field value"
                            className="border p-2 rounded w-1/2"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...data.sections];
                          (updated[sectionIndex].blocks[blockIndex].content as SectionField[]).push({
                            label: "",
                            value: "",
                          });
                          onChange({ ...data, sections: updated });
                        }}
                        className="text-blue-600 text-sm mt-1"
                      >
                        + Add Field
                      </button>
                    </div>
                  )}
                  {block.type === "quote" && (
                    <textarea
                      value={block.content as string}
                      onChange={(e) => {
                        const updated = [...data.sections];
                        updated[sectionIndex].blocks[blockIndex].content = e.target.value;
                        onChange({ ...data, sections: updated });
                      }}
                      placeholder="Quote text"
                      className="border p-2 rounded w-full italic"
                      rows={3}
                    />
                  )}

                  {block.type === "image" && (
                    <input
                      type="text"
                      value={block.content as string}
                      onChange={(e) => {
                        const updated = [...data.sections];
                        updated[sectionIndex].blocks[blockIndex].content = e.target.value;
                        onChange({ ...data, sections: updated });
                      }}
                      placeholder="Image URL"
                      className="border p-2 rounded w-full"
                    />
                  )}

                  {block.type === "link-list" && (
                    <div className="space-y-1">
                      {(block.content as SectionField[]).map((link, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const updated = [...data.sections];
                              (updated[sectionIndex].blocks[blockIndex].content as SectionField[])[i].label = e.target.value;
                              onChange({ ...data, sections: updated });
                            }}
                            placeholder="Link text"
                            className="border p-2 rounded w-1/2"
                          />
                          <input
                            type="text"
                            value={link.value}
                            onChange={(e) => {
                              const updated = [...data.sections];
                              (updated[sectionIndex].blocks[blockIndex].content as SectionField[])[i].value = e.target.value;
                              onChange({ ...data, sections: updated });
                            }}
                            placeholder="https://example.com"
                            className="border p-2 rounded w-1/2"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...data.sections];
                          (updated[sectionIndex].blocks[blockIndex].content as SectionField[]).push({
                            label: "",
                            value: "",
                          });
                          onChange({ ...data, sections: updated });
                        }}
                        className="text-blue-600 text-sm mt-1"
                      >
                        + Add Link
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...data.sections];
                      updated[sectionIndex].blocks.splice(blockIndex, 1);
                      onChange({ ...data, sections: updated });
                    }}
                    className="text-red-600 text-sm"
                  >
                    ✕ Remove Block
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const updated = [...data.sections];
                  updated[sectionIndex].blocks.push({ type: "text", content: "" });
                  onChange({ ...data, sections: updated });
                }}
                className="text-blue-600 text-sm mt-2"
              >
                + Add Block
              </button>
            </div>
          ))
        }
        <button
          type="button"
          onClick={() =>
            onChange({
              ...data,
              sections: [
                ...data.sections,
                {
                  label: "", anchor: "", blocks: [],
                  textAlign: "left",
                  textColor: "",
                  bgColor: ""
                },
              ],
            })
          }
          className="text-blue-600 text-sm mt-4"
        >
          + Add Section
        </button>

      </fieldset>
    </div>
  );
};

export default Form;
