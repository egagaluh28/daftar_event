"use client";
import { useContext } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

export default function SortByAz({ onSortChange, sortBy, sortOrder }) {
  // sort a-z or z-a
  const handleSortChange = (value) => {
    if (value === "az") {
      onSortChange("name", "asc");
    } else if (value === "za") {
      onSortChange("name", "desc");
    }
  };
  const defaultItems = [
    { key: "az", label: "A-Z" },
    { key: "za", label: "Z-A" },
  ];

  return (
    <Autocomplete
      className=""
      placeholder="Urutkan Berdasarkan ..."
      defaultItems={defaultItems}
      selectedKey={sortBy === "name" ? sortOrder : null}
      onSelectionChange={(key) => handleSortChange(key)}>
      {(item) => (
        <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
