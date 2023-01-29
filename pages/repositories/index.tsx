import MainLayout from "@/components/layout";
import { useQuery } from "@apollo/client";
import Get_repositories_query from "@/queries/Get_repositories_query.gql";
import { useRouter } from "next/router";
import SearchInput from "@/components/form/SearchInput";
import { useMemo, ChangeEvent, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";
import Link from "next/link";
import { FaCertificate } from "react-icons/fa";
import Image from "next/image";
import spinner from "@/public/images/spinner.svg";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const searchInput = useRef<HTMLInputElement>(null);

  const debouncedEventHandler = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        router.push(
          {
            query: omitBy(
              {
                ...router.query,
                repo: event.target.value,
                page: undefined,
              },
              isEmpty
            ),
          },
          undefined,
          { shallow: true }
        );
      }, 300),
    [router]
  );

  const {
    loading: repoLoading,
    error: repoError,
    data: repoData,
    refetch: repoRefetch,
  } = useQuery(Get_repositories_query, {
    variables: { name: router.query.repo },
  });

  useEffect(() => {
    if (router.query.repo) {
      repoRefetch();
    }
  }, [router.query]);
  return (
    <>
      <Head>
        <title>{`Repositories - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex">
              <h1 className="text-xl font-semibold text-gray-900 mr-3">
                Repositories
              </h1>
              <Link
                href={"/repositories/create"}
                className="px-3 py-2 text-sm leading-4 inline-flex items-center gap-2 rounded-md border border-transparent shadow-md text-white bg-jucr-primary transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jucr-primary"
              >
                Create repository
              </Link>
            </div>

            <div className="relative mt-3">
              <SearchInput
                // @ts-ignore:next-line
                onChange={debouncedEventHandler}
                prefix="repo"
                ref={searchInput}
                defaultValue={router.query.repo}
              />
            </div>
          </div>
        </div>
        <div className="-mx-4 overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 ">
            {repoData && !repoLoading && (
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Open</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Description
                    </th>
                  </>
                </tr>
              </thead>
            )}
            {repoLoading && (
              <div className="w-full flex justify-center">
                <Image
                  src={spinner}
                  alt="spinner"
                  className="animate-spin"
                  width="50"
                  height="50"
                />
              </div>
            )}
            {!repoData?.search?.edges.length && !repoLoading && (
              <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
                <FaCertificate
                  className="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p className="mt-4 font-semibold text-gray-900">
                  No results found
                </p>
                <p className="mt-2 text-gray-500">
                  We couldn’t find anything with that term. Please try again.
                </p>
              </div>
            )}
            {repoData && !repoLoading && (
              <tbody className="divide-y divide-gray-200 bg-white">
                {repoData.search.edges.map((repo: any, i: number) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {repo.node.nameWithOwner}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href={repo.node.url ? repo.node.url : "#"}
                        className="px-3 py-2 text-sm leading-4 inline-flex items-center gap-2 rounded-md border border-transparent shadow-md text-white bg-jucr-primary transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jucr-primary"
                        target="_blank"
                      >
                        open
                      </Link>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 overflow-scroll">
                      {repo.node.description ? repo.node.description : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Page;
