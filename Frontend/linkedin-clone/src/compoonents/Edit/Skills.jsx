import React, { useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const handleOnChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (options) => options.value
    );
    setSkills(selectedOptions);
  };
  const deleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  return (
    <div>
      <form action="#">
        <h4>Add Skill</h4>
        <label>
          Skill*
          <input
            type="text"
            placeholder="Skill(ex:Project Management)"
            className={Styles.inputType}
            value={currentQuestion}
            onChange={handleQuestionOnChange}
          />
        </label>
        <label className={Styles.questionList}>
          {skills.map((skill, index) => (
            <div key={index} className={Styles.questionItems}>
              {question}
              <button onClick={() => deleteSkill(index)}>delete</button>
            </div>
          ))}
        </label>
      </form>
    </div>
  );
};

export default Skills;
