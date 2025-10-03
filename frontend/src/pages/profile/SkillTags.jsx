import { useState } from "react";

function SkillTags({ tags, setTags }) {
  const [input, setInput] = useState("");

  function handleKeyDown(e) {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      setTags([...tags, input.trim()]);
      setInput("");
    }
  }

  function removeTag(index) {
    setTags(tags?.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-2 mt-[16px]">
      <label className="block text-sm text-gray-600 mb-1">Skills</label>

      <div className="flex flex-wrap gap-2 border p-2 rounded">
        {tags?.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
          >
            <span className="text-sm">#{tag}</span>
            <button
              className="ml-2 text-sm font-bold text-blue-600 hover:text-red-500"
              onClick={() => removeTag(index)}
            >
              x
            </button>
          </div>
        ))}

        <input
          className="flex-1 outline-none p-1 text-sm"
          type="text"
          placeholder="e.g. React, Node.js or Angular"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default SkillTags;
