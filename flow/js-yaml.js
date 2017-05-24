declare module 'js-yaml' {
  declare interface LoadOptions {
		filename?: string;
		strict?: boolean;
		schema?: any;
	}
  declare function safeLoad(str: string, opts?: LoadOptions): any;
}
