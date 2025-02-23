"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
      fetch(`http://localhost:5000/api/scores/${lecturer}`)
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
