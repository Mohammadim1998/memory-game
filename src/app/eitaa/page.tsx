import Link from "next/link";

export default function EitaaPage() {
  return (
    <>
      <div>Eitaa</div>
      <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
        <Link
          href={"/tel"}
          className="px-8 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg"
        >
          Telegram
        </Link>
        <Link
          href={"/"}
          className="px-8 py-5 bg-purple-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg"
        >
          Return
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
}
