"""Build the portable Cycafe static deployment, excluding source exports and private tooling."""
from pathlib import Path
import shutil
import zipfile

root = Path(__file__).resolve().parent
target = root / 'dist' / 'cycafe'
target.mkdir(parents=True, exist_ok=True)
assets = [p for p in root.iterdir() if p.is_file() and p.suffix in {'.html', '.js', '.css', '.png', '.ico'} and p.name not in {'config.local.js'}]
assets += [root / name for name in ['manifest.json', 'robots.txt', 'sitemap.xml']]
for source in assets:
    shutil.copy2(source, target / source.name)
for name in ['images', 'vendor']:
    shutil.copytree(root / name, target / name, dirs_exist_ok=True)
# Optional local development overrides are not needed in the deployable package.
(target / 'config.local.js').write_text('// Deployment defaults are in firebase-public-config.js.\n', encoding='utf-8')
archive = root / 'dist' / 'Cycafe-integrated-ReviewLink.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as out:
    for file in sorted(target.rglob('*')):
        if file.is_file():
            out.write(file, file.relative_to(target))
    for name in ['firestore.rules', 'storage.rules', 'REVIEWLINK-INTEGRATION.md']:
        out.write(root / name, 'deployment/' + name)
print('Deployment folder:', target)
print('Deployment ZIP:', archive)
