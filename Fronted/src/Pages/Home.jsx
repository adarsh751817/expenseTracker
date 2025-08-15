


// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const bgImage = `https://source.unsplash.com/1920x1080/?money,finance,budget&sig=${Math.floor(Math.random() * 1000)}`;

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex items-center justify-center"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${bgImage})`,
//       }}
//     >
//       <motion.div
//         className="text-center text-white px-4 md:px-10"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <motion.h1
//           className="text-4xl md:text-6xl font-bold mb-6"
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           Manage Your Money Like a Pro
//         </motion.h1>

//         <motion.p
//           className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//         >
//           Stay on top of your finances with real-time expense tracking, smart reports, and AI insights.
//         </motion.p>

//         <motion.div
//           className="flex flex-col md:flex-row justify-center items-center gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5 }}
//         >
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
//           >
//             Track Your Expenses
//           </button>

//           <button
//             onClick={() => navigate("/reports")}
//             className="bg-transparent border-2 border-white hover:bg-white hover:text-black px-6 py-3 rounded-2xl text-lg font-semibold transition"
//           >
//             View Reports
//           </button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default HomePage;


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomImage = () => {
      const url = `https://source.unsplash.com/1920x1080/?finance,money,budget&sig=${Math.floor(Math.random() * 1000)}`;
      setImageUrl(url);
    };
    fetchRandomImage();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-black">
      {/* Background Image */}
      <motion.img
        src={imageUrl}
        alt="Finance Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Fancy Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-black/80 flex items-center justify-center px-4">
        {/* Content Card */}
        <motion.div
          className="max-w-4xl w-full bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center text-white shadow-2xl border border-white/20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <motion.h1
            className="text-2xl md:text-6xl font-extrabold leading-tight drop-shadow"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            Track Every Penny<br />
            <span className="text-yellow-400 text-3xl">Grow Every Rupee</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Visualize your spending, discover trends, and get AI-driven reports to manage your money smarter.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-col md:flex-row justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition"
            >
              🚀 Start Tracking Now
            </button>

            <button
              onClick={() => navigate("/reports")}
              className="bg-white/10 hover:bg-white/20 border border-white text-white px-6 py-3 rounded-full text-lg transition backdrop-blur"
            >
              📊 View Reports
            </button>
          </motion.div>

          {/* GIF & Footer Text */}
          <motion.div
            className="mt-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <img
              src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif"
              alt="Finance GIF"
              className="w-56 md:w-72 rounded-xl border border-white/20 shadow-lg"
            />

            <p className="mt-4 text-sm text-gray-400">
              No credit card. No commitment. Just better money management.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
