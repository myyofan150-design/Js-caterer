const fs = require('fs');
const path = require('path');

const projectFiles = [
  'index.html',
  'services.html',
  'about.html',
  'contact.html',
  'gallery.html',
  'menu.html',
  'styles.css',
  'script.js'
];

function createBackup(label = 'manual') {
  const backupsDir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const now = new Date();
  const pad = num => String(num).padStart(2, '0');
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  const backupFolder = path.join(backupsDir, `snapshot_${timestamp}_${label}`);

  fs.mkdirSync(backupFolder, { recursive: true });

  let copied = 0;
  projectFiles.forEach(file => {
    const src = path.join(__dirname, '..', file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(backupFolder, file));
      copied++;
    }
  });

  const manifestPath = path.join(backupsDir, 'manifest.json');
  let manifest = [];
  if (fs.existsSync(manifestPath)) {
    try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch(e){}
  }

  manifest.unshift({
    id: `snapshot_${timestamp}_${label}`,
    timestamp: now.toISOString(),
    label: label,
    folder: backupFolder,
    fileCount: copied
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n✅ BACKUP SUCCESSFUL!`);
  console.log(`   Snapshot ID : snapshot_${timestamp}_${label}`);
  console.log(`   Files Saved : ${copied} core files`);
  console.log(`   Backup Path : ${backupFolder}\n`);

  return `snapshot_${timestamp}_${label}`;
}

const label = process.argv[2] || 'auto';
createBackup(label);
