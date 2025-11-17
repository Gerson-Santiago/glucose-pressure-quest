// src/components/ReportButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Declara as bibliotecas globais (do index.html) para o TypeScript
declare const html2canvas: any;
declare const jspdf: any;

interface ReportButtonProps {
  targetId: string; // O ID do elemento que queremos imprimir (ex: "tabela-historico")
}

export const ReportButton = ({ targetId }: ReportButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = async () => {
    // 1. Encontra o elemento da tabela no DOM
    const input = document.getElementById(targetId);
    if (!input) {
      toast.error("Erro: Não foi possível encontrar a tabela para imprimir.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Usa 'html2canvas' para "tirar uma foto" da tabela
      const canvas = await html2canvas(input, {
        scale: 2, // Aumenta a resolução para melhor qualidade
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');

      // 3. Usa 'jsPDF' para criar o documento
      // 'p' = retrato (portrait), 'mm' = milímetros, 'a4' = tamanho da página
      const { jsPDF } = jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calcula a proporção para caber na página A4
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30; // Margem superior para o título

      // 4. Adiciona Título e Data ao PDF
      pdf.setFontSize(20);
      pdf.text("Relatório de Medições", pdfWidth / 2, 15, { align: "center" });
      pdf.setFontSize(10);
      pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`, pdfWidth / 2, 22, { align: "center" });

      // 5. Adiciona a "foto" da tabela ao PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // 6. Baixa o arquivo
      pdf.save(`relatorio_saude_${new Date().toISOString().split('T')[0]}.pdf`);

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