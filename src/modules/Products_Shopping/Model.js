import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class Products_Shopping extends Model {}

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
Products_Shopping.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    shopping_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "shopping", // Name of the referenced model
        key: "id", // Key in the referenced model
      },
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "products", // Name of the referenced model
        key: "id", // Key in the referenced model
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    // add your columns here ✍️
  },
  {
    sequelize,
    modelName: "products_shopping",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Products_Shopping.belongsTo(Products_Shopping, {
  foreignKey: "product_id",
  as: "products",
});
