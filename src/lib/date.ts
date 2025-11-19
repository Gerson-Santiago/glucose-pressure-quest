// src/lib/date.ts
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// --- FUNÇÕES DE FORMATAÇÃO (Para exibir na tela) ---

/**
 * Formata uma string de data (YYYY-MM-DD) para DD/MM/YYYY.
 * Usamos split para garantir que não haja conversão de fuso horário indesejada.
 */
export function formatDate(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Formata uma string de hora (HH:MM:SS) para HH:MM.
 * Cortar a string é mais rápido e seguro que criar um objeto Date.
 */
export function formatTime(timeString: string) {
  if (!timeString) return "";
  return timeString.slice(0, 5);
}


// --- FUNÇÕES HELPER (Para lógica interna e formulários) ---

/**
 * Retorna a data local atual no formato ISO (YYYY-MM-DD).
 */
export function getLocalDateISO() {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Retorna a hora local atual no formato ISO (HH:MM:SS).
 */
export function getLocalTimeISO() {
  return format(new Date(), 'HH:mm:ss');
}

/**
 * Retorna um timestamp local formatado para relatórios (PDF).
 * Ex: "DD/MM/AAAA às HH:MM:SS"
 */
export function getFormattedTimestamp() {
  return format(new Date(), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR });
}