"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site-data";

export function ContactForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get("name") || "");
        const message = String(form.get("message") || "");
        const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);
        const body = encodeURIComponent(message);
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      }}
      className="rounded-lg border border-white/10 bg-white/[0.052] p-5 shadow-panel backdrop-blur-xl md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-white/[0.62]">Name</span>
          <input
            required
            name="name"
            className="h-12 w-full rounded-lg border border-white/10 bg-black/[0.28] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/[0.45]"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/[0.62]">Email</span>
          <input
            required
            type="email"
            name="email"
            className="h-12 w-full rounded-lg border border-white/10 bg-black/[0.28] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/[0.45]"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-2 block text-sm text-white/[0.62]">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="w-full resize-none rounded-lg border border-white/10 bg-black/[0.28] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/[0.45]"
          placeholder="Tell me about the project"
        />
      </label>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-white/[0.48]">Response channel: email</p>
        <Button type="submit">
          <Send />
          Send Message
        </Button>
      </div>
    </form>
  );
}
