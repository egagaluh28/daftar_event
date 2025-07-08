"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import EventContext from "../../Context/EventContext";
import { addToast } from "@heroui/react";
import InputField from "../../Components/InputField";
import ConfirmModal from "../../Components/ConfirmModal";
import {
  validateParticipant,
  showErrorToast,
  showSuccessToast,
} from "../../Components/formValidation";

export default function RegisterPage() {
  const { addParticipant } = useContext(EventContext);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    session: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const showToast = (message, type = "info") => {
    addToast({
      title: type === "success" ? "Berhasil" : "Gagal",
      description: message,
      color: type === "success" ? "success" : "danger",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // hapus pesan error pada field yang diubah
  };

  // Handler untuk tampilkan modal konfirmasi
  const handleShowConfirm = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  // Validasi & submit setelah klik "Iya" di modal
  const handleConfirmSubmit = () => {
    const newErrors = validateParticipant(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      showErrorToast();
      setShowConfirm(false);
      return;
    }
    addParticipant(form);
    showSuccessToast(
      "Selamat! Pendaftaran Anda berhasil. Kami sangat antusias menyambut Anda!"
    );
    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
      session: "",
      reason: "",
    });
    setShowConfirm(false);
    setTimeout(() => router.push("/"), 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      {/* {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type === "error" ? "error" : "success"}
          onClose={() => setToast({ show: false, message: "", type: "info" })}
        />
      )} */}

      <ConfirmModal
        show={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        title="Konfirmasi Pendaftaran"
        message="Apakah Anda yakin ingin mendaftar dengan data yang sudah diisi?"
      />

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-indigo-100 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-indigo-800 mb-3 text-center tracking-tight drop-shadow-md">
          Daftar Sekarang untuk Workshop!
        </h2>
        <p className="text-gray-600 mb-10 text-center text-lg">
          Isi formulir singkat di bawah ini dan amankan tempat Anda di workshop
          kami.
        </p>
        <form onSubmit={handleShowConfirm} className="space-y-6 text-gray-800">
          {/* Nama */}
          <div>
            <InputField
              label="Nama Lengkap"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Misal: John Doe"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <InputField
              label="Alamat Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Misal: emailanda@example.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {/* Telepon */}
          <div>
            <InputField
              label="Nomor Telepon"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Misal: 0812-3456-7890"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          {/* Kota */}
          <div>
            <InputField
              label="Kota Domisili"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Misal: Jakarta"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
          {/* Sesi */}
          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-2">
              Pilih Sesi Workshop
            </label>
            <div className="relative">
              <select
                name="session"
                value={form.session}
                onChange={handleChange}
                className={`w-full pl-4 pr-10 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200 appearance-none bg-white ${
                  errors.session ? "border-red-500" : "border-gray-300"
                }`}>
                <option value="" disabled>
                  -- Pilih Sesi --
                </option>
                <option value="Pagi">Sesi Pagi (09:00 - 12:00 WIB)</option>
                <option value="Siang">Sesi Siang (14:00 - 17:00 WIB)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                </svg>
              </div>
            </div>
            {errors.session && (
              <p className="text-red-500 text-sm mt-1">{errors.session}</p>
            )}
          </div>
          {/* Reason */}
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-semibold text-indigo-700 mb-2">
              Alasan Mengikuti Workshop (Opsional)
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              value={form.reason}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200 resize-y"
              placeholder="Ceritakan mengapa Anda tertarik dengan workshop ini..."></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2">
            Daftar Sekarang!
          </button>
        </form>
      </div>
    </div>
  );
}
