import ConfirmDeleteModal from "../ConfirmDeleteModal";
import ConfirmModal from "../ConfirmModal";
import EditForm from "../../app/edit/EditForm";
import { useState } from "react";
import {
  validateParticipant,
  showErrorToast,
  showSuccessToast,
} from "../../utils/formValidation";

export default function ParticipantModals({
  removeParticipant,
  editParticipant,
  children, // render prop
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Handler untuk hapus
  const handleDelete = (participant) => {
    setSelectedParticipant(participant);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    removeParticipant(selectedParticipant.id);
    setShowDeleteModal(false);
    setSelectedParticipant(null);
    showSuccessToast("Peserta berhasil dihapus.");
  };

  // Handler untuk edit
  const handleEdit = (participant) => {
    setSelectedParticipant(participant);
    setEditFormData({ ...participant });
    setEditErrors({});
    setShowEditModal(true);
  };

//   
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateParticipant(editFormData);
    setEditErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      showErrorToast();
      return;
    }
    setShowEditConfirm(true);
  };

  const handleConfirmEdit = () => {
    editParticipant(selectedParticipant.id, editFormData);
    showSuccessToast("Data peserta berhasil diperbarui.");
    setShowEditModal(false);
    setShowEditConfirm(false);
    setSelectedParticipant(null);
    setEditFormData(null);
    setEditErrors({});
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditFormData(null);
    setSelectedParticipant(null);
    setEditErrors({});
    setShowEditConfirm(false);
  };

  return (
    <>
      {/* Render cards dengan handler */}
      {children({
        handleEdit,
        handleDelete,
      })}

      {/* Modal Hapus */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        name={selectedParticipant?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Modal Edit */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-indigo-100">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Edit Data Peserta
            </h4>
            <EditForm
              editForm={editFormData}
              onChange={(e) =>
                setEditFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              onCancel={handleCancelEdit}
              onSubmit={handleEditSubmit}
              errors={editErrors}
            />
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Edit */}
      <ConfirmModal
        show={showEditConfirm}
        onCancel={() => setShowEditConfirm(false)}
        onConfirm={handleConfirmEdit}
        title="Konfirmasi Perubahan Data"
        message="Apakah Anda yakin ingin menyimpan perubahan data peserta ini?"
      />
    </>
  );
}
