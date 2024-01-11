import { ClerkProvider } from "@clerk/nextjs"

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <main className="h-full">
                {children}
            </main>
        </ClerkProvider>
    )
}
