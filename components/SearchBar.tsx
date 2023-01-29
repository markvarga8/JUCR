import {
  Fragment,
  useState,
  useMemo,
  ChangeEvent,
  useRef,
  FC,
  useEffect,
} from "react";
import debounce from "lodash/debounce";
import omitBy from "lodash/omitBy";
import isEmpty from "lodash/isEmpty";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import cn from "classnames";
import { FaCertificate } from "react-icons/fa";
import { useRouter } from "next/router";
import SearchInput from "./form/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchBarOpen } from "@/store/searchBar";
import { useQuery } from "@apollo/client";
import Get_repositories_query from "@/queries/Get_repositories_query.gql";
import Get_users_query from "@/queries/Get_users_query.gql";
import Link from "next/link";
import Image from "next/image";
import spinner from "@/public/images/spinner.svg";

const SearchBar: FC = () => {
  const router = useRouter();
  const searchBarOpen = useSelector(
    (state: RootState) => state.searchBar.searchBarOpen
  );
  const dispatch = useDispatch();
  const searchInput = useRef<HTMLInputElement>(null);

  const [mergeList, setMergeList] = useState<[]>([]);

  const debouncedEventHandler = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        router.push(
          {
            query: omitBy(
              {
                ...router.query,
                q: event.target.value,
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
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: usersRefetch,
  } = useQuery(Get_users_query, {
    variables: { name: router.query.q },
  });

  const {
    loading: repoLoading,
    error: repoError,
    data: repoData,
    refetch: repoRefetch,
  } = useQuery(Get_repositories_query, {
    variables: { name: router.query.q },
  });

  useEffect(() => {
    if (router.query.q) {
      usersRefetch();
      repoRefetch();
    }

    if (usersData && repoData) {
      const merged = [...repoData.search.edges, ...usersData.search.edges];
      // @ts-ignore:next-line
      setMergeList(merged);
    }
  }, [router.query, usersData, repoData]);

  return (
    <Transition.Root show={searchBarOpen} as={Fragment} appear>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(setSearchBarOpen(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox>
                <div className="relative">
                  <SearchInput
                    // @ts-ignore:next-line
                    onChange={debouncedEventHandler}
                    ref={searchInput}
                    defaultValue={router.query.q}
                  />
                </div>

                {usersLoading ||
                  (repoLoading && (
                    <div className="w-full flex justify-center">
                      <Image
                        src={spinner}
                        alt="spinner"
                        className="animate-spin"
                        width="50"
                        height="50"
                      />
                    </div>
                  ))}

                {mergeList && !usersLoading && !repoLoading && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2"
                  >
                    <li>
                      {mergeList.map((item: any, i: number) => (
                        <ul className="mt-2 text-gray-800">
                          <Link
                            href={item.node.url ? item.node.url : "#"}
                            target="_blank"
                          >
                            <Combobox.Option
                              key={i}
                              value={item}
                              className={({ active }) =>
                                cn(
                                  "cursor-pointer select-none px-4 py-2",
                                  active && "bg-indigo-600 text-white"
                                )
                              }
                            >
                              <p className=" text-xl">
                                {item.node.name
                                  ? item.node.name
                                  : "Name not available"}
                              </p>
                              <p className=" text-xs">
                                {item.node.bio
                                  ? item.node.bio
                                  : item.node.description
                                  ? item.node.description
                                  : "No description"}
                              </p>
                            </Combobox.Option>
                          </Link>
                        </ul>
                      ))}
                    </li>
                  </Combobox.Options>
                )}

                {!mergeList.length && !usersLoading && !repoLoading && (
                  <div className="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14">
                    <FaCertificate
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No results found
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchBar;
