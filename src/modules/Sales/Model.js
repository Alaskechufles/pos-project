import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";
import { Products_Sales } from "../Products_Sales/Model.js";

export class Sales extends Model {}

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
Sales.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }, 
  },
  {
    sequelize,
    modelName: "sales",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Sales.hasMany(Products_Sales, {
  foreignKey: "sale_id",
  as: "sales_details",
});
