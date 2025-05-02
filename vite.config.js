import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    // Ensure node_modules packages are properly resolved
    alias: {
      'sortablejs': path.resolve(__dirname, 'node_modules/sortablejs/modular/sortable.esm.js')
    }
  }
})
