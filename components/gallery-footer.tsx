"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Twitter, Facebook, Mail } from "lucide-react"

export function GalleryFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Newsletter subscription:", email)
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-light tracking-wide text-foreground">银河系画廊</h3>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Curating exceptional contemporary art and showcasing emerging talent from around the world.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4 lg:col-span-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-widest text-foreground">Stay Connected</h4>
              <p className="text-sm text-muted-foreground">
                Subscribe to receive updates on new exhibitions and artist features.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="size-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Yinhexi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
