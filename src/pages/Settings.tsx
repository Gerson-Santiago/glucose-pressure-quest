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
  
  const [sheetUrl, setSheetUrl] = useState(googleSheetUrl);

  const handleSaveSheetUrl = () => {
    setGoogleSheetUrl(sheetUrl);
    toast({
      title: "Configurações salvas",
      description: "URL da planilha atualizada com sucesso",
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
