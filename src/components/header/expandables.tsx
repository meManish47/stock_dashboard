"use client";
import {
  Bell,
  Home,
  HelpCircle,
  Settings,
  Shield,
  Mail,
  User,
  FileText,
  Lock,
  Newspaper,
  History,
} from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

function DefaultDemo() {
  const tabs = [
    { title: "Dashboard", icon: Home },
    { title: "Notifications", icon: Bell },

    { title: "Settings", icon: Settings },
    { title: "Support", icon: HelpCircle },
    { title: "Security", icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ExpandableTabs tabs={tabs} />
    </div>
  );
}

function CustomColorDemo() {
  const tabs = [
    { title: "Dashboard", icon: Home },
    { title: "Profile", icon: User },
    { title: "News", icon: Newspaper },
    { title: "History", icon: History },
  ];

  return (
    <div className="sm:flex hidden sm:gap-8 ">
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-blue-500"
        className="border-blue-200 dark:border-[#2B7FFF]"
      />
    </div>
  );
}

export { DefaultDemo, CustomColorDemo };
