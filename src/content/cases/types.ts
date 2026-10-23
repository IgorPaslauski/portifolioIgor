export type CaseStatus = "published" | "reserved";

export type CaseLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type CaseBase = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  status: CaseStatus;
  stack: string[];
  repo?: CaseLink;
  live?: CaseLink;
  sources: string[];
};

export type PipelineStage = {
  id: string;
  label: string;
  detail: string;
};

export type CodeExhibit = {
  caption: string;
  language: string;
  filename: string;
  code: string;
};

export type Decision = {
  title: string;
  body: string;
};
