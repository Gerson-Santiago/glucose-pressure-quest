// src/lib/date.ts
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// --- FUNÇÕES DE FORMATAÇÃO (Visualização) ---

/**
 * Formata uma data ISO para o formato brasileiro (DD/MM/AAAA).
 * Garante que a data exibida seja a mesma da string, sem conversão de fuso.
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "-";
  // Se vier apenas a data (YYYY-MM-DD), forçamos a interpretação correta
  // Adicionando 'T12:00:00' garantimos que fique no meio do dia, evitando viradas de data por fuso.
  // Mas a melhor forma é fazer o parse manual se for só data.
  if (dateString.length === 10) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('pt-BR');
  }

  return new Date(dateString).toLocaleDateString('pt-BR');
}

/**
 * Formata uma hora (HH:MM:SS) para HH:MM.
 */
export function formatTime(timeString: string | null): string {
  if (!timeString) return "-";
  return timeString.slice(0, 5);
}

// --- FUNÇÕES PARA O FORMULÁRIO E BANCO DE DADOS ---

/**
 * Retorna a data atual LOCAL no formato YYYY-MM-DD.
 * Essencial para inputs de data iniciarem com o dia correto do usuário.
 */
export function getLocalDateISO(): string {
  const now = new Date();
  // Ajusta para o fuso horário local antes de pegar a string ISO
  const offset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - offset);
  return localDate.toISOString().split('T')[0];
}

/**
 * Retorna a hora atual LOCAL no formato HH:MM.
 */
export function getLocalTimeISO(): string {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Retorna o timestamp completo formatado para o relatório PDF.
 */
export function getFormattedTimestamp(): string {
  return format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

// --- TESTES UNITÁRIOS MANUAIS (Removido) ---
// export function runDateTests() { ... }