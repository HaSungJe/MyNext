'use server'
import { checkAuth } from "@/api/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const auth = await checkAuth();
    if (auth) {
        redirect("/dashboard");
    } else {
        return (
            <body>
                {children}
            </body>
        )
    }
}