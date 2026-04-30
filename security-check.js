import fs from 'fs';
import path from 'path';

console.log('🛡️ Starting Security Check...\n');

const backendPackageJsonPath = path.join(process.cwd(), 'backend', 'package.json');
const backendServerPath = path.join(process.cwd(), 'backend', 'server.js');

let errors = 0;

// 1. Check Backend Dependencies
if (fs.existsSync(backendPackageJsonPath)) {
  const pkg = JSON.parse(fs.readFileSync(backendPackageJsonPath, 'utf8'));
  const deps = pkg.dependencies || {};
  
  const requiredSecurityDeps = ['helmet', 'express-rate-limit', 'express-mongo-sanitize', 'xss-clean', 'hpp', 'zod', 'cookie-parser'];
  
  console.log('📦 Checking required security dependencies:');
  requiredSecurityDeps.forEach(dep => {
    if (deps[dep]) {
      console.log(`  ✅ ${dep} is installed`);
    } else {
      console.log(`  ❌ ${dep} is MISSING`);
      errors++;
    }
  });
} else {
  console.log('❌ backend/package.json not found');
  errors++;
}

console.log('\n');

// 2. Check server.js for middlewares
if (fs.existsSync(backendServerPath)) {
  const serverContent = fs.readFileSync(backendServerPath, 'utf8');
  
  console.log('🔒 Checking server.js for security middleware:');
  
  if (serverContent.includes('helmet(')) {
    console.log(`  ✅ helmet is used`);
  } else {
    console.log(`  ❌ helmet is missing`);
    errors++;
  }

  if (serverContent.includes('mongoSanitize(')) {
    console.log(`  ✅ express-mongo-sanitize is used`);
  } else {
    console.log(`  ❌ express-mongo-sanitize is missing`);
    errors++;
  }

  if (serverContent.includes('xss(')) {
    console.log(`  ✅ xss-clean is used`);
  } else {
    console.log(`  ❌ xss-clean is missing`);
    errors++;
  }

  if (serverContent.includes('rateLimit(')) {
    console.log(`  ✅ express-rate-limit is used`);
  } else {
    console.log(`  ❌ express-rate-limit is missing`);
    errors++;
  }
}

console.log('\n');

if (errors > 0) {
  console.log(`❌ Security check failed with ${errors} error(s). Please fix them before deploying.`);
  process.exit(1);
} else {
  console.log('✅ All security checks passed! Ready for deployment.');
  process.exit(0);
}
