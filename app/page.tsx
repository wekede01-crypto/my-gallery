import Image from "next/image";
import { supabase } from "../lib/supabase";
import UploadModal from "../components/UploadModal"; // 1. 引入刚才写的按钮

export default async function Home() {
  // 这里的 logic 不变：去数据库拿所有图片
  const { data: images, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false }); // 按时间倒序，新图在前

  if (error) {
    console.error("数据获取失败:", error);
  }

  return (
    <div className="min-h-screen bg-black p-8 pb-24"> {/* pb-24 是为了防止底部内容被悬浮按钮挡住 */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">银河系画廊</h1>
        <p className="text-gray-400">
          当前展出作品：{images?.length || 0} 幅
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images?.map((item) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-900 border border-gray-800">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
        
        {(!images || images.length === 0) && (
          <div className="text-white col-span-3 text-center py-20">
            还没有图片，点击右下角的加号上传一张吧！
          </div>
        )}
      </div>

      {/* 2. 把上传按钮放在这里 */}
      <UploadModal />
      
    </div>
  );
}