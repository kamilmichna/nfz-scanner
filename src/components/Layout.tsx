import React, { ReactNode } from "react";
import { HeartPulse } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Wyszukiwarka Terminów NFZ</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <HeartPulse className="h-6 w-6" />
                <span className="text-xl font-semibold">
                  Wyszukiwarka Terminów NFZ
                </span>
              </div>
              <p className="text-gray-400 mt-2">
                &copy; {new Date().getFullYear()} Wyszukiwarka Terminów NFZ.
                Wszelkie prawa zastrzeżone.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
