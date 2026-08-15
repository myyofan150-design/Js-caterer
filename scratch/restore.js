const fs = require('fs');
const path = require('path');

const backupsDir = path.join(__dirname, '..', 'backups');
const manifestPath = path.join(backupsDir, 'manifest.json');

const targetArg = process.argv[2];

if (!fs.existsSync(backupsDir) || !fs.existsSync(manifestPath)) {
  console.log('❌ No backup directory or manifest found.');
  process.exit(1);
}

let manifest = [];
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch(e) {
  console.log('❌ Error reading manifest file.');
  process.exit(1);
}

if (!manifest || manifest.length === 0) {
  console.log('❌ No snapshots available in manifest.');
  process.exit(1);
}

if (!targetArg || targetArg === 'list') {
  console.log('\n📜 AVAILABLE BACKUP SNAPSHOTS:');
  console.log('---------------------------------------------------------');
  manifest.forEach((item, index) => {
    console.log(` [${index + 1}] ID: ${item.id}`);
    console.log(`     Time: ${item.timestamp} | Files: ${item.fileCount}`);
  });
  console.log('---------------------------------------------------------');
  console.log('To restore latest: node scratch/restore.js latest');
  console.log('To restore specific ID: node scratch/restore.js <snapshot_id>\n');
  process.exit(0);
}

let targetSnapshot = null;

if (targetArg === 'latest') {
  targetSnapshot = manifest[0];
} else if (!isNaN(parseInt(targetArg))) {
  const idx = parseInt(targetArg) - 1;
  if (idx >= 0 && idx < manifest.length) {
    targetSnapshot = manifest[idx];
  }
} else {
  targetSnapshot = manifest.find(m => m.id === targetArg || m.id.includes(targetArg));
}

if (!targetSnapshot) {
  console.log(`❌ Snapshot "${targetArg}" not found.`);
  process.exit(1);
}

console.log(`\n🔄 RESTORING WEBSITE TO SNAPSHOT: ${targetSnapshot.id}`);
const snapshotFolder = targetSnapshot.folder;

if (!fs.existsSync(snapshotFolder)) {
  console.log(`❌ Folder missing: ${snapshotFolder}`);
  process.exit(1);
}

const files = fs.readdirSync(snapshotFolder);
let restoredCount = 0;

files.forEach(file => {
  const src = path.join(snapshotFolder, file);
  const dest = path.join(__dirname, '..', file);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, dest);
    restoredCount++;
    console.log(`   [RESTORED] ${file}`);
  }
});

console.log(`\n✅ RESTORE COMPLETE! ${restoredCount} files restored to baseline.\n`);
