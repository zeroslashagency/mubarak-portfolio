"use client";

import StorySection from "@/components/story-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StoryPage() {
    return (
        <main className="min-h-screen bg-background text-foreground relative">
            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <Button variant="outline" size="sm" asChild className="gap-2">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>

            {/* Story Section */}
            <div className="pt-20 pb-10">
                <StorySection />
            </div>

            {/* Footer for this page */}
            <footer className="py-8 text-center text-muted-foreground text-sm">
                <p>© {new Date().getFullYear()} Mubarak A. All rights reserved.</p>
            </footer>
        </main>
    );
}
