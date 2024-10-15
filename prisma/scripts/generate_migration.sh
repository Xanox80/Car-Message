#!/bin/bash

# prisma does not generate rollback (down script by default)
# this script will generate the down script for each migration

name=$1
dir=$(pwd)

if [ -z "$name" ]
then
  echo "Please provide a name for the migration"
  exit 1
fi

tmp_dir="${dir}/prisma/scripts/tmp"
if [ ! -d "$tmp_dir" ]; then
  echo "Create tmp directory ($tmp_dir)"
  mkdir "$tmp_dir"
fi

echo "Generating migration $name"

echo "Generating down.sql"
# generate the down.sql first before the migration
npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script > ${tmp_dir}/down.sql

echo "run yarn db:migrate"
# generate the migration file using prisma
npx prisma migrate dev --create-only --name $name

# find the latest migration
migration_path="${dir}/prisma/migrations"
latest_path=$(ls -td -- "${migration_path}"/*/ | head -n 1)
migration_name=$(basename "${latest_path%/}")

# adding the rollback for migration table
echo "-- remove the last migration from the _prisma_migrations table" >> ${tmp_dir}/down.sql
echo "DELETE FROM _prisma_migrations WHERE migration_name = '${migration_name}';" >> ${tmp_dir}/down.sql
mv ${tmp_dir}/down.sql ${dir}/prisma/migrations/${migration_name}/

echo "Done"
