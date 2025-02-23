#!/bin/bash

# Verificar si se proporcionaron dos argumentos
if [ "$#" -ne 2 ]; then
    echo "Uso: $0 <nombre_modulo> <ruta>"
    exit 1
fi

# Obtener los argumentos
MODULE_NAME=$1
MODULE_PATH=$2

# Crear la estructura de carpetas y archivos
mkdir -p "$MODULE_PATH/$MODULE_NAME/application"
mkdir -p "$MODULE_PATH/$MODULE_NAME/domain"
mkdir -p "$MODULE_PATH/$MODULE_NAME/infrastructure/repositories"

touch "$MODULE_PATH/$MODULE_NAME/domain/$MODULE_NAME.entity.ts"
touch "$MODULE_PATH/$MODULE_NAME/infrastructure/repositories/$MODULE_NAME.db.ts"
touch "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.controller.ts"
touch "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"

# Agregar contenido al archivo module_name.controller.ts
echo "import { Controller } from '@nestjs/common';" > "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.controller.ts"
echo "" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.controller.ts"
echo "@Controller('$MODULE_NAME')" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.controller.ts"
echo "export class ${MODULE_NAME^}Controller {" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.controller.ts"
echo "  constructor() {}" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.controller.ts"
echo "}" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.controller.ts"

# Agregar contenido al archivo module_name.module.ts
echo "import { Module } from '@nestjs/common';" > "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"
echo "import { ${MODULE_NAME^}Controller } from './$MODULE_NAME.controller';" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"
echo "" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"
echo "@Module({" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"
echo "  controllers: [${MODULE_NAME^}Controller]," >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"
echo "})" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"
echo "export class ${MODULE_NAME^}Module {}" >> "$MODULE_PATH/$MODULE_NAME/infrastructure/$MODULE_NAME.module.ts"

# ----------
echo "Estructura creada exitosamente en $MODULE_PATH/$MODULE_NAME"

# Como usar el script
# chmod +x create_module.sh
# ./create_module.sh auth ./src/contexts