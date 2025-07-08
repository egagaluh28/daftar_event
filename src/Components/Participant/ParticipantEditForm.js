export default function EditForm({
  editForm,
  onChange,
  onCancel,
  onSubmit,
  errors = {},
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-1">
      <div>
        <input
          className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-gray-800 placeholder-gray-400 text-base ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          name="name"
          value={editForm.name}
          onChange={onChange}
          placeholder="Nama Lengkap"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <input
          className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-gray-800 placeholder-gray-400 text-base ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          name="email"
          type="email"
          value={editForm.email}
          onChange={onChange}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <input
          className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-gray-800 placeholder-gray-400 text-base ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          name="phone"
          type="tel"
          value={editForm.phone}
          onChange={onChange}
          placeholder="Nomor Telepon"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
      <div>
        <input
          className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-gray-800 placeholder-gray-400 text-base ${
            errors.city ? "border-red-500" : "border-gray-300"
          }`}
          name="city"
          value={editForm.city}
          onChange={onChange}
          placeholder="Kota Asal"
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>
      <div>
        <select
          className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-gray-800 bg-white placeholder-gray-400 text-base ${
            errors.session ? "border-red-500" : "border-gray-300"
          }`}
          name="session"
          value={editForm.session}
          onChange={onChange}>
          <option value="" disabled>
            Pilih Sesi Workshop
          </option>
          <option value="Pagi">Sesi Pagi</option>
          <option value="Siang">Sesi Siang</option>
        </select>
        {errors.session && (
          <p className="text-red-500 text-sm mt-1">{errors.session}</p>
        )}
      </div>
      <textarea
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-gray-800 placeholder-gray-400 resize-y"
        name="reason"
        value={editForm.reason}
        onChange={onChange}
        placeholder="Alasan bergabung (opsional)"
        rows={3}
      />
      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Simpan Perubahan
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
          Batal
        </button>
      </div>
    </form>
  );
}
