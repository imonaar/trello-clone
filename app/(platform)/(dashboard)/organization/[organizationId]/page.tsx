import { OrganizationSwitcher, auth } from "@clerk/nextjs"

export default function OrganizationPage() {
    const { userId, orgId } = auth()

    return (
        <div>
            org page
        </div>
    )
}
