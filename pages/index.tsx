import Head from "next/head";
import Countries from "@/components/Repositories";
import MainLayout from "@/components/layout/MainLayout";

const Page: NextPageWithLayout = () => {
  return (
    <div className="bg-gray-50 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Home
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">Content</p>
        </div>
      </div>
    </div>
  );
};

Page.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Page;
