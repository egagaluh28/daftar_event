"use client";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

const sesiList = [
  { key: "Pagi", label: "Sesi Pagi (09:00 - 12:00 WIB)" },
  { key: "Siang", label: "Sesi Siang (14:00 - 17:00 WIB)" },
];

export default function FilterBySesi({ onSelectSesi, selectedSesi }) {
  return (
    <Autocomplete
      className="max-w-xs"
      placeholder="Pilih Sesi"
      defaultItems={sesiList}
      selectedKey={selectedSesi}
      onSelectionChange={(key) => onSelectSesi(key)}
    >
      {(sesi) => (
        <AutocompleteItem key={sesi.key}>
          {sesi.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
