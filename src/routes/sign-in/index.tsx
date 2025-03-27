import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import {
  formAction$,
  useForm,
  zodForm$,
  type InitialValues,
} from "@modular-forms/qwik";

import { z } from "zod";

const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type SignInForm = z.infer<typeof SignInSchema>;

export const useFormLoader = routeLoader$<InitialValues<SignInForm>>(() => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<SignInForm>((values) => {
  // Runs on server
  console.log(values);
}, zodForm$(SignInSchema));

export default component$(() => {
  const [signInForm, { Form, Field }] = useForm<SignInForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(SignInSchema),
  });

  return (
    <main class="mx-auto max-w-md p-8 md:max-w-lg lg:max-w-xl" role="main">
      <h1 class="mb-6 text-2xl font-bold">Sign In To Your Account</h1>
      <Form class="space-y-4" aria-label="Sign in form">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Email
          </label>
          <Field name="email">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  type="email"
                  placeholder="you@example.com"
                  required
                  class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                {field.error && (
                  <pre class="mt-1 text-xs text-red-600">{field.error}</pre>
                )}
              </div>
            )}
          </Field>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Password
          </label>
          <Field name="password">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  type="password"
                  placeholder="Your password"
                  required
                  class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
                {field.error && (
                  <pre class="mt-1 text-xs text-red-600">{field.error}</pre>
                )}
              </div>
            )}
          </Field>
        </div>

        <div class="flex justify-end">
          <button class="cursor-pointer text-sm font-medium text-sky-700 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none dark:text-sky-300">
            Forget Password?
          </button>
        </div>

        <p
          class="hidden w-full items-center rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-600"
          aria-label="Form Error"
        ></p>

        <div class="pt-2">
          <button
            disabled={signInForm.submitting}
            type="submit"
            class="w-full cursor-pointer rounded-lg bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-900 focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-700 dark:bg-sky-600 dark:hover:bg-sky-700"
            aria-label="Sign In"
          >
            Sign In
          </button>
        </div>

        <p class="mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            class="font-medium text-sky-700 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none dark:text-sky-300"
            aria-label="Sign Up"
          >
            Sign Up
          </Link>
        </p>
      </Form>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Sign In",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
