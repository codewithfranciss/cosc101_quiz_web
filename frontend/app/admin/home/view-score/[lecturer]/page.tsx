"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LecturerScores() {
  const { lecturer } = useParams();
  const router = useRouter();
  const [scores, setScores] = useState<{ matric_number: string; score: number }[]>([]);
  const [filteredScores, setFilteredScores] = useState<{ matric_number: string; score: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (lecturer) {
      fetch(`http://10.136.3.10:5000/api/scores/${lecturer}`)
        .then((res) => res.json())
        .then((data) => {
          const results = data.message ? [] : data;
          setScores(results);
          setFilteredScores(results);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching scores:", error));
    }
  }, [lecturer]);

  // Handle search filtering
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredScores(scores);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = scores.filter((score) =>
        score.matric_number.toLowerCase().includes(lowerSearch)
      );
      setFilteredScores(filtered);
    }
  }, [search, scores]);

  // Export scores to Excel without file-saver
  const exportToExcel = () => {
    if (filteredScores.length === 0) {
      alert("No scores to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredScores);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scores");

    // Generate Excel file as a Blob
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `scores_${lecturer}.xlsx`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Scores for {lecturer}</h2>

      <Card className="w-full max-w-2xl p-4">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by Matric Number..."
          className="mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : filteredScores.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matric Number</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScores.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell>{score.matric_number}</TableCell>
                    <TableCell>{score.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button className="mt-4 bg-green-500" onClick={exportToExcel}>
              Download Excel
            </Button>
          </>
        ) : (
          <p className="text-gray-500 text-center">No scores found.</p>
        )}
      </Card>

      <Button className="mt-4" onClick={() => router.push("/admin/home/view-score/")}>
        Go Back
      </Button>
    </div>
  );
}
