
import { v4 as uuidv4 } from 'uuid';
import { ToastProps } from '@/components/ui/toast-types';

export interface FDriveLogEntry {
  id: string;
  timestamp: Date;
  message: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  data?: any;
  category?: string;
}

class FDriveLogService {
  private logs: FDriveLogEntry[] = [];
  private maxLogs = 1000;

  constructor() {
    // Initialize with some default logs
    this.logs = [
      {
        id: uuidv4(),
        timestamp: new Date(),
        message: "FDrive log service initialized",
        level: 'info',
        category: 'system'
      }
    ];
  }

  // Log methods
  info(message: string, data?: any, category: string = 'general') {
    return this.addLog(message, 'info', data, category);
  }

  warning(message: string, data?: any, category: string = 'general') {
    return this.addLog(message, 'warning', data, category);
  }

  error(message: string, data?: any, category: string = 'general') {
    return this.addLog(message, 'error', data, category);
  }

  debug(message: string, data?: any, category: string = 'general') {
    return this.addLog(message, 'debug', data, category);
  }

  // For basilisk app logs
  basilisk(message: string, data?: any, category: string = 'basilisk') {
    return this.addLog(message, 'info', data, category);
  }

  // Add log entry - fixed to use default parameters correctly
  private addLog(message: string, level: 'info' | 'warning' | 'error' | 'debug', data?: any, category: string = 'general') {
    const logEntry: FDriveLogEntry = {
      id: uuidv4(),
      timestamp: new Date(),
      message,
      level,
      data,
      category
    };

    // Add to logs, maintain max size
    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    return {
      success: true,
      message,
      data,
      category,
      level
    };
  }

  // Get all logs
  getLogs() {
    return [...this.logs];
  }

  // Get logs by level
  getLogsByLevel(level: 'info' | 'warning' | 'error' | 'debug') {
    return this.logs.filter(log => log.level === level);
  }

  // Get logs by category
  getLogsByCategory(category: string) {
    return this.logs.filter(log => log.category === category);
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
    return { success: true, message: "Logs cleared" };
  }

  // Get log counts
  getLogCounts() {
    return {
      total: this.logs.length,
      info: this.logs.filter(log => log.level === 'info').length,
      warning: this.logs.filter(log => log.level === 'warning').length,
      error: this.logs.filter(log => log.level === 'error').length,
      debug: this.logs.filter(log => log.level === 'debug').length
    };
  }
}

const fdriveLogService = new FDriveLogService();
export default fdriveLogService;
