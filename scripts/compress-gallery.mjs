// Пакетное сжатие фото галереи: WebP с качеством 85%, сохранение оригинальных пропорций.
// Запуск: node scripts/compress-gallery.mjs
import sharp from 'sharp';
import { readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const GALLERY_DIR = path.resolve('src/assets/gallery');
const TMP_DIR = path.resolve('tmp_gallery_compress');
const QUALITY = 85;

// Создаём временную папку
await mkdir(TMP_DIR, { recursive: true });

const files = (await readdir(GALLERY_DIR)).filter((f) =>
  /\.(jpe?g|png|webp)$/i.test(f)
);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const srcPath = path.join(GALLERY_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const before = (await stat(srcPath)).size;
  totalBefore += before;

  const buffer = await sharp(srcPath)
    .rotate()
    .webp({ quality: QUALITY })
    .toBuffer();

  const outName = ext !== '.webp'
    ? file.replace(/\.(jpe?g|png)$/i, '.webp')
    : file;

  const outPath = path.join(TMP_DIR, outName);
  await writeFile(outPath, buffer);

  console.log(
    `${file} -> ${outName}: ${(before / 1024).toFixed(0)} KB -> ${(buffer.length / 1024).toFixed(0)} KB`
  );

  totalAfter += buffer.length;
}

console.log('\n=== Итог ===');
console.log(`Файлов обработано: ${files.length}`);
console.log(
  `Суммарный размер до: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`
);
console.log(
  `Суммарный размер после: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`
);
console.log(
  `Экономия: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`
);

// Копируем обратно через cmd (обходит блокировку OneDrive)
console.log('\nКопирование файлов обратно в gallery...');
execSync(
  `copy /Y "${TMP_DIR}\\*.webp" "${GALLERY_DIR}\\"`,
  { shell: 'cmd.exe', stdio: 'inherit' }
);

// Удаляем временную папку
execSync(`rmdir /S /Q "${TMP_DIR}"`, { shell: 'cmd.exe', stdio: 'inherit' });
console.log('Готово!');