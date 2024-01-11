import { OrganizationList } from "@clerk/nextjs";

export default function OrganizationPage() {
    return (
        <OrganizationList
            hidePersonal
            afterCreateOrganizationUrl="/organization/:id"
            afterSelectOrganizationUrl="/organization/:id"
        />
    )
}
