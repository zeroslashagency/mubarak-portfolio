import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const MagicComponent = () => {
  const [isVisible, setIsVisible] = useState(true);

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {isVisible ? "Hide" : "Show"}
      </button>

      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="magic-box"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className="magic-box"
            style={{
              width: "200px",
              height: "200px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              margin: "20px 0",
              borderRadius: "8px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{ color: "white", padding: "20px", textAlign: "center" }}
            >
              Magic Box
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MagicComponent;
