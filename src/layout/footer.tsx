import React from 'react';
import Link from 'next/link';
import {Github} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
      <Link
        href="https://github.com/toukoms/css-ai"
        target="_blank"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Github className="h-4 w-4"/>
        Star on GitHub
      </Link>
      <span>|</span>
      Crafted with ❤️ By{" "}
      <Link
        href="https://github.com/toukoms"
        target="_blank"
        className="font-bold text-primary hover:text-primary/80"
      >
        Tokiniaina
      </Link>
    </footer>
  );
};

export default Footer;
