"use client";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import Link from 'next/link'
import React from 'react'
import { auth } from '../firebase/firebase.config';
import * as Yup from "yup"; // Correct import for Yup
import { useRouter } from 'next/navigation';
// import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function Login() {
    const router = useRouter();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: register,

        validationSchema: Yup.object({
            email: Yup.string().required("Email is Required").email("Invalid email").max(50, "Too long"),
            password: Yup.string().required("Password is Required").min(6, "Too short").max(50, "Too long"),
        }),
    })

    async function register(values) {
        try {

            console.log(values);
            const loggedUseer = await signInWithEmailAndPassword(auth, values.email, values.password)
            router.push("/")

        }
        catch (error) {
            console.log("error is: ", error);
            toast.error(`${error}`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }


    }

    return (
        <div className="min-h-dvh  flex items-center justify-center p-5">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md border border-gray-200 p-12 flex flex-col gap-8 rounded-xl shadow-2xl">
                <div className="  text-center">
                    <h1 className=" xs:text-3xl text-lg  sm:text-2xl font-semibold">Welcome back, Admin</h1>
                    <p className="font-medium text-sm text-gray-600 mt-2">login to manage your e-commerce store</p>
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-sm" htmlFor="email">Email Address</label>

                    <input
                        type="email"
                        name='email'
                        id="email"
                        className="bg-blue-100 p-1 mt-1 rounded-xs"
                        placeholder="admin@example.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs mt-1"> {formik.errors.email} </p>)
                    }
                </div>

                <div className="flex flex-col">
                    <label className="font-medium text-sm" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        id="password"
                        className="bg-blue-100 p-1 mt-1 rounded-xs "
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-xs mt-1"> {formik.errors.password} </p>)
                    }
                </div>


                <button type='submit' className=" text-sm md:text-lg bg-primary p-2 rounded-sm text-white font-semibold hover:bg-blue-700 duration-300 cursor-pointer">Login to Dashboard</button>
                <div className=" flex  items-center justify-center  sm:text-sm  text-xs">
                    <p>Do not have an account ? </p>
                    <Link href={"/signup"} className="ms-1 text-primary font-bold text-center ">
                        Sign Up
                    </Link>
                </div>
                <p className="text-center text-xs text-gray-500">
                    Secure access to your administration dashboard
                </p>
            </form>
        </div>
    )
}
