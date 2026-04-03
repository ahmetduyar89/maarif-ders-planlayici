const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('PDF.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip if already updated
  if (content.includes('getTeacherProfile')) return;

  // Add import
  if (content.includes("import { Document")) {
    content = content.replace("import { Document", "import { getTeacherProfile } from '../utils/profileUtils';\nimport { Document");
  } else {
    content = "import { getTeacherProfile } from '../utils/profileUtils';\n" + content;
  }

  // Find the component definition
  const componentRegex = /export const (\w+) = \([^)]*\) => \{/g;
  let match = componentRegex.exec(content);
  
  if (!match) {
    // Try implicit return
    const implicitRegex = /export const (\w+) = \([^)]*\) => \(/g;
    match = implicitRegex.exec(content);
    if (match) {
      content = content.replace(implicitRegex, (fullMatch, name) => {
        return `export const ${name} = (props: any) => {\n  const profile = getTeacherProfile();\n  const districtText = profile?.district ? \`\${profile.district.toLocaleUpperCase('tr-TR')} KAYMAKAMLIĞI\` : '.................................................. KAYMAKAMLIĞI';\n  const schoolText = profile?.schoolName ? \`\${profile.schoolName.toLocaleUpperCase('tr-TR')}\` : '.................................................. MÜDÜRLÜĞÜ';\n  const yearText = profile?.academicYear ? \`\${profile.academicYear} EĞİTİM ÖĞRETİM YILI\` : '2023-2024 EĞİTİM ÖĞRETİM YILI';\n  const teacherName = profile?.fullName ? profile.fullName : '.........................';\n  const branchText = profile?.branch ? \`\${profile.branch} Öğretmeni\` : '';\n\n  // Unpack props if needed\n  const { ${Object.keys(props || {}).join(', ')} } = props;\n\n  return (`;
      });
    }
  }

  // This is getting complicated to do robustly with regex for all files. 
  // Let's just do it manually for the ones that have MEB Antet.
});
