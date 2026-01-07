'use client'
import React, { useState } from 'react';
import { Grid2x2PlusIcon, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShinyButton } from "@/components/ui/shiny-button";
import { ThresholdModal } from "@/components/ThresholdModal";
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
     { label: 'Features', href: '/#features' },
    { label: 'Working', href: '/#workflow' },
  ];

  return (
<header
  className={cn(
    "fixed lg:top-4 left-1/2 -translate-x-1/2 z-50", // ✅ fixed & centered
    "w-full max-w-3xl border shadow rounded-lg",   // ✅ width + shape
    "bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg"
  )}
>

      <nav className="mx-auto flex items-center justify-between p-2 px-4">
        {/* Logo / Left side */}
                  <Link href={'/'}>
        <div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
          <Image src={'/kalkia-logo.png'} alt={'Kalkia Logo'} width={20} height={20} />
          <p className="font-mono text-base font-bold">Kalkia</p>
        </div>
                  </Link>


        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative inline-block group"
            >
              <span className="
                relative z-10 block uppercase font-semibold transition-colors duration-300
                group-hover:text-white text-sm px-3 py-2
              ">
                {link.label}
              </span>
              {/* Top & bottom border animation */}
              <span className="
                absolute inset-0 border-t-2 border-b-2 border-[#262626]
                transform scale-y-[2] opacity-0 
                transition-all duration-300 origin-center
                group-hover:scale-y-100 group-hover:opacity-100
              " />
              {/* Background fill animation */}
              <span className="
                absolute top-[2px] left-0 w-full h-full bg-[#262626]
                transform scale-0 opacity-0
                transition-all duration-300 origin-top
                group-hover:scale-100 group-hover:opacity-100
              " />
            </a>
          ))}
        </div>

        {/* Right side (Buttons + Mobile Menu) */}
        <div className="flex items-center gap-2">
          <ThresholdModal />
          {/* <ShinyButton className='hidden sm:block'><Link href={'/dashboard'}>Get Started</Link></ShinyButton> */}

          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen(!open)}
              className="lg:hidden rounded-full"
            >
              <MenuIcon className="size-4" />
            </Button>
            <SheetContent
              className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
              side="left"
            >
              <div className="grid gap-y-4 overflow-y-auto px-4 pt-12 pb-5">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="relative inline-block group"
                  >
                    <span className="
                      relative z-10 block uppercase font-semibold transition-colors duration-300
                      group-hover:text-white text-base px-3 py-2
                    ">
                      {link.label}
                    </span>
                    <span className="
                      absolute inset-0 border-t-2 border-b-2 border-[#262626]
                      transform scale-y-[2] opacity-0 
                      transition-all duration-300 origin-center
                      group-hover:scale-y-100 group-hover:opacity-100
                    " />
                    <span className="
                      absolute top-[2px] left-0 w-full h-full bg-[#262626]
                      transform scale-0 opacity-0
                      transition-all duration-300 origin-top
                      group-hover:scale-100 group-hover:opacity-100
                    " />
                  </a>
                ))}
                
                {/* Add threshold button in mobile menu */}
                <div className="pt-4 border-t">
                  <ThresholdModal />
                </div>
              </div>
              <SheetFooter>
                <ShinyButton>
                  <Link href={'/dashboard'}>
Get Started
</Link></ShinyButton>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
