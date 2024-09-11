import React, { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";
import "../styles/JobCard.css";

function JobCard({
  job,
  isStudent,
  onApply,
  alreadyApplied,
  onEdit,
  onDelete,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
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
