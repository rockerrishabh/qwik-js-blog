import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <main class="mx-auto max-w-md p-8 md:max-w-lg lg:max-w-xl" role="main">
      <h1 class="mb-6 text-2xl font-bold">Create Your Account</h1>
      <form class="space-y-4" aria-label="Sign up form">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />

          <pre class="mt-1 text-xs text-red-600"></pre>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />

          <pre class="mt-1 text-xs text-red-600"></pre>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            required
            class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />

          <pre class="mt-1 text-xs text-red-600"></pre>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />

          <pre class="mt-1 text-xs text-red-600"></pre>
        </div>
        <div class="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            value="true"
            class="cursor-pointer rounded border-slate-300 text-sky-600 focus:ring-sky-500 focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-800"
            aria-describedby="terms-description"
          />
          <div class="ml-3 text-sm">
            <label
              for="terms"
              class="font-medium text-slate-700 dark:text-slate-200"
            >
              I agree to the{" "}
              <a
                href="/terms"
                class="text-sky-700 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none dark:text-sky-300"
                aria-label="Terms and Conditions"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>

        <p
          class="hidden w-full items-center rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-600"
          aria-label="Form Error"
        ></p>

        <div class="pt-2">
          <button
            type="submit"
            class="w-full cursor-pointer rounded-lg bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-900 focus:ring-2 focus:ring-sky-500 focus:outline-none dark:bg-sky-600 dark:hover:bg-sky-700"
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </div>

        <p class="mt-4 text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            class="font-medium text-sky-700 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none dark:text-sky-300"
            aria-label="Sign In"
          >
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Sign Up",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
