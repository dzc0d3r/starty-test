FROM postgres:15-alpine

# ARCHITECT'S NOTE: This Dockerfile serves as a customization entry point.
# While it does nothing but inherit the base image for now, it's the
# correct place to add future database-specific logic.
# For example, to run an initialization script on first run, you would add:
#
# COPY ./init-scripts/ /docker-entrypoint-initdb.d/
#
# This makes our architecture extensible from day one.
