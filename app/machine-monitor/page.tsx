import { MachineConnectMonitor } from "@/components/machine-connect-monitor";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function MachineMonitorPage() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="text-white border-white/20 hover:bg-white/10"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Machine Connect Monitor Demo
          </h1>
          <p className="text-gray-400 max-w-3xl">
            This interactive demo showcases a real-time machine monitoring
            dashboard. The system allows users to track machine status, connect
            to devices remotely, and monitor performance metrics across a
            network.
          </p>
        </div>

        <div className="mb-8">
          <Image
            src="/machine-monitor.jpg"
            alt="Machine Connect Monitor"
            width={1000}
            height={500}
            className="rounded-lg border border-gray-800 shadow-xl"
          />
        </div>

        <MachineConnectMonitor />

        <div className="mt-12 bg-gray-900/50 p-6 rounded-lg max-w-3xl">
          <h2 className="text-xl font-semibold mb-4">About This Project</h2>
          <p className="mb-4">
            The Machine Connect Monitor is a full-stack application built with
            React, Next.js, and WebSockets for real-time communication. It
            features a clean, intuitive interface designed with Tailwind CSS.
          </p>
          <p className="mb-4">Key features include:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Real-time machine status monitoring</li>
            <li>Secure connection protocols</li>
            <li>Responsive design for all device sizes</li>
            <li>Automatic status updates and notifications</li>
            <li>Network performance analytics</li>
          </ul>
          <p>
            This demo showcases the frontend interface. In a production
            environment, it would connect to a backend service that communicates
            with actual networked machines.
          </p>
        </div>
      </div>
    </main>
  );
}
