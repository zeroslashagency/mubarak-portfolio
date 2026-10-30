"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MachineConnectMonitor() {
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("8082");

  return (
    <div className="bg-black text-white p-6 rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-medium mb-6">Machine Connect Monitor</h2>

      <h1 className="text-5xl font-bold mb-10">Machine Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#0a1a0a] border border-[#1a3a1a] p-4 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold">Machine 1</span>
              <span className="text-gray-400 ml-2">IP: 192.168.1.67</span>
            </div>
            <div>
              <span className="bg-green-500 text-black px-2 py-1 rounded text-xs">
                Status: Online
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#0a1a0a] border border-[#1a3a1a] p-4 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold">Machine 2</span>
              <span className="text-gray-400 ml-2">IP: 192.168.1.60</span>
            </div>
            <div>
              <span className="bg-green-500 text-black px-2 py-1 rounded text-xs">
                Status: Online
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-shrink-0">
          <span className="font-medium mr-4">Machine</span>
        </div>
        <div className="flex-grow">
          <Input
            placeholder="Enter The IP Address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="bg-black border-gray-700"
          />
        </div>
        <div className="w-20">
          <Input
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="bg-black border-gray-700"
          />
        </div>
        <Button className="bg-gray-800 hover:bg-gray-700">Connect</Button>
      </div>
    </div>
  );
}
