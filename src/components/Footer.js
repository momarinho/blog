import React from 'react';

export default function Footer() {
  return (
    <footer className="py-16 bg-gray-700 text-gray-300 bottom-0 w-full">
      <div className="container mx-auto px-4 flex justify-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} By: Mateus Marinho
        </p>
      </div>
    </footer>
  );
}
