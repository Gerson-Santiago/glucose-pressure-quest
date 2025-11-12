// src/lib/date.ts

/** Data */
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR"); // "12/11/2025"
}


/** Hora */
export function formatTime(timeString: string) {
  const date = new Date(timeString);
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); // "09:22"
}
