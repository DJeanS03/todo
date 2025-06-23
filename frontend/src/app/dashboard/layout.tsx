"use client";

import { ReactNode } from "react";
import { TasksProvider } from "../hooks/useTask";
import PrivateRoute from "../components/routes/PrivateRoute";
import Header from "../components/header";

export default function DashboardLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <PrivateRoute>
      <TasksProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <main className="flex-1 px-4 py-6 flex justify-center">
            <div className="w-full max-w-4xl">{children}</div>
          </main>
        </div>
      </TasksProvider>
    </PrivateRoute>
  );
}
