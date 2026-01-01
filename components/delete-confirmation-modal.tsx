"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-2xl ring-1 ring-white/10">
        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-3 ring-1 ring-red-500/20">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-white">Delete Image?</h2>
          <p className="text-pretty text-sm leading-relaxed text-zinc-400">
            This action cannot be undone. The image will be permanently removed from the gallery.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-red-600 text-white hover:bg-red-700">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
