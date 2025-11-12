// src/pages/Ajuda.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const Ajuda = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h2 className="text-3xl font-bold text-foreground mb-6">Ajuda e Referências</h2>
        <p className="text-muted-foreground mb-8">
          Consulte os valores de referência para glicemia e pressão arterial.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="glicemia">
            <AccordionTrigger>Faixas de Glicemia (mg/dL)</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Glicemia</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Condição</th>
                        <th className="text-left py-2">Jejum</th>
                        <th className="text-left py-2">2h após refeição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td>Normal</td>
                        <td>&lt; 100</td>
                        <td>&lt; 140</td>
                      </tr>
                      <tr className="border-b">
                        <td>Pré-diabetes</td>
                        <td>100 – 125</td>
                        <td>140 – 199</td>
                      </tr>
                      <tr>
                        <td>Diabetes</td>
                        <td>≥ 126</td>
                        <td>≥ 200</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pressao">
            <AccordionTrigger>Faixas de Pressão Arterial (mmHg)</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Pressão Arterial</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Categoria</th>
                        <th className="text-left py-2">Sistólica</th>
                        <th className="text-left py-2">Diastólica</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td>Normal</td>
                        <td>&lt; 120</td>
                        <td>&lt; 80</td>
                      </tr>
                      <tr className="border-b">
                        <td>Elevada</td>
                        <td>120–129</td>
                        <td>&lt; 80</td>
                      </tr>
                      <tr className="border-b">
                        <td>Hipertensão Estágio 1</td>
                        <td>130–139</td>
                        <td>80–89</td>
                      </tr>
                      <tr>
                        <td>Hipertensão Estágio 2</td>
                        <td>≥ 140</td>
                        <td>≥ 90</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Ajuda;
