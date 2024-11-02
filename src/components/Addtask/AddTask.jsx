import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTask.module.css";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getallUser, todoCreate } from "../../services/Userlogin";

export default function AddTask({ onClose, onTaskAdd }) {
  const modalref = useRef();

  const [selectedDate, setSelectedDate] = useState(null);

  const [inputs, setInputs] = useState([]); //TO add checklist
  const [priorityValue, setPriority] = useState(); //To add priority
  const [email, setEmail] = useState([]);

  // send data to api
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    checklist: [],
    dueDate: null,
    assignTo: "",
  });

  //to fetch all the users
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getallUser();
      if (response && response.data && response.data.users) {
        const userEmails = response.data.users.map(user => user.email);
        setEmail(userEmails);
      }
    };
    fetchUsers();
  }, []);

  //TO SET FORM DATA
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      priority: priorityValue,
      checklist: inputs,
      dueDate: selectedDate,
    }));
  }, [inputs, priorityValue, selectedDate]);

  const closeModal = (e) => {
    if (modalref.current === e.target) {
      onClose();
    }
  };
  //TO SAVE TODO TASK IN DATABASE VIA API
  async function handleTodoSave(e) {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a task title.");
      return;
    }

    // Check if priority is selected
    if (!formData.priority) {
      toast.error("Please select a priority level.");
      return;
    }

    if (formData.checklist.length === 0) {
      toast.error("Please add at least one checklist item.");
      return;
    }

    const emptyChecklistItems = formData.checklist.some(
      (item) => !item.text.trim()
    );
    if (emptyChecklistItems) {
      toast.error("Please fill out all checklist items.");
      return;
    }
    try {
      const response = await todoCreate(formData);
      console.log(priorityValue);
      if (response && response.data.datamsg) {
        onTaskAdd(response.data.datamsg);
        toast.success("Task created successfully!");
      }
    } catch (error) {
      toast.error("Error creating task.");
      console.error("Error creating task:", error);
    }
  
    onClose();
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
    <div className={styles.container} ref={modalref} onClick={closeModal}>
      <form className={styles.formClass}>
        <label htmlFor="">
          <p>
            Title<span className={styles.starSpan}>*</span>
          </p>
          <input
            type="text"
            placeholder="Enter Title Task"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={styles.inputTypeText}
            required
          />
        </label>
        <div className={styles.priorityDiv}>
          Select Priority <span className={styles.starSpan}>*</span>
          <div className={styles.priorityOptions}>
            <label>
              <input
                type="radio"
                name="priority"
                value="HIGH PRIORITY"
                checked={priorityValue === "HIGH PRIORITY"}
                onChange={(e) => setPriority(e.target.value)}
              />
              <span className={`${styles.bullet} ${styles.high}`}></span> High
              priority
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="MODERATE PRIORITY"
                checked={priorityValue === "MODERATE PRIORITY"}
                onChange={(e) => setPriority(e.target.value)}
              />
              <span className={`${styles.bullet} ${styles.moderate}`}></span>{" "}
              Moderate priority
            </label>
            <label>
              <input
                type="radio"
                name="priority"
                value="LOW PRIORITY"
                checked={priorityValue === "LOW PRIORITY"}
                onChange={(e) => setPriority(e.target.value)}
              />
              <span className={`${styles.bullet} ${styles.low}`}></span> Low
              priority
            </label>
          </div>
        </div>

        <label>
          Assign to
        <select
          value={formData.assignTo}
          onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
          className={styles.inputTypeText}
        >
          <option value="">Select user</option>
          {email.map((userEmail, index) => (
            <option key={index} value={userEmail}>
              {userEmail}
            </option>
          ))}
        </select>
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
                className={styles.inputTypeText}
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

          <button className={styles.fbtn2} onClick={onClose}>
            {" "}
            Cancel
          </button>
          <button className={styles.fbtn3} onClick={handleTodoSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
