export const classForm = {
  label: "mb-2 mt-2 text-sm text-gray-500 capitalize",
  input: (condition) =>
    `w-72 py-1 pl-4 text-gray-900 bg-white border border-gray-300 outline-none focus:ring-1 hover:bg-gray-50 placeholder:font-normal placeholder:text-sm shadow-sm rounded-lg ${
      condition
        ? "ring-red-500 focus:border-red-500"
        : "ring-blue-500 focus:border-blue-500"
    }`,
  inputGrades:
    "font-medium text-center border border-blue-700 hover:bg-gray-100 rounded-lg",
  messageError: (value) =>
    `text-xs text-red-600 pt-1 ${value ? "opacity-100" : "opacity-0"}`,
  button:
    "w-72 py-2 text-sm font-medium text-gray-50 bg-blue-600 hover:text-white border border-blue-500 hover:bg-blue-800 rounded-lg disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:border-gray-500",
};

export const classButton = {
  primary:
    "h-8 flex items-center text-sm font-medium text-blue-700 hover:text-white ring-1 ring-blue-700 hover:bg-blue-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed",
  secondaryBlue:
    "h-8 flex items-center text-sm font-medium text-white ring-1 bg-blue-500 ring-blue-500 hover:bg-blue-800 rounded-lg",
  secondaryRed:
    "h-8 flex items-center text-sm font-medium text-white ring-1 bg-red-500 ring-red-500 hover:bg-red-700 rounded-lg",
  secondaryGray:
    "px-3 h-8 flex items-center text-sm font-medium text-gray-500 ring-1 ring-gray-400 hover:bg-gray-100 rounded-lg",
  secondaryDisabled:
    "disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:border-gray-500 disabled:hover:ring-gray-500",
};

export const dataList = {
  dl: "flex border-b border-gray-100",
  dt: "w-36 pl-6 pt-1 text-sm font-medium text-gray-500 capitalize",
  dd: "pl-3 pr-6 pt-0.5 font-medium text-gray-900",
};

export const pagination = {
  button:
    "py-0.5 text-xs font-medium text-gray-700 bg-white border border-blue-100 focus:outline-none hover:bg-gray-200 rounded-lg",
  buttonDisabled: "w-8 mx-2 disabled:opacity-50 disabled:cursor-not-allowed",
};

export const hoverLink = {
  header:
    "px-3 py-2 rounded-lg hover:ring-1 hover:ring-blue-700 hover:text-blue-700 cursor-pointer",
};
