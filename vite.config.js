import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                plataformas: resolve(__dirname, 'plataformas.html'),
                equipe: resolve(__dirname, 'equipe.html'),
                contato: resolve(__dirname, 'contato.html'),
                enMain: resolve(__dirname, 'en/index.html'),
                enPlatforms: resolve(__dirname, 'en/platforms.html'),
                enTeam: resolve(__dirname, 'en/team.html'),
                enContact: resolve(__dirname, 'en/contact.html'),
                esMain: resolve(__dirname, 'es/index.html'),
                esPlatforms: resolve(__dirname, 'es/plataformas.html'),
                esTeam: resolve(__dirname, 'es/equipo.html'),
                esContact: resolve(__dirname, 'es/contacto.html'),
            },
        },
    },
    server: {
        open: true,
    },
});
