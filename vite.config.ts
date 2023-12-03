import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { execSync } from 'child_process'

let commithash = 'unknown'
try {
  commithash = execSync('git rev-parse --short HEAD').toString().trim()
} catch (e) {
  console.warn('Could not get commit hash')
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/math-friend/',
  define: {
    __COMMIT_HASH__: JSON.stringify(commithash),
  },
  plugins: [react()],
})
