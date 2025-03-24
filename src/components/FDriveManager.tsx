import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FileText, Folder, HardDrive, Clock, AlertTriangle, FileCode, Shield, Download, Upload, Search, Filter, RefreshCw, Trash2, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import fdrive from '@/lib/fdrive-log-service';

interface File {
  id: string;
  name: string;
  type: FileType;
  size: number;
  created: Date;
  modified: Date;
  encrypted: boolean;
  content: string;
  status: FileStatus;
  ownerId: string;
  extension: string;
  path: string;
}

interface FolderType {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  size: number;
  ownerId: string;
  path: string;
}

type FileType = 'document' | 'code' | 'data' | 'binary';
type FileStatus = 'active' | 'archived' | 'deleted';

const initialFiles: File[] = [
  {
    id: uuidv4(),
    name: "important_document",
    type: "document",
    size: 450,
    created: new Date(),
    modified: new Date(),
    encrypted: true,
    content: "This is a very important document.",
    status: "active",
    ownerId: "system",
    extension: ".txt",
    path: "/documents/important_document.txt"
  },
  {
    id: uuidv4(),
    name: "script",
    type: "code",
    size: 1200,
    created: new Date(),
    modified: new Date(),
    encrypted: false,
    content: "console.log('Hello, world!');",
    status: "active",
    ownerId: "system",
    extension: ".js",
    path: "/scripts/script.js"
  },
  {
    id: uuidv4(),
    name: "data_file",
    type: "data",
    size: 2048,
    created: new Date(),
    modified: new Date(),
    encrypted: false,
    content: "{ data: 'example' }",
    status: "active",
    ownerId: "system",
    extension: ".dat",
    path: "/data/data_file.dat"
  },
  {
    id: uuidv4(),
    name: "executable",
    type: "binary",
    size: 8000,
    created: new Date(),
    modified: new Date(),
    encrypted: true,
    content: "Binary content",
    status: "active",
    ownerId: "system",
    extension: ".bin",
    path: "/bin/executable.bin"
  }
];

const initialFolders: FolderType[] = [
  {
    id: uuidv4(),
    name: "Documents",
    created: new Date(),
    modified: new Date(),
    size: 0,
    ownerId: "system",
    path: "/documents"
  },
  {
    id: uuidv4(),
    name: "Scripts",
    created: new Date(),
    modified: new Date(),
    size: 0,
    ownerId: "system",
    path: "/scripts"
  },
  {
    id: uuidv4(),
    name: "Data",
    created: new Date(),
    modified: new Date(),
    size: 0,
    ownerId: "system",
    path: "/data"
  },
  {
    id: uuidv4(),
    name: "Bin",
    created: new Date(),
    modified: new Date(),
    size: 0,
    ownerId: "system",
    path: "/bin"
  }
];

const FDriveManager: React.FC = () => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [folders, setFolders] = useState<FolderType[]>(initialFolders);
  const [activeTab, setActiveTab] = useState('files');
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<FileType>('document');
  const [newFileEncrypted, setNewFileEncrypted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [isEncryptedFilter, setIsEncryptedFilter] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState(fdrive.getLogs());
  const { toast } = useToast();

  useEffect(() => {
    setLogs(fdrive.getLogs());
  }, []);

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    
    const newFile = {
      id: uuidv4(),
      name: newFileName,
      type: newFileType as FileType,
      size: Math.floor(Math.random() * 1000) + 10,
      created: new Date(),
      modified: new Date(),
      encrypted: newFileEncrypted,
      content: `Content of ${newFileName}`,
      status: 'active' as FileStatus,
      ownerId: 'system',
      extension: newFileType === 'code' ? '.js' : 
                newFileType === 'data' ? '.dat' : 
                newFileType === 'document' ? '.txt' : '.bin',
      path: selectedFolder ? `${selectedFolder}/${newFileName}` : `/${newFileName}`
    };
    
    setFiles(prevFiles => [...prevFiles, newFile]);
    setNewFileName('');
    setNewFileType('document');
    setNewFileEncrypted(false);
    
    const logResult = fdrive.info(`Created new file: ${newFileName}`, { fileType: newFileType, path: newFile.path });
    
    toast({
      title: "File Created",
      description: `Successfully created ${newFileName}`,
    });
  };
  
  const handleDeleteFile = (id: string) => {
    const fileToDelete = files.find(file => file.id === id);
    if (!fileToDelete) return;
    
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    
    fdrive.warning(`Deleted file: ${fileToDelete.name}`, { path: fileToDelete.path });
    
    toast({
      title: "File Deleted",
      description: `Successfully deleted ${fileToDelete.name}`,
      variant: "destructive"
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fakeUpload = (progressCallback: (progress: number) => void) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        progressCallback(progress);
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "File Uploaded",
            description: `Successfully uploaded ${file.name}`,
          });
        }
      }, 100);
    };

    fakeUpload((progress) => {
      setUploadProgress(progress);
    });
  };

  const handleFileDownload = (file: File) => {
    const fakeDownload = (progressCallback: (progress: number) => void) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        progressCallback(progress);
        if (progress >= 100) {
          clearInterval(interval);
          toast({
            title: "File Downloaded",
            description: `Successfully downloaded ${file.name}`,
          });
        }
      }, 100);
    };

    fakeDownload((progress) => {
      setDownloadProgress(progress);
    });
  };

  const handleFileScan = () => {
    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setScanProgress(0);
        toast({
          title: "File System Scan Complete",
          description: "Successfully scanned the file system for threats.",
        });
      }
    }, 100);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(file => !isEncryptedFilter || file.encrypted);

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'size') {
      return a.size - b.size;
    } else {
      return 0;
    }
  });

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-lg border-slate-700">
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 py-4 px-6">
        <CardTitle className="text-xl flex items-center">
          <HardDrive className="h-5 w-5 text-amber-500 mr-2" />
          F-Drive Manager
        </CardTitle>
        <CardDescription className="text-slate-400">
          Manage your files and folders securely
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-slate-700">
          <TabsList className="w-full justify-start px-4 bg-slate-900">
            <TabsTrigger value="files" className="data-[state=active]:bg-slate-800">
              <FileText className="h-4 w-4 mr-1" />
              Files
            </TabsTrigger>
            <TabsTrigger value="folders" className="data-[state=active]:bg-slate-800">
              <Folder className="h-4 w-4 mr-1" />
              Folders
            </TabsTrigger>
            <TabsTrigger value="logs" className="data-[state=active]:bg-slate-800">
              <Clock className="h-4 w-4 mr-1" />
              Logs
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="files" className="p-4 m-0 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search files..."
                  className="h-8 text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="h-8 w-[120px] text-xs">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                  </SelectContent>
                </Select>
                <Switch id="encrypted" checked={isEncryptedFilter} onCheckedChange={setIsEncryptedFilter} />
                <label htmlFor="encrypted" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed">
                  Encrypted
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" className="h-8 text-xs" onClick={handleFileScan} disabled={isScanning}>
                  {isScanning ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Scanning... {scanProgress}%
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Scan Files
                    </>
                  )}
                </Button>
                <Input type="file" id="upload" className="hidden" onChange={handleFileUpload} />
                <label htmlFor="upload">
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </label>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <Progress value={uploadProgress} className="w-24" />
                )}
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="divide-y divide-slate-700">
                {sortedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between py-2 px-3 hover:bg-slate-800/30">
                    <div className="flex items-center">
                      {file.type === 'document' && <FileText className="h-4 w-4 mr-2 text-blue-400" />}
                      {file.type === 'code' && <FileCode className="h-4 w-4 mr-2 text-green-400" />}
                      {file.type === 'data' && <Database className="h-4 w-4 mr-2 text-amber-400" />}
                      {file.type === 'binary' && <HardDrive className="h-4 w-4 mr-2 text-red-400" />}
                      <span className="text-sm">{file.name}</span>
                      {file.encrypted && <Shield className="h-3 w-3 ml-1 text-yellow-500" />}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-400">{file.size} KB</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleFileDownload(file)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleDeleteFile(file.id)}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <CardFooter className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="New file name"
                    className="h-8 text-xs"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={newFileType} onValueChange={(value) => setNewFileType(value as FileType)}>
                    <SelectTrigger className="h-8 w-[120px] text-xs">
                      <SelectValue placeholder="File type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="code">Code</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                      <SelectItem value="binary">Binary</SelectItem>
                    </SelectContent>
                  </Select>
                  <Switch id="file-encrypted" checked={newFileEncrypted} onCheckedChange={setNewFileEncrypted} />
                  <label htmlFor="file-encrypted" className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed">
                    Encrypted
                  </label>
                  <Button size="sm" className="h-8 text-xs" onClick={handleCreateFile}>
                    Create File
                  </Button>
                </div>
              </div>
            </CardFooter>
          </TabsContent>

          <TabsContent value="folders" className="p-4 m-0 h-full">
            <div>
              <h3 className="text-lg font-semibold mb-4">Folder Management</h3>
              <p>This feature is under development.</p>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="p-4 m-0 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                F-Drive Logs
              </CardTitle>
            </div>
            <ScrollArea className="flex-1">
              <div className="divide-y divide-slate-700">
                {logs.map(log => (
                  <div key={log.id} className="py-2 px-3 hover:bg-slate-800/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {log.level === 'info' && <FileText className="h-4 w-4 mr-2 text-blue-400" />}
                        {log.level === 'warning' && <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />}
                        {log.level === 'error' && <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />}
                        {log.level === 'debug' && <FileCode className="h-4 w-4 mr-2 text-green-400" />}
                        <span className="text-sm">{log.message}</span>
                      </div>
                      <div className="text-xs text-slate-400">{log.timestamp.toLocaleTimeString()}</div>
                    </div>
                    {log.data && (
                      <div className="mt-1 text-xs text-slate-400">
                        Data: {JSON.stringify(log.data)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>

      <CardFooter className="py-2 px-4 border-t border-slate-700 bg-slate-900 text-xs text-slate-400">
        F-Drive Manager - Secure File Management
      </CardFooter>
    </Card>
  );
};

export default FDriveManager;
