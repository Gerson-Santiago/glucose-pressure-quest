import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Measurement } from "@/types/measurement";
import { getBloodPressureStatus, getGlucoseStatus } from "@/lib/measurementUtils";

interface MeasurementTableProps {
  measurements: Measurement[];
}

export const MeasurementTable = ({ measurements }: MeasurementTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Medições</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>PA (mmHg)</TableHead>
                <TableHead>Glicemia (mg/dL)</TableHead>
                <TableHead>Pulso (bpm)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {measurements.map((measurement) => {
                const bpStatus = getBloodPressureStatus(measurement.systolic, measurement.diastolic);
                const glucoseStatus = getGlucoseStatus(measurement.glucose);
                
                return (
                  <TableRow key={measurement.id}>
                    <TableCell className="font-medium">{measurement.date}</TableCell>
                    <TableCell>{measurement.time}</TableCell>
                    <TableCell>
                      {measurement.systolic}/{measurement.diastolic}
                    </TableCell>
                    <TableCell>{measurement.glucose}</TableCell>
                    <TableCell>{measurement.pulse}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant={bpStatus.variant} className="text-xs">
                          PA: {bpStatus.status}
                        </Badge>
                        <Badge variant={glucoseStatus.variant} className="text-xs">
                          Gli: {glucoseStatus.status}
                        </Badge>
                      </div>
                    </TableCell>
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
