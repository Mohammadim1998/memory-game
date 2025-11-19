import Link from "next/link";

const Page = () => {
  return (
    <>
      <div>Telegram</div>
      <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
        <Link
          href={"/"}
          className="px-8 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg"
        >
          Return
        </Link>
        <Link
          href={"/eitaa"}
          className="px-8 py-5 bg-purple-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg"
        >
          eitaa page
        </Link>
        <Link
          href={"/whats"}
          className="px-8 py-5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg"
        >
          whats page
        </Link>
      </div>
    </>
  );
};

export default Page;
