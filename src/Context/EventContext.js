"use client";

import { createContext, useState, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [participants, setParticipants] = useState([]);

  // Muat data dari localStorage saat komponen mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("participants");
      if (stored) {
        setParticipants(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Gagal memuat peserta dari localStorage:", error);
    }
  }, []);

  // Simpan data ke localStorage setiap kali 'participants' berubah
  useEffect(() => {
    try {
      localStorage.setItem("participants", JSON.stringify(participants));
    } catch (error) {
      console.error("Gagal menyimpan peserta ke localStorage:", error);
    }
  }, [participants]);

  // Fungsi untuk menambahkan peserta baru dengan ID unik
  const addParticipant = (newParticipant) => {
    setParticipants((prev) => [...prev, { ...newParticipant, id: Date.now() }]);
  };

  // Fungsi untuk menghapus peserta berdasarkan ID
  const removeParticipant = (idToRemove) => {
    setParticipants((prev) =>
      prev.filter((participant) => participant.id !== idToRemove)
    );
  };

  // Fungsi untuk mengedit peserta berdasarkan ID
  const editParticipant = (idToEdit, updatedData) => {
    setParticipants((prev) =>
      prev.map((participant) =>
        participant.id === idToEdit
          ? { ...participant, ...updatedData }
          : participant
      )
    );
  };

  // Fungsi untuk mencari peserta berdasarkan nama atau email
  // const searchParticipant = (search) => {
  //   if (!search) return participants;
  //   const lower = search.toLowerCase();
  //   return participants.filter(
  //     (p) =>
  //       p.name.toLowerCase().includes(lower) ||
  //       p.email.toLowerCase().includes(lower)
  //   );
  // };

// filter by sesi
  // const filterBySession = (session) => {
  //   if (!session) return participants;
  //   return participants.filter((p) => p.session === session);
  // };


  return (
    <EventContext.Provider
      value={{
        participants,
        addParticipant,
        removeParticipant,
        editParticipant,
        // searchParticipant,
        // filterBySession,
      }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
