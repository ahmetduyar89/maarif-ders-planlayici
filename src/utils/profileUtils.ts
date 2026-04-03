export interface TeacherProfile {
  fullName: string;
  schoolName: string;
  branch: string;
  academicYear: string;
  district: string;
}

export const getTeacherProfile = (): TeacherProfile | null => {
  try {
    const profile = localStorage.getItem('teacherProfile');
    if (profile) {
      return JSON.parse(profile);
    }
  } catch (e) {
    console.error('Error reading profile from local storage', e);
  }
  return null;
};

export const saveTeacherProfile = (profile: TeacherProfile) => {
  try {
    localStorage.setItem('teacherProfile', JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile to local storage', e);
  }
};
