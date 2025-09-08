#!/usr/bin/env node
// Main installation script for devcontainer-dotfiles

const { log, isDevContainer } = require('./scripts/utils');
const { setupShell } = require('./scripts/setup-shell');

function main() {
    log('🚀 DevContainer Dotfiles Installation', 'cyan');
    log('=====================================', 'cyan');
    
    // Check if we're in a devcontainer
    if (!isDevContainer()) {
        log('⚠️  Warning: This doesn\'t appear to be a devcontainer environment', 'yellow');
        log('   This script is designed for devcontainer usage', 'yellow');
    } else {
        log('✅ DevContainer environment detected', 'green');
    }
    
    try {
        // Setup shell configuration
        setupShell();
        
        log('🎉 DevContainer dotfiles installation complete!', 'green');
        log('💡 Restart your shell or run: source ~/.bashrc', 'cyan');
        
    } catch (error) {
        log(`❌ Installation failed: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Run main function if this script is executed directly
if (require.main === module) {
    main();
}

module.exports = { main };