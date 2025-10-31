// app/confirmation/page.tsx

import { Suspense } from 'react';
import ConfirmationContent from './ConfirmationContent';
import Navbar from '@/components/Navbar'; // Import Navbar here for the loading state

// A simple loading component that matches your page's layout
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* This class list now perfectly matches ConfirmationContent */}
      <div className="flex justify-center items-center w-full min-h-[calc(100vh-80px)] pt-14">
        <div className="text-center">
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    </div>
  );
}

// This is the new Server Component for the page
export default function ConfirmationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ConfirmationContent />
    </Suspense>
  );
}