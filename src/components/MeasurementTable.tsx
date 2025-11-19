// src/components/MeasurementTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Measurement } from "@/types/measurement";
import { getBloodPressureStatus, getGlucoseStatus } from "@/lib/measurementUtils";
import { useSettings } from "@/contexts/SettingsContext";
// IMPORTANTE: Importando a formatação segura
import { formatDate, formatTime } from "@/lib/date";

interface MeasurementTableProps {
  measurements: Measurement[];
  onDelete?: (id: number) => void;
}

export const MeasurementTable = ({ measurements, onDelete }: MeasurementTableProps) => {
  const { showStatus, showDeleteButtons } = useSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Medições</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>PA (mmHg)</TableHead>
                <TableHead>Glicemia</TableHead>
                <TableHead>Pulso</TableHead>
                {showStatus && <TableHead>Status</TableHead>}
                {onDelete && showDeleteButtons && <TableHead className="w-[50px]"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {measurements.map((measurement) => {
                const bpStatus = getBloodPressureStatus(measurement.systolic, measurement.diastolic);
                const glucoseStatus = getGlucoseStatus(measurement.glucose);

                return (
                  <TableRow key={measurement.id}>
                    {/* AQUI: formatDate agora usa string split, zero chance de erro */}
                    <TableCell className="font-medium whitespace-nowrap">
                      {formatDate(measurement.date)}
                    </TableCell>
                    <TableCell>{formatTime(measurement.time)}</TableCell>
                    <TableCell>{measurement.systolic}/{measurement.diastolic}</TableCell>
                    <TableCell>{measurement.glucose}</TableCell>
                    <TableCell>{measurement.pulse}</TableCell>
                    {showStatus && (
                      <TableCell>
                        <div className="flex gap-1 flex-wrap min-w-[140px]">
                          <Badge variant={bpStatus.variant} className="text-xs px-1 py-0.5 whitespace-nowrap">
                            PA: {bpStatus.label}
                          </Badge>
                          <Badge variant={glucoseStatus.variant} className="text-xs px-1 py-0.5 whitespace-nowrap">
                            Gli: {glucoseStatus.label}
                          </Badge>
                        </div>
                      </TableCell>
                    )}
                    {onDelete && showDeleteButtons && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(measurement.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};