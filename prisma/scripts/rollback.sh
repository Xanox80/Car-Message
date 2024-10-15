#!/bin/bash

# rollback the latest migration (only apply to the db)
dir=$(pwd)

echo "Rollback the latest migration"

# confirm with the user
read -p "Are you sure you want to rollback the latest migration? (y/n) " -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
  echo "Aborted"
  exit 1
fi

# find the latest migration
migration_path="${dir}/prisma/migrations"
latest_path=$(ls -td -- "${migration_path}"/*/ | head -n 1)
migration_name=$(basename "${latest_path%/}")

echo "Executing: $dir/prisma/migrations/${migration_name}/down.sql"
npx prisma db execute --file ${dir}/prisma/migrations/${migration_name}/down.sql

echo "Done"
