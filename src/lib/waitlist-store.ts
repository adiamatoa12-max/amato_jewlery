import { kv } from "@vercel/kv";
import { promises as fs } from "fs";
import path from "path";

export interface Signup {
  name: string;
  email: string;
  phone?: string;
  ts: string;
}

const KV_KEY = "waitlist:signups";

/** Vercel KV is active when its REST credentials are present (auto-added by
 * Vercel when you create a KV store). Otherwise we fall back to a local JSON
 * file for development. */
function kvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
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
  if (kvConfigured()) {
    await kv.rpush(KV_KEY, JSON.stringify(signup));
    return;
  }
  const list = await readLocal();
  list.push(signup);
  const file = localFile();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
}

/** Read all signups (newest last). */
export async function getSignups(): Promise<Signup[]> {
  if (kvConfigured()) {
    const raw = await kv.lrange<Signup | string>(KV_KEY, 0, -1);
    // @vercel/kv may return already-parsed objects or JSON strings.
    return raw.map((entry) =>
      typeof entry === "string" ? (JSON.parse(entry) as Signup) : entry,
    );
  }
  return readLocal();
}
