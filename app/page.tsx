import Image from "next/image";
import { supabase } from "../lib/supabase";
import UploadModal from "../components/UploadModal";
import { GalleryFooter } from "@/components/gallery-footer"; 
import DeleteButton from "../components/DeleteButton"; // 👈 这里引入了新按钮

export default async function Home() {
  const { data: images, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error("数据获取失败:", error);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8 pb-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2 tracking-wider">银河系画廊</h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Project DreamCanvas Beta • 当前展出: {images?.length || 0} 幅
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {images?.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-900 border border-gray-800">
              
              {/* 👇 关键：这里放置了删除按钮！ */}
              <DeleteButton id={item.id} src={item.src} />
              
              <Image
                src={item.src}
                alt={item.title || "Gallery Image"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
          {(!images || images.length === 0) && (
            <div className="col-span-1 md:col-span-3 text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-xl">
              仓库空空如也...
            </div>
          )}
        </div>
      </div>
      <UploadModal />
      <GalleryFooter />
    </div>
  );
}