
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive, File, FolderOpen, Trash, Download, Upload } from 'lucide-react';

export const FDrive = () => {
  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <HardDrive className="h-5 w-5 text-indigo-500" />
          <CardTitle className="text-lg">F-Drive</CardTitle>
        </div>
        <CardDescription>
          Virtual file system
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex space-x-2 text-xs">
          <button className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 p-1.5 rounded flex items-center">
            <FolderOpen className="h-3.5 w-3.5 mr-1" />
            Open
          </button>
          <button className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 p-1.5 rounded flex items-center">
            <Upload className="h-3.5 w-3.5 mr-1" />
            Upload
          </button>
          <button className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 p-1.5 rounded flex items-center">
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </button>
          <button className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-1.5 rounded flex items-center">
            <Trash className="h-3.5 w-3.5 mr-1" />
            Delete
          </button>
        </div>
        
        <div className="border rounded divide-y text-sm">
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <File className="h-4 w-4 text-blue-500 mr-2" />
            <span className="flex-grow">parasite_data.enc</span>
            <span className="text-xs text-gray-500">2.4MB</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <File className="h-4 w-4 text-green-500 mr-2" />
            <span className="flex-grow">quantum_states.dat</span>
            <span className="text-xs text-gray-500">1.7MB</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <File className="h-4 w-4 text-purple-500 mr-2" />
            <span className="flex-grow">evolution_log.json</span>
            <span className="text-xs text-gray-500">3.1MB</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <File className="h-4 w-4 text-amber-500 mr-2" />
            <span className="flex-grow">security_configs.yaml</span>
            <span className="text-xs text-gray-500">0.8MB</span>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <File className="h-4 w-4 text-red-500 mr-2" />
            <span className="flex-grow">network_scans.bin</span>
            <span className="text-xs text-gray-500">4.2MB</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 flex justify-between">
          <span>5 files selected</span>
          <span>12.2MB / 1TB used</span>
        </div>
      </CardContent>
    </Card>
  );
};
