import { sleep } from "@/helpers";

export async function POST(req: Request) {
  await sleep(5000)
  return new Response('hello world', { status: 200 })
}