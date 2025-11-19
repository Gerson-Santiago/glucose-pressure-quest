// src/components/ReportButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
// MUDANÇA 1: Importar a função centralizada
import { getFormattedTimestamp, getLocalDateISO } from "@/lib/date";

declare const html2canvas: any;
declare const jspdf: any;

interface ReportButtonProps {
  targetId: string;
}

export const ReportButton = ({ targetId }: ReportButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = async () => {
    const input = document.getElementById(targetId);
    if (!input) {
      toast.error("Tabela não encontrada.");
      return;
    }
    setIsLoading(true);
    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
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

      pdf.setFontSize(20);
      pdf.text("Relatório de Medições", pdfWidth / 2, 15, { align: "center" });
      
      // MUDANÇA 2: Usar timestamp seguro do lib/date.ts
      const timestamp = getFormattedTimestamp();
      pdf.setFontSize(10);
      pdf.text(`Gerado em: ${timestamp}`, pdfWidth / 2, 22, { align: "center" });

      pdf.addImage(imgData, 'PNG', imgX, 30, imgWidth * ratio, imgHeight * ratio);
      
      // MUDANÇA 3: Nome do arquivo seguro
      const dateISO = getLocalDateISO();
      pdf.save(`relatorio_saude_${dateISO}.pdf`);
      toast.success("PDF gerado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao gerar PDF.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleDownloadPdf} disabled={isLoading} className="print:hidden gap-2">
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
      Baixar PDF
    </Button>
  );
};