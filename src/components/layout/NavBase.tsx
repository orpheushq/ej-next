"use client"

import Logo from "@/../public/assets/navbar-logo.png"
import { Dialog } from "@headlessui/react"
import Image from "next/image"
import Link from "next/link"
import PlusIcon from "@/../public/assets/icons/plus.svg"
import { useState } from "react"

export default function NavBase(): JSX.Element {
  const navigation = [
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "#" }
  ]

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header
      className="
      absolute inset-x-0 top-0 z-50
      px-6 py-0
      md:px-16 md:py-10
      xl:px-28 xl:py-10
      w-screen
    "
    >
      <nav className="flex items-center justify-between" aria-label="Global">
        <div className="flex-grow lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">NoLoopTech</span>
            <Image
              src={Logo}
              className="h-14 xl:h-24 w-auto"
              alt="No Loop Tech logo"
            />
          </a>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => {
              setMobileMenuOpen(true)
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="24" height="4" rx="2" fill="#D9D9D9" />
              <rect y="8.5" width="24" height="4" rx="2" fill="#D9D9D9" />
              <rect y="16.5" width="24" height="4" rx="2" fill="#D9D9D9" />
            </svg>
          </button>
        </div>
        <div
          className="
          hidden md:flex
          gap-x-4 md:gap-x-4 xl:gap-x-12
          items-center
        "
        >
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="
                text-white
                text-lg
                font-normal
              "
            >
              {item.name}
            </Link>
          ))}
          <a
            href="/contact"
            className="
              text-lg
              font-medium
              leading-normal
              text-white
              py-2 px-4
              rounded-full
              border-[1px] border-white

              hover:bg-white hover:text-black hover:no-underline
              transition-all
            "
          >
            Get In Touch
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => {
                setMobileMenuOpen(false)
              }}
            >
              <span className="sr-only">Your Company</span>
              <Image
                src={Logo}
                className="h-8  w-auto"
                alt="No Loop Tech logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md py-2.5 px-0 text-white"
              onClick={() => {
                setMobileMenuOpen(false)
              }}
            >
              <span className="sr-only">Close menu</span>
              <PlusIcon className="rotate-45" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/20 transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
