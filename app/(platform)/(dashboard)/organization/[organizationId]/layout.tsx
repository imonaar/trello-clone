import { OrganizationControl } from "./_components/org-control";

export default function OrganizationIdLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <OrganizationControl />
            {children}
        </>
    )
}
