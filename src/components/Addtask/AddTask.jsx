import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./AddTask.module.css";
import { contextUser } from "../../context/UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { todoCreate } from "../../services/Userlogin";

export default function AddTask() {
  const { selectedDate, setSelectedDate } = useContext(contextUser);

  const [inputs, setInputs] = useState([]); //TO add checklist
  const [priorityValue, setPriority] = useState(null); //To add priority

  // send data to api
  const [formData, setFormData] = useState({
    title: "",
    priority: priorityValue,
    checklist: inputs,
    dueDate: selectedDate,
  });

  //TO SET FORM DATA
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      priority: priorityValue,
      checklist: inputs,
      dueDate: selectedDate,
    }));
  }, [inputs, priorityValue, selectedDate]);

  // //TO SET_DATE
  // function dateSet(e) {
  //   setSelectedDate(e.target.value);
  // }

  //TO SAVE TODO TASK IN DATABASE VIA API
  async function handleTodoSave(e) {
    e.preventDefault();
    if(inputs.length>0 &&  priorityValue.length > 0){
      const response = await todoCreate(formData);
    }
   
  }

  //To set priority
  function handlePriorityChange(priorityLevel) {
    setPriority(priorityLevel);
  }

  //CREATING CHECKIST COUNT
  function createChecklist(e) {
    e.preventDefault();
    setInputs([...inputs, { text: "", checked: false }]);
  }

  //HOW MANY CHECK LIST MARKED
  function checklistCount() {
    const count = inputs.filter((input) => input.checked);
    return count.length;
  }

  // Update input text
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].text = event.target.value;
    setInputs(newInputs);
  };

  // Toggle checkbox state
  const handleCheckboxChange = (index) => {
    const newInputs = [...inputs];
    newInputs[index].checked = !newInputs[index].checked;
    setInputs(newInputs);
  };
  //to delete the checklist
  const deleteChecklist = (index) => {
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formClass}>
        <label htmlFor="">
          <p>
            Title<span className={styles.starSpan}>*</span>
          </p>
          <input
            type="text"
            placeholder="Enter Title Task"
            value={formData.title}
            onChange={(e) => setFormData({ title: e.target.value })}
            required
          />
        </label>
        <div className={styles.priorityDiv}>
          <label htmlFor="">
            Select Priority <span className={styles.starSpan}>*</span>
            <button
              type="button"
              onClick={() => handlePriorityChange("HIGH PRIORITY")}
            >
              HIGH PRIORITY
            </button>
            <button
              type="button"
              onClick={() => handlePriorityChange("MODERATE PRIORITY")}
            >
              MODERATE PRIORITY
            </button>
            <button
              type="button"
              onClick={() => handlePriorityChange("LOW PRIORITY")}
            >
              LOW PRIORITY
            </button>
          </label>
        </div>

        <label htmlFor="">
          Assign to
          <input type="text" />
        </label>
        <p>
          Checklist ({checklistCount()}/{inputs.length})
        </p>
        <div className={styles.checklistUperbox}>
          {inputs.map((input, index) => (
            <div key={index} className={styles.checklistBox}>
              <input
                type="checkbox"
                name=""
                id=""
                checked={input.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <input
                type="text"
                placeholder="Task to be done"
                value={input.text}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
              {/* delete image */}
              <img
                src="/images/Delete.png"
                alt=""
                onClick={() => deleteChecklist(index)}
              />
            </div>
          ))}
        </div>
        <button className={styles.addButton} onClick={createChecklist}>
          + Add new
        </button>

        <div className={styles.fotterbtn}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Select due date"
            className={styles.fbtn1}
          />

          <button className={styles.fbtn2}> Cancel</button>
          <button className={styles.fbtn3} onClick={handleTodoSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
