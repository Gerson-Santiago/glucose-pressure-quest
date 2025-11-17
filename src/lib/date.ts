// --- FUNÇÕES DE FORMATAÇÃO (Para exibir na tela) ---

/**
 * Formata uma string de data (YYYY-MM-DD) para DD/MM/YYYY (pt-BR).
 */
export function formatDate(dateString: string) {
  // O dateString é "2025-11-06"
  // Adiciona T00:00:00 para evitar bugs de fuso horário
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pt-BR"); // "06/11/2025"
}

/**
 * Formata uma string de hora (HH:MM:SS) para HH:MM (pt-BR).
 */
export function formatTime(timeString: string) {
  // O timeString é "20:30:00"
  // Usa uma data base para o construtor funcionar
  const date = new Date("1995-02-20T" + timeString);
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); // "20:30"
}


// --- FUNÇÕES HELPER (Para lógica interna e formulários) ---

/**
 * (A SOLUÇÃO DO FUSO)
 * Retorna a data local atual no formato ISO (YYYY-MM-DD).
 * Usado para preencher o formulário de adição.
 */
export function getLocalDateISO() {
  // 'sv-SE' (Sueco) usa o formato YYYY-MM-DD respeitando o fuso local.
  return new Date().toLocaleDateString('sv-SE');
}

/**
 * Retorna a hora local atual no formato ISO (HH:MM:SS).
 * Usado para preencher o formulário de adição.
 */
export function getLocalTimeISO() {
  // Pega HH:MM:SS
  return new Date().toTimeString().split(" ")[0];
}

/**
 * Retorna um timestamp local formatado para relatórios (PDF).
 * Ex: "16/11/2025 às 22:30:15"
 */
export function getFormattedTimestamp() {
  const now = new Date();
  const date = now.toLocaleDateString('pt-BR');
  const time = now.toLocaleTimeString('pt-BR');
  return `${date} às ${time}`;
}