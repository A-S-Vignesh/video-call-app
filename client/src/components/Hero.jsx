import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero()
{
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/video/${roomId}`);  // Navigate to the video chat with the room ID
    }
  }

    return (
      <div className="">
        <div className="flex flex-col-reverse md:flex-row h-auto md:h-screen justify-center items-center p-8">
          <div className="w-full md:w-1/2 p-8 text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Experience seamless video communication anytime, anywhere.
            </h2>
            <p className="text-xl md:text-2xl mb-4">
              Connect with friends, family, and colleagues through high-quality
              video calls. Our platform ensures that you never miss a moment, no
              matter where you are.
            </p>
            <button
              type="button"
              className="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create the Call
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.498 1.498 0 011.6-.33c1.09.42 2.28.65 3.5.65.83 0 1.5.67 1.5 1.5v3.5c0 .83-.67 1.5-1.5 1.5C10.74 22.5 1.5 13.26 1.5 3.5 1.5 2.67 2.17 2 3 2h3.5c.83 0 1.5.67 1.5 1.5 0 1.22.23 2.41.65 3.5.24.62.1 1.32-.33 1.6l-2.2 2.2z" />
              </svg>
            </button>
            <input
              className="p-2 rounded-md"
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter the code"
            ></input>
            <button
              type="button"
              onClick={handleJoinRoom}
              className="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Join the call &nbsp;
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4">Right Side</h2>
            <p>This is the right side content.</p>
          </div>
        </div>
      </div>
    );
}

export default Hero;