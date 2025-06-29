"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ViolationHistory({ data }: { data: any[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Violation History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Violation ID</TableHead>
            <TableHead>Violation Code</TableHead>
            <TableHead>Compliance Period</TableHead>
            <TableHead>Health Based</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((violation) => (
            <TableRow key={violation.violationId}>
              <TableCell>{violation.violationId}</TableCell>
              <TableCell>{violation.violationCode}</TableCell>
              <TableCell>
                {new Date(
                  violation.compliancePeriodBegin
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(violation.compliancePeriodEnd).toLocaleDateString()}
              </TableCell>
              <TableCell>{violation.isHealthBased ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
