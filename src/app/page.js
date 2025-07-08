"use client";
import { useContext, useState } from "react";

import EventContext from "../Context/EventContext";
import ParticipantCard from "../Components/Participant/ParticipantCard";
import ParticipantModals from "../Components/Participant/ParticipantModals";
import SearchBar from "../Components/SearchBar";

export default function Home() {
  const {
    participants,
    removeParticipant,
    editParticipant,
    searchParticipant,
  } = useContext(EventContext);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredParticipants = searchParticipant(searchQuery);

  return (
    <section className="max-w-6xl mx-auto mt-12 ">
      {/* Search Bar */}
      
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-indigo-900 mb-3 tracking-tight drop-shadow-lg leading-tight">
          Daftar Peserta Workshop Eksklusif
        </h2>
        <p className="text-gray-600 text-xl font-light">
          Jelajahi daftar individu berbakat yang telah mendaftar untuk event
          workshop kami.
        </p>
      </div>
      <div className="mb-8">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      {filteredParticipants.length === 0 ? (
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
        <ParticipantModals
          removeParticipant={removeParticipant}
          editParticipant={editParticipant}>
          {({ handleEdit, handleDelete }) => (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-0">
              {filteredParticipants.map((participant) => (
                <ParticipantCard
                  key={participant.id}
                  participant={participant}
                  onEdit={() => handleEdit(participant)}
                  onDelete={() => handleDelete(participant)}
                />
              ))}
            </div>
          )}
        </ParticipantModals>
      )}
    </section>
  );
}
