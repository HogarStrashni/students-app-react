export const isoToLocalDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export const formatingIso = (localDate) =>
  localDate ? localDate.split("T")[0] : "";
