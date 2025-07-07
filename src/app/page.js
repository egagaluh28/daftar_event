"use client";
import { useContext, useState } from "react";
import { addToast } from "@heroui/react";
import EventContext from "../Context/EventContext";
import ParticipantCard from "../Components/Participant/ParticipantCard";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import ConfirmModal from "../Components/ConfirmModal";
import EditForm from "./edit/EditForm";
import SearchBar from "../Components/SearchBar";
import {
  validateParticipant,
  showErrorToast,
  showSuccessToast,
} from "../utils/formValidation";

export default function Home() {
  const { participants, removeParticipant, editParticipant } =
    useContext(EventContext);

  // State untuk modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [showEditConfirm, setShowEditConfirm] = useState(false);

  // Handler untuk hapus
  const handleDelete = (participant) => {
    setSelectedParticipant(participant);
    setShowDeleteModal(true);
  };

  // Handler untuk konfirmasi hapus 'iya'
  const handleConfirmDelete = () => {
    removeParticipant(selectedParticipant.id);
    setShowDeleteModal(false);
    setSelectedParticipant(null);
  };

  // Handler untuk edit
  const handleEdit = (participant) => {
    setSelectedParticipant(participant);
    setEditFormData({ ...participant });
    setEditErrors({});
    setShowEditModal(true);
  };

  // Saat klik "Simpan Perubahan" di form edit untuk validasi
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateParticipant(editFormData);
    setEditErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      showErrorToast();
      return;
    }
    setShowEditConfirm(true); //modal konfirmasi edit muncul
  };

  // Jika user klik "Iya" pada modal konfirmasi edit
  const handleConfirmEdit = () => {
    editParticipant(selectedParticipant.id, editFormData);
    showSuccessToast("Data peserta berhasil diperbarui.");
    setShowEditModal(false);
    setShowEditConfirm(false);
    setSelectedParticipant(null);
    setEditFormData(null);
    setEditErrors({});
  };

  // Jika user batal edit
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditFormData(null);
    setSelectedParticipant(null);
    setEditErrors({});
  };

  return (
    <section className="max-w-6xl mx-auto mt-12 ">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-indigo-900 mb-3 tracking-tight drop-shadow-lg leading-tight">
          Daftar Peserta Workshop Eksklusif
        </h2>
        <p className="text-gray-600 text-xl font-light">
          Jelajahi daftar individu berbakat yang telah mendaftar untuk event
          workshop kami.
        </p>
      </div>
      {participants.length === 0 ? (
        <div className="flex flex-col items-center py-20 bg-white rounded-2xl shadow-inner border border-gray-100">
          <svg
            className="w-20 h-20 text-indigo-300 mb-6 opacity-75"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25m0 0A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0h-7.5m7.5 0v2.25A2.25 2.25 0 0115.75 13.5h-7.5A2.25 2.25 0 016 11.25V9m0 0V5.25A2.25 2.25 0 018.25 3h7.5A2.25 2.25 0 0118 5.25V9z"
            />
          </svg>
          <p className="text-indigo-500 text-xl font-semibold animate-pulse">
            Belum ada peserta yang terdaftar saat ini.
          </p>
          <p className="text-gray-500 text-md mt-2">
            Informasi akan muncul di sini setelah ada pendaftaran.
          </p>
        </div>
      ) : (
        <>
          {/* Modal Hapus */}
          <ConfirmDeleteModal
            show={showDeleteModal}
            name={selectedParticipant?.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />

          {/* Modal Edit: tampilkan form edit di modal */}
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-0">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="transition-transform duration-300 hover:scale-103 hover:shadow-xl rounded-2xl">
                <ParticipantCard
                  participant={participant}
                  onDelete={() => handleDelete(participant)}
                  onEdit={() => handleEdit(participant)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
