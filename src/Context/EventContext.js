"use client";

import { createContext, useState, useEffect } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSesi, setSelectedSesi] = useState(null);
  // sort by A-Z
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const filteredParticipants = participants
    .filter((p) => {
      if (!selectedSesi) return true;
      return p.session === selectedSesi;
    })
    .filter((p) => {
      if (!searchQuery) return true;
      return (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }
    });

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
        selectedSesi,
        setSelectedSesi,
        searchQuery,
        setSearchQuery,
        filteredParticipants,
        setSortBy,
        setSortOrder,
      }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;
