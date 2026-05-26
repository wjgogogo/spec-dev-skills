import { createReadStream } from "node:fs";
import type { CliArgs, OpenAIImageModel, Quality } from "../types";

// 对齐 OpenAI Images API gpt-image-2 当前支持值。
// 不直接 import openai 的类型避免顶层依赖；运行时调用通过动态 import 完成。
type OpenAIQuality = "low" | "medium" | "high" | "auto";
type OpenAISize =
  | "auto"
  | "1024x1024"
  | "1024x1536"
  | "1536x1024"
  | "1024x768"
  | "768x1024"
  | "2048x2048"
  | "2048x1152"
  | "1152x2048"
  | "2048x1536"
  | "1536x2048"
  | "1536x656"
  | "2400x1024";

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      "OPENAI_API_KEY is required. Get one at https://platform.openai.com/api-keys",
    );
  }
  return key;
}

export function mapQuality(quality: Quality | null): OpenAIQuality {
  if (quality === "normal") return "medium";
  return "high";
}

export function mapAspectRatioToSize(
  aspectRatio: string | null,
  quality: Quality | null,
): OpenAISize {
  if (!aspectRatio) return "auto";

  const is2k = quality !== "normal";

  const table: Record<string, { normal: OpenAISize; "2k": OpenAISize }> = {
    "1:1":     { normal: "1024x1024", "2k": "2048x2048" },
    "16:9":    { normal: "1536x1024", "2k": "2048x1152" },
    "9:16":    { normal: "1024x1536", "2k": "1152x2048" },
    "4:3":     { normal: "1024x768",  "2k": "2048x1536" },
    "3:4":     { normal: "768x1024",  "2k": "1536x2048" },
    "2.35:1":  { normal: "1536x656",  "2k": "2400x1024" },
  };

  const entry = table[aspectRatio];
  if (!entry) {
    console.error(`未识别的 --ar ${aspectRatio}，使用 size=auto`);
    return "auto";
  }
  return is2k ? entry["2k"] : entry.normal;
}

export async function generateImage(
  prompt: string,
  model: OpenAIImageModel,
  args: CliArgs,
): Promise<Uint8Array> {
  const { default: OpenAI } = await import("openai");

  const client = new OpenAI({ apiKey: getApiKey() });

  const size = mapAspectRatioToSize(args.aspectRatio, args.quality);
  const quality = mapQuality(args.quality);
  const n = args.n ?? 1;

  console.error(`生成图片中 (${model}, size=${size}, quality=${quality})...`);

  let b64: string | null | undefined;

  if (args.referenceImages.length > 0) {
    const images = args.referenceImages.map((p) => createReadStream(p));
    const response = await client.images.edit({
      model,
      prompt,
      image: images.length === 1 ? images[0]! : images,
      size,
      quality,
      n,
    });
    b64 = response.data?.[0]?.b64_json;
  } else {
    const response = await client.images.generate({
      model,
      prompt,
      size,
      quality,
      n,
    });
    b64 = response.data?.[0]?.b64_json;
  }

  if (!b64) {
    throw new Error("OpenAI 未返回图片数据 (b64_json 为空)");
  }

  console.error("生成完成。");
  return Buffer.from(b64, "base64");
}
