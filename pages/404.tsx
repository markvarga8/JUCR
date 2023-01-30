import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

const Custom404: FC = () => (
  <>
    <Head>
      <title>{`404 - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
    </Head>
    <div className=" min-h-screen bg-jucr-primary px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-jucr-secondary sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
              <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                href="/"
                className="inline-flex items-center rounded-md border border-transparent bg-jucr-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>
);

export default Custom404;
