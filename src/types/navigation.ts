export type PageRoute =
  | 'home'
  | 'services'
  | 'work'
  | 'case-study'
  | 'ivory-table-study'
  | 'northbound-study'
  | 'about'
  | 'contact';

export interface NavItem {
  id: PageRoute;
  label: string;
}

export interface EnquiryContext {
  isOpen: boolean;
  subjectHint?: string;
  defaultProjectType?: string;
}
