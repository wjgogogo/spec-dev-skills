export type Quality = "normal" | "2k";

export type GeminiModel = "gemini-3.1-flash-image-preview";

export type CliArgs = {
  prompt: string | null;
  promptFiles: string[];
  imagePath: string | null;
  model: GeminiModel | null;
  aspectRatio: string | null;
  quality: Quality | null;
  referenceImages: string[];
  n: number;
  batchFile: string | null;
  jobs: number | null;
  json: boolean;
  help: boolean;
};

export type BatchTaskInput = {
  id?: string;
  prompt?: string | null;
  promptFiles?: string[];
  image?: string;
  ar?: string | null;
  quality?: Quality | null;
  ref?: string[];
  n?: number;
};

export type BatchFile =
  | BatchTaskInput[]
  | {
      tasks: BatchTaskInput[];
      jobs?: number | null;
    };

export type ExtendConfig = {
  version: number;
  default_quality: Quality | null;
  default_aspect_ratio: string | null;
  batch?: {
    max_workers?: number | null;
    concurrency?: number | null;
    start_interval_ms?: number | null;
  };
};
