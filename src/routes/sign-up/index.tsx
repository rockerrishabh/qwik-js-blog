import { component$ } from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  z,
  type DocumentHead,
} from "@builder.io/qwik-city";
import {
  formAction$,
  type InitialValues,
  useForm,
  zodForm$,
} from "@modular-forms/qwik";

const SignUpSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    terms: z.object({
      array: z.array(z.string()),
      boolean: z.boolean(),
    }),
  })
  .refine((field) => field.password === field.confirmPassword, {
    message: "Passwords do not match",
  });

type SignUpForm = z.infer<typeof SignUpSchema>;

export const useFormLoader = routeLoader$<InitialValues<SignUpForm>>(() => ({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: {
    array: [],
    boolean: false,
  },
}));

export const useFormAction = formAction$<SignUpForm>((values) => {
  // Runs on server
  console.log(values);
}, zodForm$(SignUpSchema));

export default component$(() => {
  const [signUpForm, { Form, Field }] = useForm<SignUpForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(SignUpSchema),
  });

  return (
    <main class="mx-auto max-w-md p-8 md:max-w-lg lg:max-w-xl" role="main">
      <h1 class="mb-6 text-2xl font-bold">Create Your Account</h1>
      <Form class="space-y-4" aria-label="Sign up form">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Name
          </label>
          <Field name="name">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  type="text"
                  placeholder="Your Name"
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
                  placeholder="Your Email Address"
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
                  placeholder="Your New Password"
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
            for="confirmPassword"
            class="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Confirm Password
          </label>
          <Field name="confirmPassword">
            {(field, props) => (
              <div>
                <input
                  {...props}
                  type="password"
                  placeholder="Confirm Your Password"
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
        <div class="flex items-center">
          <Field name="terms.boolean" type="boolean">
            {(field, props) => (
              <div>
                <input
                  type="checkbox"
                  {...props}
                  required
                  checked={field.value}
                  class="cursor-pointer rounded border-slate-300 text-sky-600 focus:ring-sky-500 focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-800"
                  aria-describedby="terms-description"
                />
                {field.error && (
                  <pre class="mt-1 text-xs text-red-600">{field.error}</pre>
                )}
              </div>
            )}
          </Field>
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
            disabled={signUpForm.submitting}
            type="submit"
            class="w-full cursor-pointer rounded-lg bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-900 focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-700 dark:bg-sky-600 dark:hover:bg-sky-700"
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
      </Form>
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
