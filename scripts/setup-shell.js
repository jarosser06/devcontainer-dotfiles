#!/usr/bin/env node
// Shell configuration setup for devcontainer-dotfiles

const fs = require('fs');
const path = require('path');
const os = require('os');
const { log, ensureDirectory, linkFile } = require('./utils');

function setupShell() {
    log('🐚 Setting up personal shell configuration...', 'cyan');
    
    const homeDir = os.homedir();
    log(`Using home directory: ${homeDir}`, 'cyan');
    // Look for dotfiles in the current directory (when cloned by VS Code)
    const currentDir = process.cwd();
    let dotfilesDir = path.join(homeDir, '.devcontainer-dotfiles');
    
    // If running from the dotfiles repo itself, use current directory
    if (fs.existsSync(path.join(currentDir, 'configs', 'shell', 'bashrc'))) {
        dotfilesDir = currentDir;
    }
    
    // Ensure dotfiles directory exists
    if (!fs.existsSync(dotfilesDir)) {
        log('❌ Dotfiles directory not found. Run from correct location.', 'red');
        process.exit(1);
    }
    
    // Link personal bash configuration
    const bashrcSource = path.join(dotfilesDir, 'configs', 'shell', 'bashrc');
    const bashrcTarget = path.join(homeDir, '.bashrc_personal');
    linkFile(bashrcSource, bashrcTarget);
    
    // Add source to existing bashrc if not already present
    const bashrcMain = path.join(homeDir, '.bashrc');
    const sourceCommand = 'source ~/.bashrc_personal';
    
    if (fs.existsSync(bashrcMain)) {
        const bashrcContent = fs.readFileSync(bashrcMain, 'utf8');
        if (!bashrcContent.includes('devcontainer-dotfiles')) {
            fs.appendFileSync(bashrcMain, `\n# Personal devcontainer dotfiles\n${sourceCommand}\n`);
            log('✅ Added personal configuration to .bashrc', 'green');
        }
    } else {
        // Create new .bashrc with personal config
        fs.writeFileSync(bashrcMain, `#!/bin/bash\n\n# Personal devcontainer dotfiles\n${sourceCommand}\n`);
        log('✅ Created .bashrc with personal configuration', 'green');
    }
    
    // Link aliases and environment files
    const aliasesSource = path.join(dotfilesDir, 'configs', 'aliases', 'personal-aliases');
    const envSource = path.join(dotfilesDir, 'configs', 'env', 'environment-vars');
    
    // These are sourced by the personal bashrc, so we don't need to link them
    log('✅ Shell configuration complete', 'green');
}

module.exports = { setupShell };

// Run if called directly
if (require.main === module) {
    setupShell();
}