# DevContainer Dotfiles

Personal devcontainer configuration with Dracula shell theme and development environment setup.

## Usage

### As Dotfiles (Recommended)
Add to your VS Code `settings.json`:

```json
{
  "dotfiles.repository": "https://github.com/jarosser06/devcontainer-dotfiles",
  "dotfiles.targetPath": "~/.devcontainer-dotfiles",
  "dotfiles.installCommand": "node install.js"
}
```

### As Full DevContainer
Clone and open directly in VS Code - includes complete devcontainer with:
- Neo4j database for Graphiti MCP server
- All MCP servers pre-configured
- Development tools (Python 3.11, Node 24, Terraform, GitHub CLI)

## What's Installed

- **Shell**: Dracula-themed bash prompt with git status
- **Dotfiles**: Personal aliases and environment variables  
- **MCP Servers**: filesystem, task-master, graphiti, terraform, github
- **Development**: Python virtualenvwrapper, Claude Code CLI

## Structure

```
.devcontainer/        # Full devcontainer configuration
├── devcontainer.json # VS Code devcontainer settings
├── docker-compose.yml# Multi-service setup with Neo4j
├── Dockerfile       # Custom development environment
└── setup.sh         # Post-creation setup script

configs/
├── shell/          # bashrc, git prompt, Dracula theme
├── aliases/        # Personal command aliases
└── env/           # Environment variables

.mcp.json         # MCP servers configuration
```

## Requirements

- Node.js 18+ (included in most devcontainer images)
- VS Code with Dev Containers extension
