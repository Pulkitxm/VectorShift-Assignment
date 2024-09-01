export default function Select({ values, label }) {
  return (
    <label className="flex items-center my-2">
      {label}:
      <select className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {values.map((value, index) => (
          <option className="text-lg" key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}
