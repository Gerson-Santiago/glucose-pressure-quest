/** Data */
export function formatDate(dateString: string) {
  // O dateString é "2025-11-06"

  // CORREÇÃO: "T00:00:00" para garantir que o navegador
  // interprete a data como "meia-noite, no fuso horário local",
  // e não "meia-noite UTC", o que poderia mudar o dia.
  const date = new Date(dateString + "T00:00:00");
  
  return date.toLocaleDateString("pt-BR"); // "06/11/2025"
}


/** Hora */
export function formatTime(timeString: string) {
  // O timeString é "20:30:00"

  // CORREÇÃO: "new Date("20:30:00")" é inválido.
  // Para "enganar" o construtor, dando a ele uma data qualquer
  // (1º de Jan de 2000) apenas para que ele tenha um
  // contexto de data para formatar a hora corretamente.
  const date = new Date("2000-01-01T" + timeString);
  
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); // "20:30"
}