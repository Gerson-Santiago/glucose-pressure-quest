// src/pages/Settings.tsx
import { useSettings } from "@/contexts/SettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { 
    showStatus, 
    showDeleteButtons, 
    googleSheetUrl,
    toggleShowStatus, 
    toggleShowDeleteButtons,
    setGoogleSheetUrl 
  } = useSettings();
  const { 
    showChartGuides,
    toggleShowChartGuides,
    glucoseGuideValue,
    setGlucoseGuideValue,
    pressureLowValue,
    setPressureLowValue,
    pressureHighValue,
    setPressureHighValue,
  } = useSettings();

  const [sheetUrl, setSheetUrl] = useState(googleSheetUrl);

  // Local state for chart guide inputs (numbers only). Switch updates global immediately.
  const [localGlucoseGuide, setLocalGlucoseGuide] = useState<number>(glucoseGuideValue);
  const [localPressureLow, setLocalPressureLow] = useState<number>(pressureLowValue);
  const [localPressureHigh, setLocalPressureHigh] = useState<number>(pressureHighValue);

  const handleSaveSheetUrl = () => {
    setGoogleSheetUrl(sheetUrl);
    toast({
      title: "Configurações salvas",
      description: "URL da planilha atualizada com sucesso",
    });
  };

  const handleSaveChartSettings = () => {
    // apply toggles and numeric values to context
    setGlucoseGuideValue(Number(localGlucoseGuide));
    setPressureLowValue(Number(localPressureLow));
    setPressureHighValue(Number(localPressureHigh));

    toast({
      title: "Configurações salvas",
      description: "Configurações dos gráficos atualizadas",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">Configurações</h2>
          <p className="text-muted-foreground">Personalize a exibição e integrações do app</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exibição do Histórico</CardTitle>
              <CardDescription>
                Configure como as informações são exibidas na tabela de histórico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-status" className="flex flex-col gap-1">
                  <span>Mostrar Status</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Exibir indicadores de status na tabela
                  </span>
                </Label>
                <Switch
                  id="show-status"
                  checked={showStatus}
                  onCheckedChange={toggleShowStatus}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-delete" className="flex flex-col gap-1">
                  <span>Mostrar Botões de Deletar</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Exibir botões para deletar registros
                  </span>
                </Label>
                <Switch
                  id="show-delete"
                  checked={showDeleteButtons}
                  onCheckedChange={toggleShowDeleteButtons}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guias dos Gráficos</CardTitle>
              <CardDescription>
                Ligue/desligue as linhas de referência e ajuste os valores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-chart-guides" className="flex flex-col gap-1">
                  <span>Mostrar linhas guias nos gráficos</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Exibe linhas horizontais de referência nos gráficos
                  </span>
                </Label>
                <Switch
                  id="show-chart-guides"
                  checked={showChartGuides}
                  onCheckedChange={() => toggleShowChartGuides()}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="glucose-guide">Glicemia (valor)</Label>
                  <Input
                    id="glucose-guide"
                    type="number"
                    value={localGlucoseGuide}
                    onChange={(e) => setLocalGlucoseGuide(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="pressure-low">Pressão mínima (valor)</Label>
                  <Input
                    id="pressure-low"
                    type="number"
                    value={localPressureLow}
                    onChange={(e) => setLocalPressureLow(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="pressure-high">Pressão máxima (valor)</Label>
                  <Input
                    id="pressure-high"
                    type="number"
                    value={localPressureHigh}
                    onChange={(e) => setLocalPressureHigh(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveChartSettings}>Salvar Configurações de Gráficos</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integração com Planilha Google</CardTitle>
              <CardDescription>
                Conecte seus dados a uma planilha Google para backup e análise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sheet-url">URL da Planilha Google</Label>
                <Input
                  id="sheet-url"
                  type="url"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Cole o link da sua planilha Google Sheets aqui
                </p>
              </div>
              <Button onClick={handleSaveSheetUrl}>
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
