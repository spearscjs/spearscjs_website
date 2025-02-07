# Define variables
GIT = git
COMMIT_MSG = $(message)

# Default target (build)
.PHONY: build
build: add commit push

# Add command
.PHONY: add
add:
	@echo "Adding files to Git..."
	$(GIT) add .

# Commit command
.PHONY: commit
commit:
	@if [ -z "$(COMMIT_MSG)" ]; then \
		echo "Error: Commit message is required!"; \
		exit 1; \
	fi
	@echo "Committing changes with message: $(COMMIT_MSG)"
	$(GIT) commit -m "$(COMMIT_MSG)"

# Push command
.PHONY: push
push:
	@echo "Pushing changes to remote repository..."
	$(GIT) push
	@echo "Push complete."

# Help command (optional)
.PHONY: help
help:
	@echo "Usage:"
	@echo "  make add       # Add changes to Git"
	@echo "  make commit    # Commit changes with a commit message"
	@echo "  make push      # Push changes to remote repository"
	@echo "  make build     # Add, commit, and push all in one"
