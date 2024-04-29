import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

async function test() {
  const { data, error } = await supabase.rpc('match_products', {
    filter: { minPrice: 10, maxPrice: 50 },
    query_embedding: [0, 0, 1, 39],
  })

  console.log(data || error)
}

test()