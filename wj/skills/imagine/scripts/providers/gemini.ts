import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CliArgs, GeminiModel } from "../types";

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error(
      "GEMINI_API_KEY is required. Get one at https://aistudio.google.com/apikey"
    );
  }
  return key;
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  return map[ext] ?? "image/png";
}

type InlineDataPart = {
  inlineData: {
    mimeType: string;
    data: string;
  };
};

async function readImageAsPart(filePath: string): Promise<InlineDataPart> {
  const buf = await readFile(filePath);
  return {
    inlineData: {
      mimeType: getMimeType(filePath),
      data: buf.toString("base64"),
    },
  };
}

function mapImageSize(quality: string | null): string {
  if (quality === "normal") return "1K";
  return "2K";
}

export async function generateImage(
  prompt: string,
  model: GeminiModel,
  args: CliArgs,
): Promise<Uint8Array> {
  const { GoogleGenAI } = await import("@google/genai");

  const ai = new GoogleGenAI({ apiKey: getApiKey() });

  const imageParts: InlineDataPart[] = [];
  for (const refPath of args.referenceImages) {
    imageParts.push(await readImageAsPart(refPath));
  }

  // Gemini image generation API config
  // ref: https://ai.google.dev/gemini-api/docs/image-generation
  const config: Record<string, unknown> = {
    thinkingConfig: {
      thinkingLevel: "MINIMAL",
    },
    responseModalities: ["IMAGE"],
    imageConfig: {
      imageSize: mapImageSize(args.quality),
      ...(args.aspectRatio ? { aspectRatio: args.aspectRatio } : {}),
    },
    tools: [
      {
        googleSearch: {
          searchTypes: {
            imageSearch: {},
          },
        },
      },
    ],
  };

  const parts: Array<InlineDataPart | { text: string }> = [
    ...imageParts,
    { text: prompt },
  ];

  const contents = [{ role: "user" as const, parts }];

  console.error(`生成图片中 (${model})...`);

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  for await (const chunk of response) {
    const candidates = chunk.candidates;
    if (!candidates?.[0]?.content?.parts) continue;

    const part = candidates[0].content.parts[0];
    if (part?.inlineData?.data) {
      console.error("生成完成。");
      return Buffer.from(part.inlineData.data, "base64");
    }
  }

  throw new Error("Gemini 未返回图片数据");
}
