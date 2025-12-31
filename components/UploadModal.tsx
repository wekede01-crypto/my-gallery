"use client"; // 这是一个客户端组件（因为有按钮交互）

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function UploadModal() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // 当用户选择了文件
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // 1. 上传文件到 Supabase Storage (你的云盘)
      // 为了防止文件名重复，加个时间戳
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("gallery") // 你的桶名字
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. 获取图片的公开链接
      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      // 3. 把记录写入 Database (你的表格)
      const { error: dbError } = await supabase
        .from("images")
        .insert([
          {
            title: file.name.split('.')[0], // 默认用文件名当标题
            src: publicUrl,
          },
        ]);

      if (dbError) throw dbError;

      alert("上传成功！");
      router.refresh(); // 刷新页面，让你立刻看到新图
    } catch (error) {
      console.error(error);
      alert("上传失败，请检查控制台");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* 一个漂亮的悬浮按钮 */}
      <label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform hover:scale-110 active:scale-95">
        {uploading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        )}
        {/* 隐藏的文件输入框 */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}