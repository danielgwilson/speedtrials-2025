"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ContaminantDetails({ data }: { data: any[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contaminant Details</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contaminant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((sample) => (
            <TableRow key={sample.sampleId}>
              <TableCell>{sample.contaminantCode}</TableCell>
              <TableCell>{sample.sampleMeasure}</TableCell>
              <TableCell>{sample.unitOfMeasure}</TableCell>
              <TableCell>
                {new Date(sample.samplingEndDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
