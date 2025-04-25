import React from 'react';
import Link from "next/link";
import {Button} from "@/src/components/ui/button";
import {ArrowRight} from "lucide-react";

function LandingPage() {
  return (
    <div
      className={"min-h-screen bg-gradient-to-br from-violet-950 to-black text-white px-6 py-12 flex flex-col items-center justify-center"}>
      <section className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Welcome to <span className="text-violet-400">AIZOKU</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          AIZOKU is an open-source offline AI chat platform, built with local-first privacy, flexibility, and
          extensibility in mind.
          Chat with powerful models like LLaMA or Qwen—right on your machine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chat">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
              Start new discussion <ArrowRight className="ml-2 w-5 h-5"/>
            </Button>
          </Link>
          <Link
            href="https://www.buymeacoffee.com/aizoku"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg"
                    className="border-white bg-transparent text-white hover:bg-white hover:text-black">
              Faire un don
            </Button>
          </Link>
        </div>
      </section>

      <footer className="mt-20 text-sm text-gray-500">
        © {new Date().getFullYear()} AIZOKU — Offline AI for Everyone
      </footer>
    </div>
  );
}

export default LandingPage;