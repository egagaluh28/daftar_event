"use client";

import { useState, useContext } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import EventContext from "../Context/EventContext"; 

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const { searchParticipant } = useContext(EventContext); 

  const results = searchParticipant(query);

  return (
    <Autocomplete
      items={results}
      label="Cari peserta"
      placeholder="Masukkan nama atau email"
      menuTrigger="focus"
      inputValue={query}
      onInputChange={setQuery}
      onSelectionChange={(key) => {
        const sel = results.find((p) => p.id === key);
        onSelect?.(sel);
      }}
      selectedKey={null}>
      {(participant) => (
        <AutocompleteItem key={participant.id}>
          {participant.name} – {participant.email}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
