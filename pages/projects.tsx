import menuItems from "@/configs/menuItems";
import cn from "classnames";
import MainLayout from "@/components/layout";
import Head from "next/head";
import SearchBar from "@/components/SearchBar";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{`Projects - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>
      <p>dgdf</p>
    </>
  );
};

Page.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default Page;
