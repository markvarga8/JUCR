import MainLayout from "@/components/layout";
import { useQuery } from "@apollo/client";
import Get_users_query from "@/queries/Get_users_query.gql";
import { useRouter } from "next/router";
import SearchInput from "@/components/form/SearchInput";
import { useMemo, ChangeEvent } from "react";
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

  const debouncedEventHandler = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        router.push(
          {
            query: omitBy(
              {
                ...router.query,
                user: event.target.value,
                page: undefined,
              },
              isEmpty,
            ),
          },
          undefined,
          { shallow: true },
        );
      }, 300),
    [router],
  );

  const { loading: usersLoading, data: usersData } = useQuery(Get_users_query, {
    variables: { name: router.query.user },
  });

  return (
    <>
      <Head>
        <title>{`Users`}</title>
      </Head>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex">
              <h1 className="text-xl font-semibold text-gray-900 mr-3">Users</h1>
            </div>

            <div className="relative mt-3">
              <SearchInput
                // @ts-ignore:next-line
                onChange={debouncedEventHandler}
                prefix="user"
                defaultValue={router.query.user}
              />
            </div>
          </div>
        </div>
        <div className="-mx-4 overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 ">
            {usersData && !usersLoading && (
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Name
                  </th>
                  <>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Open</span>
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Description
                    </th>
                  </>
                </tr>
              </thead>
            )}
            {usersLoading && (
              <div className="w-full flex justify-center">
                <Image src={spinner} alt="spinner" className="animate-spin" width="50" height="50" />
              </div>
            )}
            {!usersData?.search?.edges.length && !usersLoading && (
              <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
                <FaCertificate className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                <p className="mt-4 font-semibold text-gray-900">No results found</p>
                <p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
              </div>
            )}
            {usersData && !usersLoading && (
              <tbody className="divide-y divide-gray-200 bg-white">
                {usersData.search.edges.map((user: any, i: number) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {user.node.name ? user.node.name : "Name not available"}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link
                        href={user.node.url ? user.node.url : "#"}
                        className="px-3 py-2 text-sm leading-4 inline-flex items-center gap-2 rounded-md border border-transparent shadow-md text-white bg-jucr-primary transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jucr-primary"
                        target="_blank"
                      >
                        open
                      </Link>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 overflow-scroll">
                      {user.node.description ? user.node.description : "Not available"}
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
