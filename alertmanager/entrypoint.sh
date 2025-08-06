#!/bin/sh
set -e

# Replace placeholders with environment variable values in the config file
sed -i "s|\${SMTP_SMARTHOST}|${SMTP_SMARTHOST}|g" /etc/alertmanager/alertmanager.yml
sed -i "s|\${SMTP_FROM}|${SMTP_FROM}|g" /etc/alertmanager/alertmanager.yml
sed -i "s|\${SMTP_USER}|${SMTP_USER}|g" /etc/alertmanager/alertmanager.yml
sed -i "s|\${SMTP_PASS}|${SMTP_PASS}|g" /etc/alertmanager/alertmanager.yml
sed -i "s|\${ALERT_EMAIL}|${ALERT_EMAIL}|g" /etc/alertmanager/alertmanager.yml

# Start Alertmanager
exec alertmanager --config.file=/etc/alertmanager/alertmanager.yml