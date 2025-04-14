export interface ProjectDto {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  repoLink: string;
}

export interface ProjectDtoList {
  projects: ProjectDto[];
}
