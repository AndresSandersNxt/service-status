import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, readdirSync, rmSync, appendFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

test('deployments bypass cached assets whenever their contents change', () => {
  const directory = mkdtempSync(join(tmpdir(), 'service-status-build-'));
  try {
    for (const name of ['build.mjs', 'index.html', 'app.js', 'styles.css', 'status.json', 'favicon.svg']) {
      copyFileSync(new URL(name, import.meta.url), join(directory, name));
    }
    const build = () => {
      execFileSync(process.execPath, ['build.mjs'], { cwd: directory });
      const html = readFileSync(join(directory, '_site/index.html'), 'utf8');
      const script = html.match(/<script src="([^"]+)"/)[1];
      const stylesheet = html.match(/<link rel="stylesheet" href="([^"]+)"/)[1];
      for (const url of [script, stylesheet]) {
        const asset = new URL(url, 'https://example.com/service-status/');
        assert.equal(asset.origin, 'https://example.com');
        assert.ok(asset.pathname.startsWith('/service-status/'));
        assert.ok(asset.searchParams.get('v'), 'Asset URL must bypass the old unversioned cache');
        const name = asset.pathname.split('/').at(-1);
        assert.deepEqual(readFileSync(join(directory, '_site', name)), readFileSync(join(directory, name)));
      }
      return { script, stylesheet };
    };
    const first = build();
    assert.deepEqual(readdirSync(join(directory, '_site')).sort(), ['.nojekyll', 'app.js', 'favicon.svg', 'index.html', 'status.json', 'styles.css']);
    assert.deepEqual(build(), first, 'Identical builds must keep the same asset URLs');

    appendFileSync(join(directory, 'app.js'), '\n// Updated script\n');
    const scriptUpdate = build();
    assert.notEqual(scriptUpdate.script, first.script, 'A changed script must not reuse a cached URL');
    assert.equal(scriptUpdate.stylesheet, first.stylesheet);

    appendFileSync(join(directory, 'styles.css'), '\n/* Updated stylesheet */\n');
    const styleUpdate = build();
    assert.notEqual(styleUpdate.stylesheet, first.stylesheet, 'Changed CSS must not reuse a cached URL');
    assert.equal(styleUpdate.script, scriptUpdate.script);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
