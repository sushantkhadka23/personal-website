import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import notFoundAnimation from "../assets/404_page_not_found.json";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4 font-inconsolata">
      <div className="p-8 md:p-12 max-w-lg w-full">
        <Player
          autoplay
          loop
          src={notFoundAnimation}
          className="w-full h-auto max-w-xs mx-auto mb-8"
        />
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Sorry, the page you're looking for cannot be found.
        </p>
        <Link
          to="/"
          className="px-4 py-2 text-md sm:text-lg font-extrabold border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
