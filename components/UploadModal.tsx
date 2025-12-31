"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function UploadModal() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileName = `${Date.now()}-${file.name}`;
      
      // 1. 上传文件
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      // 2. 获取链接
      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      // 3. 写入数据库
      const { error: dbError } = await supabase
        .from("images")
        .insert([{ title: file.name.split('.')[0], src: publicUrl }]);
      if (dbError) throw dbError;

      alert("上传成功！");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("上传失败");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-xl transition-transform hover:scale-110 active:scale-95">
        {uploading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>
    </div>
  );
}