// src/components/ReportButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

// MUDANÇA 1: Importar a nova função de timestamp
import { getFormattedTimestamp } from "@/lib/date";

// Declara as bibliotecas globais (do index.html) para o TypeScript
declare const html2canvas: any;
declare const jspdf: any;

interface ReportButtonProps {
  targetId: string; // O ID do elemento que queremos imprimir (ex: "tabela-historico")
}

export const ReportButton = ({ targetId }: ReportButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = async () => {
    const input = document.getElementById(targetId);
    if (!input) {
      toast.error("Erro: Não foi possível encontrar a tabela para imprimir.");
      return;
    }

    setIsLoading(true);

    try {
      const canvas = await html2canvas(input, {
        scale: 2, 
        useCORS: true,
        backgroundColor: null, 
      });
      
      const imgData = canvas.toDataURL('image/png');

      const { jsPDF } = jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30; 

      pdf.setFontSize(20);
      pdf.text("Relatório de Medições", pdfWidth / 2, 15, { align: "center" });
      
      // MUDANÇA 2: Usar a função de timestamp centralizada (CORRIGE O BUG DO FUSO)
      const timestamp = getFormattedTimestamp(); // Ex: "16/11/2025 às 22:30:15"
      pdf.setFontSize(10);
      pdf.text(`Gerado em: ${timestamp}`, pdfWidth / 2, 22, { align: "center" });

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // MUDANÇA 3: Corrigir o nome do arquivo para usar a data local
      const localDateString = new Date().toLocaleDateString('sv-SE'); // "2025-11-16"
      pdf.save(`relatorio_saude_${localDateString}.pdf`);

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Ocorreu um erro ao gerar o relatório em PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownloadPdf}
      disabled={isLoading}
      className="print:hidden" 
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <FileDown className="h-4 w-4 mr-2" />
      )}
      Baixar PDF
    </Button>
  );
};