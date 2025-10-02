import TeamMemberForm from "@/components/admin/TeamMemberForm";

export const metadata = {
  title: "Add New Team Member | Admin Dashboard",
  description: "Add a new team member to your website",
};

export default function NewTeamMemberPage() {
  return (
    <div className="py-6">
      <TeamMemberForm />
    </div>
  );
}