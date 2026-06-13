import { createClient } from "@vercel/kv";
import { promises as fs } from "fs";
import path from "path";

export interface Signup {
  name: string;
  email: string;
  phone?: string;
  ts: string;
}

const KV_KEY = "waitlist:signups";

// Support both env-var naming schemes: Vercel KV (KV_REST_API_*) and the
// native Upstash integration (UPSTASH_REDIS_REST_*).
const KV_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const client =
  KV_URL && KV_TOKEN ? createClient({ url: KV_URL, token: KV_TOKEN }) : null;

/** Which backend is active — "kv" in production, "file" in local dev. */
export function storeBackend(): "kv" | "file" {
  return client ? "kv" : "file";
}

const localFile = () => path.join(process.cwd(), "data", "waitlist.json");

async function readLocal(): Promise<Signup[]> {
  try {
    return JSON.parse(await fs.readFile(localFile(), "utf8"));
  } catch {
    return [];
  }
}

/** Persist a signup. Durable in production via KV; file-based in local dev. */
export async function addSignup(signup: Signup): Promise<void> {
  if (client) {
    await client.rpush(KV_KEY, JSON.stringify(signup));
    return;
  }
  const list = await readLocal();
  list.push(signup);
  const file = localFile();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
}

/** Read all signups (oldest first). */
export async function getSignups(): Promise<Signup[]> {
  if (client) {
    const raw = await client.lrange<Signup | string>(KV_KEY, 0, -1);
    // @vercel/kv may return already-parsed objects or JSON strings.
    return raw.map((entry) =>
      typeof entry === "string" ? (JSON.parse(entry) as Signup) : entry,
    );
  }
  return readLocal();
}
