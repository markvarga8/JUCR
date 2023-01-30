import MainLayout from "@/components/layout";
import { useMutation } from "@apollo/client";
import { FormEvent, useEffect } from "react";
import Create_repository from "@/queries/Create_repository.gql";
import { useRouter } from "next/router";
import FormButton from "@/components/form/FormButton";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const [createRepository, { data, loading }] = useMutation(Create_repository);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    createRepository({ variables: Object.fromEntries(formData as any) });
  };

  useEffect(() => {
    if (data?.createRepository) {
      router.push(`/repositories?repo=${data.createRepository.repository.nameWithOwner}`);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{`Create repository - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>

      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create repository</h3>
            </div>

            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full h-10 min-w-0 flex-1 rounded-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={() => router.back()}
              type="button"
              className="mr-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <FormButton text="Save" loading={loading} />
          </div>
        </div>
      </form>
    </>
  );
};

Page.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Page;
