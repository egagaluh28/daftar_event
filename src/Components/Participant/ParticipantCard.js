"use client";

import ParticipantBadges from "./ParticipantBadges";
import ParticipantReason from "./ParticipantReason";

export default function ParticipantCard({ participant, onEdit, onDelete }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-indigo-100 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Accent */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 rounded-full opacity-40 blur-2xl pointer-events-none"></div>

      {/* Tombol aksi Edit dan Hapus */}
      <div className="absolute top-5 right-5 flex space-x-2 z-10">
        <button
          onClick={onEdit}
          className="p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          aria-label="Edit participant"
          title="Edit Participant">
          {/* Ikon Edit */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
          aria-label="Remove participant"
          title="Remove Participant">
          {/* Ikon Hapus */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.74 5.79a48.109 48.109 0 0 1-.304-.034M4.5 5.25A2.25 2.25 0 0 1 6.75 3h10.5a2.25 2.25 0 0 1 2.25 2.25V5.79M6 5.25V19.25a2.25 2.25 0 002.25 2.25h8.5a2.25 2.25 0 002.25-2.25V5.25M9 5.25h6"
            />
          </svg>
        </button>
      </div>

      {/* Tampilan informasi peserta */}
      <div className="flex-grow">
        <h3 className="text-2xl font-extrabold text-indigo-800 mb-2 leading-snug pr-16">
          {participant.name}
        </h3>
        <p className="text-md text-gray-700 break-words mb-1">
          <span className="font-semibold text-gray-500 mr-2">Email:</span>{" "}
          {participant.email}
        </p>
        <p className="text-md text-gray-700 mb-2">
          <span className="font-semibold text-gray-500 mr-2">Telepon:</span>{" "}
          {participant.phone}
        </p>
        <ParticipantBadges
          session={participant.session}
          city={participant.city}
        />
        <ParticipantReason reason={participant.reason} />
      </div>
    </div>
  );
}
