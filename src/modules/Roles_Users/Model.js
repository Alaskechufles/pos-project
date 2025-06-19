import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class Roles_Users extends Model {}

/**
 * Configuración del campo id: 🚀
 *   - **type**: 'DataTypes.BIGINT' 🛠️
 *   - **BIGINT**: Utilizado para almacenar números enteros grandes. 📊
 *   - Nota: Usa el mismo tipo de dato para llaves foráneas (ej: 'id BIGINT UNSIGNED'). 🔑
 *   - **autoIncrement**: true 🔄
 *   - Incrementa automáticamente el valor cada vez que se inserta un nuevo registro. 📈
 *   - **primaryKey**: true 🏷️
 *   - Define este campo como la clave primaria de la tabla. 🗂️
 */
Roles_Users.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users", // Nombre de la tabla referenciada
        key: "id", // Clave primaria de la tabla referenciada
      },
      onDelete: "CASCADE", // Elimina los registros relacionados si el usuario es eliminado
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "roles", // Nombre de la tabla referenciada
        key: "id", // Clave primaria de la tabla referenciada
      },
      onDelete: "CASCADE", // Elimina los registros relacionados si el rol es eliminado
    },

    // add your columns here ✍️
  },
  {
    sequelize,
    modelName: "roles_users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
