import * as z from "zod";
export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(5, "Name must be atleast 5 characters").max(20, "Name must not exceed 10 characters"),
    email: z.email("Email is Required"),
    password: z.string().nonempty("Password is Required").min(5, "Password must be atleast 5 characters").max(10, "Password must not exceed 10 characters"),
    rePassword: z.string().nonempty("rePassword is Required"),
    dateOfBirth: z.string().refine((date) => {
        const currentYear = new Date().getFullYear()
        const birthYear = new Date(date).getFullYear()
        const age = currentYear - birthYear
        return age >= 18

    }, { error: "Age must be above 18 years old " }),
    gender: z.string().nonempty("you must choose gender")
}).refine((data) => data.password == data.rePassword, {
    path: ["rePassword"], error: "Passwords must match"
})

export const loginSchema = z.object({
    email: z.email("Email is Required"),
    password: z.string().nonempty("Password is Required").min(5, "Password must be atleast 5 characters").max(10, "Password must not exceed 10 characters")
})