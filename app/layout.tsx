import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import RetroGrid from "@/components/magicui/retro-grid"
import TextReveal from "@/components/magicui/text-reveal"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import AnimatedListDemo from "./animatedlist-demo/page"
import GlobePage from "./globe-section/page"
import NostalgiaPage from "./nostalgia-section/page"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "max-h-auto bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="mx-auto flex-1 items-center justify-center">
                {children}
                <div className="flex flex-col items-center justify-center space-y-8 pt-20 lg:flex-row lg:space-x-8 lg:space-y-0">
                  <GlobePage />
                  <AnimatedListDemo />
                </div>
              </div>
            </div>
            {/* <div className="pt-20"> */}
              <div className="flex h-auto items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-black">
                {/* <NostalgiaPage /> */}
                <TextReveal
           
                  text="Unlock your trading potential

With access to expert guidance!"
                />

                <TextReveal

                  text="Revolutionize Your Approach and build disciplined trading habits that lead to success. Join the waiting list today for early access!


"
                />
                
              </div>
      
            {/* </div> */}
            <SiteFooter className=" fixed inset-x-0 bottom-0 border-t sm:static" />
            
            {/* <div className="fixed bottom-0 inset-x-0 sm:static bg-neutral-900/3"> */}
             
            {/* </div> */}
            <TailwindIndicator />
            
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

