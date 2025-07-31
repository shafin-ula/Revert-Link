import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  User as UserIcon,
  Heart,
  Moon,
  UserPlus
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Community",
    url: createPageUrl("Community"),
    icon: Home,
  },
  {
    title: "Meet Reverts",
    url: createPageUrl("MeetReverts"),
    icon: UserPlus,
  },
  {
    title: "Find Mentors",
    url: createPageUrl("Mentors"),
    icon: Users,
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: BookOpen,
  },
  {
    title: "Events",
    url: createPageUrl("Events"),
    icon: Calendar,
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: UserIcon,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      try {
        const user = await User.me();
        setCurrentUser(user);
        const isProfileIncomplete = !user.display_name || !user.gender || !user.country_of_origin;

        if (isProfileIncomplete && location.pathname !== createPageUrl("Profile")) {
          navigate(createPageUrl("Profile"));
        }
      } catch (error) {
        // User is not logged in, or it's a public page. Do nothing.
      }
    };

    checkProfileCompletion();
  }, [location.pathname, navigate]);

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-emerald: #065f46;
          --primary-emerald-light: #10b981;
          --accent-gold: #f59e0b;
          --accent-gold-light: #fbbf24;
          --warm-gray: #f9fafb;
          --text-primary: #111827;
          --text-secondary: #6b7280;
        }
      `}</style>

      <div className="min-h-screen flex w-full" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <Sidebar className="border-r border-emerald-100 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-emerald-100 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-sm"></div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-900">Revert Link</h2>
                <p className="text-xs text-emerald-600 font-medium">Community & Support</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-emerald-700 uppercase tracking-wider px-3 py-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-sm ${
                          location.pathname === item.url
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                            : 'text-gray-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                          {location.pathname === item.url && (
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-xl"></div>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-emerald-700 uppercase tracking-wider px-3 py-2">
                Community Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span className="text-gray-600">Growing Together</span>
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    "And We made them leaders guiding by Our command when they were patient and were certain of Our signs." - Quran 32:24
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-emerald-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center overflow-hidden">
                {currentUser?.profile_image_url ? (
                  <img 
                    src={currentUser.profile_image_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-5 h-5 text-emerald-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-emerald-900 text-sm truncate">As-Salāmu Alaykum</p>
                <p className="text-xs text-emerald-600 truncate">May Allah bless your journey</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/70 backdrop-blur-sm border-b border-emerald-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-emerald-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-emerald-900">Revert Link</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
