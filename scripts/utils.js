#!/usr/bin/env node
// Utility functions for devcontainer-dotfiles

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function log(message, color = 'white') {
    const colors = {
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        reset: '\x1b[0m'
    };
    
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function isDevContainer() {
    // Check if we're running in a devcontainer
    return process.env.REMOTE_CONTAINERS === 'true' || 
           fs.existsSync('/workspaces') ||
           process.env.CODESPACES === 'true';
}

function ensureDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        log(`✅ Created directory: ${dirPath}`, 'green');
    }
}

function linkFile(source, target) {
    try {
        // Remove existing file/link if it exists
        if (fs.existsSync(target)) {
            fs.unlinkSync(target);
        }
        
        // Create symbolic link
        fs.symlinkSync(source, target);
        log(`✅ Linked: ${source} -> ${target}`, 'green');
    } catch (error) {
        log(`❌ Failed to link ${source}: ${error.message}`, 'red');
    }
}

function runCommand(command, description) {
    try {
        log(`🔧 ${description}...`, 'cyan');
        execSync(command, { stdio: 'inherit' });
        log(`✅ ${description} complete`, 'green');
    } catch (error) {
        log(`❌ ${description} failed: ${error.message}`, 'red');
    }
}

module.exports = {
    log,
    isDevContainer,
    ensureDirectory,
    linkFile,
    runCommand
};

// If run directly, show environment info
if (require.main === module) {
    log('🔍 DevContainer Dotfiles - Environment Check', 'cyan');
    log(`Home Directory: ${process.env.HOME}`, 'white');
    log(`Working Directory: ${process.cwd()}`, 'white');
    log(`Is DevContainer: ${isDevContainer()}`, 'white');
    log(`Node Version: ${process.version}`, 'white');
}