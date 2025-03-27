import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { ToggleTheme } from "./ToggleTheme";
import { NavLink } from "./NavLink";
import { Link } from "@builder.io/qwik-city";

export const Sidebar = component$(() => {
  const isOpen = useSignal(false);
  const sidebarRef = useSignal<HTMLElement>();

  const toggleOpen = $(() => {
    isOpen.value = !isOpen.value;
  });

  // Effect to handle clicks outside the sidebar
  useTask$(({ track, cleanup }) => {
    track(() => isOpen.value);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.value &&
        !sidebarRef.value.contains(event.target as Node)
      ) {
        isOpen.value = false;
      }
    };

    if (typeof document !== "undefined" && isOpen.value) {
      document.addEventListener("click", handleClickOutside);
    }

    cleanup(() => {
      if (typeof document !== "undefined") {
        document.removeEventListener("click", handleClickOutside);
      }
    });
  });

  return (
    <section class="flex md:hidden">
      {/* Menu Button - Increased touch target size */}
      <button
        onClick$={toggleOpen}
        aria-label="Open Sidebar"
        class="cursor-pointer p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      <div
        class={{
          "fixed inset-0 backdrop-blur-sm transition-opacity": true,
          "pointer-events-auto opacity-100": isOpen.value,
          "pointer-events-none opacity-0": !isOpen.value,
        }}
      ></div>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        class={{
          "fixed top-0 right-0 h-screen w-64 transform bg-slate-50 p-4 shadow-md transition-transform dark:bg-slate-900":
            true,
          "translate-x-0": isOpen.value,
          "translate-x-full": !isOpen.value,
        }}
      >
        {/* Close Button - Increased touch target size and padding */}
        <button
          onClick$={toggleOpen}
          aria-label="Close Sidebar"
          class="-mr-3 flex w-full cursor-pointer items-center justify-end p-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav class="mt-4 flex flex-col gap-6">
          <ul class="flex flex-col gap-2">
            <li>
              <NavLink
                href="/about-us"
                activeClass="text-sky-500"
                class="-mx-3 block rounded-lg p-3 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-sky-700 dark:hover:bg-slate-800 dark:hover:text-sky-300"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClass="text-sky-500"
                href="/contact-us"
                class="-mx-3 block rounded-lg p-3 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-sky-700 dark:hover:bg-slate-800 dark:hover:text-sky-300"
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <section class="space-y-4">
            <div class="-mx-3 inline-block rounded-lg p-3 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ToggleTheme />
            </div>
            <Link
              href="/sign-in"
              class="block w-full cursor-pointer rounded-lg bg-sky-800 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-900 focus:ring-2 focus:ring-sky-400 focus:outline-none dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-300"
              aria-label="Sign In"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              class="block w-full cursor-pointer rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-200 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-slate-400"
              aria-label="Sign Up"
            >
              Sign Up
            </Link>
          </section>
        </nav>
      </aside>
    </section>
  );
});
