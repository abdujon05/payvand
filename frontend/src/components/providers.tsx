import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <BrowserRouter future={{
                v7_relativeSplatPath: true,
                v7_startTransition: true,
            }}>
                {children}
                <Toaster position="top-center" richColors closeButton />
            </BrowserRouter>
        </ThemeProvider>
    )
}