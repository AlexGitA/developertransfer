const getBadgeColor = (skillType: string) => {
  switch (skillType) {
    case "MOBILE":
      return "bg-blue-200 text-blue-800 border border-blue-400";
    case "FRONT":
      return "bg-green-200 text-green-800 border border-green-400";
    case "BACK":
      return "bg-yellow-200 text-yellow-800 border border-yellow-400";
    case "DEVOPS":
      return "bg-purple-200 text-purple-800 border border-purple-400";
    case "DATA":
      return "bg-orange-200 text-orange-800 border border-orange-400";
    default:
      return "bg-gray-200 text-gray-800 border border-gray-400";
  }
};

const SkillBadges = ({ skills }: { skills: { id: number; name: string; skill_type: string }[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill.id}
          className={`${getBadgeColor(skill.skill_type)} px-3 py-1 rounded-lg text-sm font-medium transition duration-200`}
        >
          {skill.name}
        </span>
      ))}
    </div>
  );
};

export default SkillBadges;
