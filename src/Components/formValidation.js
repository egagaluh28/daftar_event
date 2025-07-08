import { addToast } from "@heroui/react";
// Fungsi validasi mandatori
export function validateParticipant(form) {
  const errors = {};
  if (!form.name) errors.name = "Nama wajib diisi";
  if (!form.email) errors.email = "Email wajib diisi";
  if (!form.phone) {
    errors.phone = "Nomor telepon wajib diisi";
  } else if (!/^\d+$/.test(form.phone)) {
    errors.phone = "Nomor telepon hanya boleh berisi angka (0-9)";
  }
  if (!form.city) errors.city = "Kota domisili wajib diisi";
  if (!form.session) errors.session = "Sesi workshop wajib dipilih";
  return errors;
}

// Fungsi toast error
export function showErrorToast(
  message = "Ada field yang wajib diisi. Mohon lengkapi semua field."
) {
  addToast({
    title: "Gagal",
    description: message,
    color: "danger",
  });
}

// Fungsi toast sukses
export function showSuccessToast(message = "Data berhasil disimpan!") {
  addToast({
    title: "Berhasil",
    description: message,
    color: "success",
  });
}
