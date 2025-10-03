import { render, screen } from "@testing-library/react";
import SkillTags from "../SkillTags";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

function Wrapper() {
  const [tags, setTags] = useState(["React", "Js"]);
  return <SkillTags tags={tags} setTags={setTags} />;
}

describe("SkillTags", () => {
  const user = userEvent.setup();

  const renderComponent = () => {
    return render(<Wrapper />);
  };

  it("render skilltags component", async () => {
    renderComponent();

    await user.type(
      screen.getByPlaceholderText("e.g. React, Node.js or Angular"),
      "NextJs"
    );

    await user.keyboard("{Enter}");

    expect(screen.getByText("#NextJs")).toBeInTheDocument();
  });

  it("test remove tag", async () => {
    renderComponent();

    const removeBtn = screen.getAllByText("x");

    await user.click(removeBtn[0]);

    expect(screen.queryByText("#React")).not.toBeInTheDocument();
  });
});
