export interface SkillDto {
    id: string;
    title: string;
    description: string;
    skills: { name: string; level: number }[];
}