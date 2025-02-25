'use client'
import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileAlt } from "react-icons/fa";

export default function AddStudent() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload-users`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* File Upload Box */}
      <h2 className="text-2xl font-bold py-8">
        Register Student: <span className="text-red-500">Excel format only</span>
      </h2>
      <div
        className="w-full max-w-lg p-6 bg-white border-2 border-dashed border-gray-400 rounded-lg shadow-md text-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Icon */}
        <FaCloudUploadAlt className="text-gray-500 text-5xl mx-auto mb-4" />

        <p className="text-gray-700 text-lg font-medium">Drag & Drop to Upload</p>
        <p className="text-gray-500 text-sm">or click to select a file</p>

        {/* Hidden File Input */}
        <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} accept=".xls,.xlsx"/>
        <label htmlFor="fileInput" className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
          Choose File
        </label>
      </div>

      {/* File Preview */}
      {file && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md w-full max-w-lg flex items-center space-x-3">
          <FaFileAlt className="text-blue-600 text-3xl" />
          <p className="text-gray-700">{file.name}</p>
        </div>
      )}

      {/* Upload Button */}
      {file && (
        <button 
          onClick={handleUpload}
          className={`mt-4 px-6 py-2 rounded-md text-white ${uploading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      )}
    </div>
  );
}
