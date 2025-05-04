"use client"
import { motion } from "framer-motion"


export default function Login() {


    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen"
        >
            Login page

        </motion.div>
    )
}
