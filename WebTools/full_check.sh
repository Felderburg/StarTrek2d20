npm test &&
  tsc --noEmit &&
  npx eslint src &&
  npx eslint tests &&
  echo "passed" || echo "failed"

# If you see repeated/confusing test failures,
# rm -rf node_modules && npm install
