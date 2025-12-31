import { createClient } from '@supabase/supabase-js'

// 1. 从环境变量文件 (.env.local) 中读取那两个“钥匙”
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 2. 做一个安全检查：如果没读取到钥匙，就在控制台报错提醒你
// (这能帮你避免以后对着白屏找半天原因)
if (!supabaseUrl || !supabaseKey) {
  throw new Error('为了连接 Supabase，请确保 .env.local 文件里有 URL 和 ANON_KEY！')
}

// 3. 创建并导出这个客户端，以后在别的页面引用这个 'supabase' 变量就能操作数据库了
export const supabase = createClient(supabaseUrl, supabaseKey)