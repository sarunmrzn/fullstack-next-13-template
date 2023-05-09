"use client";
import SidebarWithHeader from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarWithHeader>{children}</SidebarWithHeader>;
}
