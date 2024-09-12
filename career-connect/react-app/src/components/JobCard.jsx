import React, { useState, useEffect } from "react";
import JobDetailsModal from "./JobDetailsModal";
import { checkIfApplied } from "../Api";
import "../styles/JobCard.css";

function JobCard({
  job,
  isStudent,
  onApply,
  alreadyApplied: initialAlreadyApplied,
  onEdit,
  onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(initialAlreadyApplied);

  useEffect(() => {
    setAlreadyApplied(initialAlreadyApplied);
  }, [initialAlreadyApplied]);

  useEffect(() => {
    setIsModalOpen(false)
  }, [onDelete, onApply]);

  const handleOpenModal = async () => {
    if (isStudent) {
      try {
        const appliedStatus = await checkIfApplied(job.id);
        if (appliedStatus.status === "applied") {
          setAlreadyApplied(true);
        } else {
          setAlreadyApplied(false);
        }
      } catch (error) {
        console.error("Failed to check if applied", error);
      }
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>Kompanija: {job.company}</p>
      <p>Tip zaposlenja: {job.employment_type}</p>
      <p>Način rada: {job.work_mode}</p>
      <p>Ističe: {job.expires_at}</p>
      <button onClick={handleOpenModal}>Prikaži Detalje</button>
      <JobDetailsModal
        job={job}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isStudent={isStudent}
        onApply={onApply}
        alreadyApplied={alreadyApplied}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default JobCard;