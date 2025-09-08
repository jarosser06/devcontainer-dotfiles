#!/bin/bash
# Enhanced Git Prompt Setup with Dracula Colors

# Get the directory of this script to find git-completion.sh
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"

# Source our git completion script (contains __git_ps1 function)
if [ -f "$SCRIPT_DIR/git-completion.sh" ]; then
    source "$SCRIPT_DIR/git-completion.sh"
fi

# Try system locations as fallback
if ! type -t __git_ps1 > /dev/null; then
    if [ -f /usr/lib/git-core/git-sh-prompt ]; then
        source /usr/lib/git-core/git-sh-prompt
    elif [ -f /usr/share/git-core/contrib/completion/git-prompt.sh ]; then
        source /usr/share/git-core/contrib/completion/git-prompt.sh
    elif [ -f /etc/bash_completion.d/git-prompt ]; then
        source /etc/bash_completion.d/git-prompt
    fi
fi

# Git prompt configuration
export GIT_PS1_SHOWDIRTYSTATE=true
export GIT_PS1_SHOWSTASHSTATE=true
export GIT_PS1_SHOWUNTRACKEDFILES=true
export GIT_PS1_SHOWUPSTREAM="auto"
export GIT_PS1_SHOWCOLORHINTS=true

# Source Dracula colors
source "$SCRIPT_DIR/bash-dracula.sh"

# Enhanced PS1 with Dracula colors and git status
export PS1='\[\033[38;2;${DRACULA_PURPLE_256}m\][\u@\h]\[\033[0m\] \[\033[38;2;${DRACULA_CYAN_256}m\]\w\[\033[38;2;${DRACULA_RED_256}m\]$(__git_ps1 " (%s)")\[\033[38;2;${DRACULA_FOREGROUND_256}m\]λ \[\033[0m\]'