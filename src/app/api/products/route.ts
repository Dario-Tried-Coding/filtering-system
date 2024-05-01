import { sleep } from "@/helpers";

export async function POST(req: Request) {
  await sleep(2000)
  return new Response('hello world', { status: 200 })
}