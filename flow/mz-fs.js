declare module 'mz/fs' {
  declare function access(path: string, mode?: number): Promise<void>;
  declare function readFile(file: string | number | Buffer, options: { encoding: string; flag?: string; } | string): Promise<string>;
  declare function readFile(file: string | number | Buffer, options?: { encoding?: "buffer" | null; flag?: string; } | "buffer" | null): Promise<Buffer>;
  declare function writeFile(file: string | number | Buffer, data: string | Buffer, options?: { encoding?: string | null; mode?: string | number; flag?: string; } | string | null): Promise<void>;
}
