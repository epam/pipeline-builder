LAST_PUBLISHED="$(npm view pipeline-builder-test@dev dev version)"
CURRENT_VERSION="$(npm version | grep -Po '(?<="pipeline-builder-test": ")[^"]*')"
if [ "$LAST_PUBLISHED" == "$CURRENT_VERSION" ]; then exit(1); fi